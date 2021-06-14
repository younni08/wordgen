const router = require("express").Router();
const multer = require("multer");
let storage = multer.memoryStorage();
const upload = multer({storage:storage});


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

const aws = require("aws-sdk");
const s3Json = fs.readFileSync(path.resolve(__dirname,"./../aws_key.json"));
const s3Config = JSON.parse(s3Json);
const s3 = new aws.S3({
    accessKeyId:s3Config.access_key_id,
    secretAccessKey:s3Config.secret_access_key,
    region:'ap-northeast-2'
})


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

const uploadtoS3 = (file,name,type) => {
    let param ={
        'Bucket':'wordgendb',
        'Key':'general/ '+ name,
        'ACL':'authenticated-read',
        'Body':file,
        'Content-Type': type
    }
    return s3.upload(param, (err,data) => {
        if(err!==null){console.log(err);}
        // console.log(data);
    })
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
        // if(req.body.token===null||req.body.token===undefined||req.body.session===null||req.body.session===undefined) return res.send("fail")
        const db = await client.connect();
        let qrcode = Math.floor(Math.random()*4398046511104);
        let code = btoa(qrcode)
        code = code.replace(/=/g,'')
        let pass = Math.floor(Math.random()*9999);

        let checkrepeat = await db.query(`select from questionbank where question_pk = $1`,[code])
        if(checkrepeat.rows[0]!==undefined){
            let pk_check = false
            while(pk_check===true){
                random_pk = Math.floor(Math.random()*4398046511104);
                user_pk = btoa(random_pk);
                user_pk = user_pk.replace(/=/g,'')
                checkrepeat = await db.query(`select from questionbank where question_pk = $1`,[code])
                if(checkrepeat.rows[0]===undefined){
                    checkPk = true
                }
            }
        }
        let returnArray = {code:code,pass:pass}

        await db.release();
        return res.send(returnArray)
    }catch(err){
        console.log("error on save question")
        console.log(err)
        return res.send("fail")
    }
})

