const router = require("express").Router();

//btoa
const btoa = require('btoa');
let atob = require("atob");
const CryptoJS = require("crypto-js");

// encrypt library
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// db setting
const {Pool} = require("pg");
const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.resolve(__dirname,"./../database.json"));
const conf = JSON.parse(data);
let client = new Pool ({
    user : conf.user,
    password: conf.password,
    host: conf.host,
    port: conf.port,
    database: conf.database,
    max: 100,
    connectionTimeoutMillis: 1500,
    idleTimeoutMillis: 3000,
    maxUses: 7500
});

// JWT generator
const jwt = require("jsonwebtoken");
const jwtkey = fs.readFileSync(path.resolve(__dirname,"./../jwt_key.json"));
const jwtConfig = JSON.parse(jwtkey);
const setJWT = (user_pk) => {
    let token = jwt.sign(
        {user_pk: user_pk}, jwtConfig.key, { expiresIn : "7d"}
    )
    return token;
}

router.post("/register", async (req,res) => {
    let t1 = new Date();
    try{
        if(req.body.id===undefined||req.body.pw===undefined||req.body.checkbox===undefined||req.body.type===undefined) return res.send("fail")
        let date = new Date();
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        if(req.body.pw.length < 8) return res.send("id is too short")
        if(req.body.checkbox===false) return res.send("checkbox false")
        const db = await client.connect();
        let checkRepeat = await db.query(`select user_email from users where user_email=$1;`,[req.body.id]);
        if(checkRepeat.rows[0]!==undefined){
            await db.release();
            return res.send("matching email")
        }

        let user_pk = "";
        let random_pk = Math.floor(Math.random()*4398046511104);
        user_pk = "u"+btoa(random_pk);
        user_pk = user_pk.replace(/=/g,'_')
        let check_pk = await db.query("select user_pk from users where user_pk=$1;",[user_pk]);
        if(check_pk.rows[0]!==undefined){
            let pk_check = false
            while(pk_check===true){
                random_pk = Math.floor(Math.random()*4398046511104);
                user_pk = "u"+btoa(random_pk);
                user_pk = user_pk.replace(/=/g,'_')
                check_pk = await db.query("select user_pk from users where user_pk=$1",[user_pk]);
                if(check_pk.rows[0]===undefined){
                    checkPk = true
                }
            }
        }

        let salt = Math.floor(Math.random()*4398046511104);

        let pw = ""
        await bcrypt.hash(req.body.pw, saltRounds).then(function async(hash) {
            pw = hash
        });
        
        await db.release();
        let t2 = new Date();
        await db.query(`insert into users (user_pk,user_email,user_pw,register_date,policy1,salt,user_ip) values ($1,$2,$3,$4,$5,$6,$7)`,[user_pk,req.body.id,pw,date,req.body.checkbox,salt,ip]);
        console.log("register time Taken " + (t2.getTime()-t1.getTime()))
        return res.send("registered");
        // 이거 찾아야함 
    }catch(err){
        console.log("error on register")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/login", async (req,res)=>{
    let t1 = new Date();
    try {
        console.log(req.body)
        if(req.body.id===undefined||req.body.id===null||req.body.pw===undefined||req.body.pw===null) return res.send("fail");
        const db = await client.connect();
        let result = await db.query("select user_pk,user_email,user_pw from users where user_email=$1",[req.body.id]);
        if(result.rows[0]===undefined){await db.release(); return res.send("fail")}
        let comparePass = await bcrypt.compareSync(req.body.pw,result.rows[0].user_pw);
        if(comparePass !== true){await db.release(); return res.send("fail")}

        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        let date = new Date();

        // session 
        let session = Math.floor(Math.random()*4398046511104)+".date"+date.setHours(date.getHours() + 4);
        
        // latest login date
        await db.query(`update users set last_login=$1,session=$2 where user_pk=$3`,[date,session,result.rows[0].user_pk]);
        await db.query(`insert into user_login_history (user_pk,date,ip_addr) values ($1,$2,$3)`,[result.rows[0].user_pk,date,ip])

        let temp_token = jwt.sign({user_pk:result.rows[0].user_pk},jwtConfig.key);
        let returnSession = jwt.sign({session:session},jwtConfig.key);
        let data = {
            user_name:req.body.id,
            token:temp_token,
            session:returnSession,
        }
        // return res.send(temp_token);
        await db.release();
        let t2 = new Date();
        console.log("login time Taken " + (t2.getTime()-t1.getTime()))
        return res.send(data);
    } catch(err){
        console.log(err);
        res.send("fail")
    }
})

// user 정보 가져오기 article 용
router.post("/article", async (req,res) => {
    console.log("auth article is called please check")
    try {
        let user_pk = req.body.user_pk;
        const db = await client.connect();
        let result = await db.query("select user_name,user_exp,profile_img_key,profile_img_type from users where user_pk=$1",[user_pk]);
        if (result.rows.length > 0){
            // get img data from s3
            let params = {
                'Bucket' : 'manaketstorage1',
                'Key' : 'article/ '+result.rows[0].profile_img_key
            }
            if(result.rows[0].profile_img_key === "default"){
                let defaultImg = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAU1QTFRFAAAACHz/D3L/CX3/BXz/B3z/Cn3/AHL/DYL/CH3/Bnv/CXz/CHv/Cn//CoD/CX7/CX//Cnv/CHz/CHz/CHz/CH3/CHz/CHz/CX3/CHz/CHv/CX3/CX3/CH3/CHz/CHz/CHz/CHz/AGf/CX3/CHz/CHz/CHz/CHz/CX3/CHz/CX3/CHz/CHz/CHz/CHz/CX3/CX3/CX3/CX3/CX3/CHz/CHz/CHz/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CXz/Bnv/CXz/CX3/CX3/CX3/CX3/CHz/CX3/CX3/CHz/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CX3/CHz/CHz/CX3/CX3/CHz/CHz/CX3/CX3/B3v/CXz/CX3/CX3/CX3/CHz/CX3/CH3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CH3/////JC9URgAAAGt0Uk5TAAAAAAAAAAAAAAAAAAAAAAAAAgQBAihSBxwBAQWwbbY7AwHNrEBoBhE5uZxq+j0DoYQ37jT0YwyJLwKo8iUBAgzImkP9P1Hax2L+9p0EXGWH7cPUIEL8+/76WQwL2Pj79nkGI0eVoGlPZgnSGdc6AAAAAWJLR0RuIg9RFwAAAAlwSFlzAAAASAAAAEgARslrPgAAAO5JREFUGNMtj1dTw0AMhCWWZgw4OEcCHCWhd9NLKAESSgKmYwg9dJD5/6+cPeyLNN/sSLtExMxuklm5ZqFIZqoapdqh/kGt4lS6rr6jsysGgO5Gj/SiL8xwNgaqoX9ABofCcJhHANIYHWscl4nJcGqaswZ4mJHZufn0wuLS8soqcuRZa7K+wcnN/Na27MAzjkJRdvf2D1Kl8uERfILG8cmpFH/PzuXikl3zxceVBMH1TeX2rknBOOz7B3l8Cp7DKl4siyiH14qURQKpwudmio68vX98fpW+f6CjKi2RWslxHJ1I2FF2u83zY2mTk/4Ak/QntPl+8qYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMDRUMTM6NTA6MTIrMDA6MDA7YhfaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTA0VDEzOjUwOjEyKzAwOjAwSj+vZgAAAABJRU5ErkJggg=="
                let json = {
                    "user_name" : result.rows[0].user_name,
                    "user_exp" : result.rows[0].user_exp,
                    "profile_img_b64" : defaultImg,
                    "profile_img_type" : result.rows[0].profile_img_type,
                }
                await db.release();
                return res.send(json);
            }else{
                await s3.getObject(params,async(err,data) => {
                    if(err) console.log(err);
                    let sample = data.Body
                    let back = sample.toString("base64")
                    let json = {
                        "user_name" : result.rows[0].user_name,
                        "user_exp" : result.rows[0].user_exp,
                        "profile_img_b64" : back,
                        "profile_img_type" : result.rows[0].profile_img_type,
                    }
                    await db.release();
                    return res.send(json)
                })
            }
        }else{
            await db.release();
            return res.send("cant find pk from db:error 1");
        }
    } catch (err) {
        console.log(err);
        return res.send("cant find pk from db:error 2");
    }
})

router.post("/userinfo",async(req,res)=>{
    try{
        if(req.body.secret_code==='very very secret code'){
            const db = await client.connect();
            let result = await db.query(`select user_pk,user_exp,reg_date,profile_img_key,profile_img_type from users where user_name=$1;`,[req.body.user_name])
            console.log(result.rows[0])
            await db.release();
            if(result.rows[0] === undefined){
                return res.send("fail");
            }else{
                // let result2 = await db.query(``);
                return res.send(result.rows[0])
            }
        }else{
            return res.send("fail")
        }
    }catch(err){
        console.log(err)
        console.log("error on user/userinfo")
    }
})

router.post("/checkcreatername",async(req,res)=>{
    try{
        if(req.body.token===undefined||req.body.name===undefined) return res.send("fail");
        jwt.verify(req.body.token,jwtConfig.key);
        const db = await client.connect();
        let result = await db.query(`select from creater where creater_name=$1`,[req.body.name])
        if(result.rows[0]===undefined){
            // 없음
            await db.release()
            return res.send(true)
        }else{
            // 있음
            await db.release()
            return res.send("fail")
        }
    }catch(err){
        console.log("error on checkcreatername")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/checkcreateraddress",async(req,res)=>{
    try{
        if(req.body.token===undefined||req.body.address===undefined) return res.send("fail");
        jwt.verify(req.body.token,jwtConfig.key);
        const db = await client.connect();
        let result = await db.query(`select from creater where creater_bbs_code=$1`,[req.body.address])
        if(result.rows[0]===undefined){
            // 없음
            await db.release()
            return res.send(true)
        }else{
            // 있음
            await db.release()
            return res.send("fail")
        }
        
    }catch(err){
        console.log("error on checkcreateraddress")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/createrregistry",async(req,res)=>{
    try{
        if(req.body.token===null||req.body.token===undefined||req.body.name===undefined||req.body.address===undefined||req.body.name===null||req.body.address===null) return res.send("fail")
        jwt.verify(req.body.token,jwtConfig.key);
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_pk":"')[1];
        temp = temp.split('","iat":')[0];
        
        const db = await client.connect();
        let checkregister = await db.query(`select from creater where user_pk=$1`,[temp])
        if(checkregister.rows[0]!==undefined){
            await db.release();
            return res.send("fail")
        }

        let checkname = await db.query(`select from creater where creater_name=$1`,[req.body.name])
        if(checkname.rows[0]!==undefined){
            await db.release();
            return res.send("matching name")
        }

        let checkaddress = await db.query(`select from creater where creater_bbs_code=$1`,[req.body.address])
        if(checkaddress.rows[0]!==undefined){
            await db.release();
            return res.send("matching address")
        }

        let date = new Date();
        let ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

        // insert creater
        await db.query(`insert into creater(user_pk,creater_name,creater_bbs_code,reg_date,reg_ip) values ($1,$2,$3,$4,$5)`,[temp,req.body.name,req.body.address,date,ip])

        // craatebbs
        let board_pk = "";
        let random_pk = Math.floor(Math.random()*4398046511104);
        board_pk = "b"+random_pk;
        
        let check_pk = await db.query(`select board_pk from board where board_pk=$1;`,[board_pk]);
        if(check_pk.rows[0]!==undefined){
            let pk_check = false
            while(pk_check===true){
                random_pk = Math.floor(Math.random()*4398046511104);
                board_pk = "b"+random_pk;
                check_pk = await db.query(`select board_pk from board where board_pk=$1;`,[board_pk]);
                if(check_pk.rows[0]===undefined){
                    checkPk = true
                }

            }
        }

        await db.query(`insert into board (board_pk,board_code,board_title,board_info,board_birth_day,board_member_cnt,fav_board_member_cnt,board_creater,board_manager,board_profile_img_key,board_profile_img_type,board_wall_img_key,board_wall_img_type,board_code_length) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,[board_pk,req.body.address,req.body.name+" 게시판",req.body.name+"님 게시판입니다.",date,1,0,temp,'','default','default','default','default',req.body.address.length])
        await db.query(`create table ${board_pk} (id serial primary key,article_pk varchar(100) not null,user_pk varchar(100) not null,art_title varchar(50) not null,art_content varchar(1000) not null,art_tag varchar(100),art_img_count int,art_cmt_count int,art_promote boolean default false,art_img_key varchar(1000),art_img_type varchar(100),art_upvote bigint default 0,art_views bigint default 0,creater_only boolean default false,support_only boolean default false,support_paint_only boolean default false,art_visible boolean default true,art_status varchar(100),art_date timestamp not null,art_fixed timestamp,art_ip inet);`)
        await db.query(`create table ${board_pk}_cmt (id serial primary key,article_pk varchar(100) not null,user_pk varchar(100) not null,comment_body varchar(3000) not null,cmt_upvote bigint default 0,cmt_visible boolean default true,cmt_status varchar(100),cmt_date timestamp not null,cmt_fixed timestamp,cmt_ip inet);`)

        await db.release();
        return res.send("success")
    }catch(err){
        console.log("error on createrRegistry")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/userToken",async(req,res)=>{
    try{
        if(req.body.token===undefined||req.body.cnt===undefined) return res.send("fail");
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_pk":"')[1];
        temp = temp.split('","iat":')[0];
        let manatoken = 0;

        let date = new Date();
        const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
        const db = await client.connect();
        let result = await db.query(`select user_token,user_id from users where user_pk=$1`,[temp])


        if(result.rows[0]===undefined){await db.release(); return res.send("fail")}
        if(result.rows[0].user_token!==null){
            let bytes = CryptoJS.AES.decrypt(result.rows[0].user_token, "manaketToken"+result.rows[0].user_id);
            manatoken = bytes.toString(CryptoJS.enc.Utf8)
        }
        manatoken = Number(manatoken) + Number(req.body.cnt)

        let entrypted = CryptoJS.AES.encrypt(manatoken.toString(), "manaketToken"+result.rows[0].user_id).toString();
        await db.query(`insert into users_token_history (user_pk,token_delta,state,end_user,date,ip_addr) values ($1,$2,$3,$4,$5,$6)`,[temp,req.body.cnt,'new token','',date,ip]);
        await db.query("update users set user_token=$1 where user_pk=$2",[entrypted,temp])

        await db.release();
        return res.send("success");
    }catch(err){
        console.log("error on userToken");
        console.log(err)
        return res.send("fail");
    }
})
// let defaultImg = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAU1QTFRFAAAACHz/D3L/CX3/BXz/B3z/Cn3/AHL/DYL/CH3/Bnv/CXz/CHv/Cn//CoD/CX7/CX//Cnv/CHz/CHz/CHz/CH3/CHz/CHz/CX3/CHz/CHv/CX3/CX3/CH3/CHz/CHz/CHz/CHz/AGf/CX3/CHz/CHz/CHz/CHz/CX3/CHz/CX3/CHz/CHz/CHz/CHz/CX3/CX3/CX3/CX3/CX3/CHz/CHz/CHz/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CXz/Bnv/CXz/CX3/CX3/CX3/CX3/CHz/CX3/CX3/CHz/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CX3/CHz/CHz/CX3/CX3/CHz/CHz/CX3/CX3/B3v/CXz/CX3/CX3/CX3/CHz/CX3/CH3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CX3/CHz/CH3/////JC9URgAAAGt0Uk5TAAAAAAAAAAAAAAAAAAAAAAAAAgQBAihSBxwBAQWwbbY7AwHNrEBoBhE5uZxq+j0DoYQ37jT0YwyJLwKo8iUBAgzImkP9P1Hax2L+9p0EXGWH7cPUIEL8+/76WQwL2Pj79nkGI0eVoGlPZgnSGdc6AAAAAWJLR0RuIg9RFwAAAAlwSFlzAAAASAAAAEgARslrPgAAAO5JREFUGNMtj1dTw0AMhCWWZgw4OEcCHCWhd9NLKAESSgKmYwg9dJD5/6+cPeyLNN/sSLtExMxuklm5ZqFIZqoapdqh/kGt4lS6rr6jsysGgO5Gj/SiL8xwNgaqoX9ABofCcJhHANIYHWscl4nJcGqaswZ4mJHZufn0wuLS8soqcuRZa7K+wcnN/Na27MAzjkJRdvf2D1Kl8uERfILG8cmpFH/PzuXikl3zxceVBMH1TeX2rknBOOz7B3l8Cp7DKl4siyiH14qURQKpwudmio68vX98fpW+f6CjKi2RWslxHJ1I2FF2u83zY2mTk/4Ak/QntPl+8qYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDQtMDRUMTM6NTA6MTIrMDA6MDA7YhfaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA0LTA0VDEzOjUwOjEyKzAwOjAwSj+vZgAAAABJRU5ErkJggg=="

router.post("/checklogin", async(req,res)=> {
    try{
        if(req.body.token===null||req.body.token===undefined||req.body.session===null||req.body.session===undefined) return res.send("fail")
        jwt.verify(req.body.token,jwtConfig.key);
        jwt.verify(req.body.session,jwtConfig.key);
        let temp = req.body.token;
        temp = temp.split(".")[1];
        temp = temp.split(".")[0];
        temp = atob(temp);
        temp = temp.split('{"user_pk":"')[1];
        temp = temp.split('","iat":')[0];

        let temp2 = req.body.session;
        temp2 = temp2.split(".")[1];
        temp2 = temp2.split(".")[0];
        temp2 = atob(temp2);
        temp2 = temp2.split('{"session":"')[1];
        temp2 = temp2.split('","iat":')[0];
        let date = new Date();
        if((temp2.split(".date")[1]-date.getTime())<0) return res.send("fail")
        const db = await client.connect();
        let result = await db.query("select user_token,user_id,user_exp,user_name,fav_board_pk,subs_board_pk,user_pw,profile_img_key,profile_img_type from users where user_pk=$1 and session=$2",[temp,temp2]);
        if(result.rows[0]===undefined){await db.release();return res.send('fail');}

        let favBoard = result.rows[0].fav_board_pk;
        let cntFav = parseInt(favBoard.length/10);
        let subBoard = result.rows[0].subs_board_pk;
        let cntSub = parseInt(subBoard.length/10);
        let favArray = [];
        let subArray = [];

        let manatoken = 0;
        if(result.rows[0].user_token!==null){
            let bytes = CryptoJS.AES.decrypt(result.rows[0].user_token, "manaketToken"+result.rows[0].user_id);
            manatoken = bytes.toString(CryptoJS.enc.Utf8)
        }

        let queryString = "select board_code,board_title from board where ";
        let queryString2 = "select board_code,board_title from board where ";

        //getboardinfo 
        for(let i = 0;i<cntFav;i++){
            let temp = favBoard.split(',')[i]
            if(temp !== undefined){
                if(i===cntFav-1){
                    queryString = queryString.concat(`board_pk='${favBoard.split(',')[i]}'`)
                }else{
                    queryString = queryString.concat(`board_pk='${favBoard.split(',')[i]}' or `)
                }
            }
        }

        for(let i = 0;i<cntSub;i++){
            let temp = subBoard.split(',')[i]
            if(temp !== undefined){
                if(i===cntSub-1){
                    queryString2 = queryString2.concat(`board_pk='${subBoard.split(',')[i]}'`)
                }else{
                    queryString2 = queryString2.concat(`board_pk='${subBoard.split(',')[i]}' or `)
                }
            }
        }
        let getboard = await db.query(`${queryString}`)
        let getboard2 = await db.query(`${queryString2}`)

        for(let i=0;i<getboard.rowCount;i++){
            favArray[i] = getboard.rows[i]
        }
        for(let i=0;i<getboard2.rowCount;i++){
            subArray[i] = getboard2.rows[i]
        }

        let data = {
            user_name:result.rows[0].user_name,
            exp:result.rows[0].user_exp,
            profile_key:result.rows[0].profile_img_key,
            profile_type:result.rows[0].profile_img_type,
            fav_board:favArray,
            sub_board:subArray,
            manatoken:manatoken
        }
        db.release();
        return res.send(data);
    }catch(err){
        console.log("error on checklogin")
        console.log(err)
        return res.send("fail")
    }
})

module.exports = router;