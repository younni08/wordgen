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

router.post("/checkgrcode",async(req,res)=>{
    try{
        console.log(req.body)
        return res.send("qrcode")
    }catch(err){
        console.log("error on save question")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/savequestion",async(req,res)=>{
    try{
        console.log(req.body)
        return res.send("ccc")
    }catch(err){
        console.log("error on save question")
        console.log(err)
        return res.send("fail")
    }
})

module.exports = router;