router.post("/savequestion",upload.any(),async(req,res)=>{
    try{
        if(req.body.pass===undefined||req.body.pass===null||req.body.type===undefined||req.body.type===null||req.body.qrcode===undefined||req.body.qrcode===null)
        // if(req.body.token===null||req.body.token===undefined||req.body.session===null||req.body.session===undefined) return res.send("fail")
        console.log(req.body.type)
        const db = await client.connect();
        jwt.verify(req.body.token,jwtConfig.key);
        jwt.verify(req.body.session,jwtConfig.key);

        let user_pk = req.body.token;
        user_pk = user_pk.split(".")[1];
        user_pk = user_pk.split(".")[0];
        user_pk = atob(user_pk);
        user_pk = user_pk.split('{"user_pk":"')[1];
        user_pk = user_pk.split('","iat":')[0];

        let session = req.body.session;
        session = session.split(".")[1];
        session = session.split(".")[0];
        session = atob(session);
        session = session.split('{"session":"')[1];
        session = session.split('","iat":')[0];
        let date = new Date();
        const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

        let checkrepeat = await db.query(`select from questionbank where question_pk = $1`,[req.body.qrcode])
        if(checkrepeat.rows[0]!==undefined){
            // qrcode 변경된걸로 안내해주기

        }

        // log 찍어야함
        if(req.body.type==="vote"){
            await db.query(`insert into questionbank(user_pk,question_pk,question_type,question_series_cnt,question_title,question_choice,question_choice1_txt,question_choice2_txt,question_choice3_txt,question_choice4_txt,question_choice5_txt,question_chart_type,question_date,question_ip,question_pass) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,[user_pk,req.body.qrcode,req.body.type,0,req.body.question,req.body.voteAddlevel,req.body.voteString1,req.body.voteString2,req.body.voteString3,req.body.voteString4,req.body.voteString5,req.body.voteChartType,date,ip,req.body.pass])
        }
        if(req.body.type==="wordcloud"){
            await db.query(`insert into questionbank(user_pk,question_pk,question_type,question_series_cnt,question_title,question_choice,question_date,question_ip,question_pass) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[user_pk,req.body.qrcode,req.body.type,0,req.body.question,req.body.wcmaxword,date,ip,req.body.pass])
        }
        if(req.body.type==="question"){
            let key = "";
            if(req.body.image_cnt===1){
                key = user_pk+"#"+req.body.qrcode;
                await uploadtoS3(req.files[0].buffer,key,req.files[0].mimetype)
            }
            await db.query(`insert into questionbank(user_pk,question_pk,question_type,question_series_cnt,question_title,question_choice,question_choice1_txt,question_choice2_txt,question_choice3_txt,question_choice4_txt,question_choice5_txt,question_longtext,question_date,question_ip,question_pass,question_image_cnt,question_image_key,question_image_type) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,[user_pk,req.body.qrcode,req.body.type,0,req.body.question,req.body.voteAddlevel,req.body.voteString1,req.body.voteString2,req.body.voteString3,req.body.voteString4,req.body.voteString5,req.body.longText,date,ip,req.body.pass,req.body.image_cnt,key,req.files[0].mimetype])
        }

        await db.release();
        return res.send("success")
    }catch(err){
        console.log("error on save question")
        console.log(err)
        return res.send("fail")
    }
})

// https://www.wordgen.kr/#/code?q=MzE0Nzc0MjA1MTIxNg#8902

router.post("/encouterinit",async(req,res)=>{
    try{
        console.log(req.body)
        let returnArray = [];
        const db = await client.connect();
        let result = await db.query(`select question_pk,question_pass,user_pk,question_type,question_series,question_series_cnt,question_title,question_image_cnt,question_image_key,question_image_type,question_image_position,question_user_encouter,question_choice,question_choice1_txt,question_choice2_txt,question_choice3_txt,question_choice4_txt,question_choice5_txt,question_chart_type,question_longText,question_date from questionbank where question_pk=$1 and question_pass=$2 and question_valid=true`,[req.body.code,req.body.pass])
        if(result.rows[0]===undefined){
            await db.release();
            return res.send("fail")
        }
        if(result.rows[0].question_type==="vote"){
            returnArray={
                type:"vote",
                data:{
                    user_pk:result.rows[0].user_pk,
                    question_pk:result.rows[0].question_pk,
                    question_pass:result.rows[0].question_pass,
                    question_type:result.rows[0].question_type,
                    question_series_cnt:result.rows[0].question_series_cnt,
                    question_title:result.rows[0].question_title,
                    question_choice:result.rows[0].question_choice,
                    question_choice1_txt:result.rows[0].question_choice1_txt,
                    question_choice2_txt:result.rows[0].question_choice2_txt,
                    question_choice3_txt:result.rows[0].question_choice3_txt,
                    question_choice4_txt:result.rows[0].question_choice4_txt,
                    question_choice5_txt:result.rows[0].question_choice5_txt,
                    question_chart_type:result.rows[0].question_chart_type,
                    question_date:result.rows[0].question_date
                }
            }
        }
        if(result.rows[0].question_type==="wordcloud"){
            returnArray={
                type:"wordcloud",
                data:{
                    user_pk:result.rows[0].user_pk,
                    question_pk:result.rows[0].question_pk,
                    question_pass:result.rows[0].question_pass,
                    question_type:result.rows[0].question_type,
                    question_series_cnt:result.rows[0].question_series_cnt,
                    question_title:result.rows[0].question_title,
                    question_choice:result.rows[0].question_choice,
                    question_date:result.rows[0].question_date
                }
            }
        }
        if(result.rows[0].question_type==="question"){
            returnArray={
                type:"question",
                data:{
                    user_pk:result.rows[0].user_pk,
                    question_pk:result.rows[0].question_pk,
                    question_pass:result.rows[0].question_pass,
                    question_type:result.rows[0].question_type,
                    question_series_cnt:result.rows[0].question_series_cnt,
                    question_title:result.rows[0].question_title,
                    question_choice:result.rows[0].question_choice,
                    question_choice1_txt:result.rows[0].question_choice1_txt,
                    question_choice2_txt:result.rows[0].question_choice2_txt,
                    question_choice3_txt:result.rows[0].question_choice3_txt,
                    question_choice4_txt:result.rows[0].question_choice4_txt,
                    question_choice5_txt:result.rows[0].question_choice5_txt,
                    question_longtext:result.rows[0].question_longtext,
                    question_image_cnt:result.rows[0].question_image_cnt,
                    question_image_key:result.rows[0].question_image_key,
                    question_image_type:result.rows[0].question_image_type,
                    question_date:result.rows[0].question_date
                }
            }
        }
        await db.release();
        return res.send(returnArray)
    }catch(err){
        console.log("error on encouterinit")
        console.log(err)
        return res.send("fail")
    }
})
  

module.exports = router;