import axios from "axios";
import {Link} from "react-router-dom";
import React, { useState } from "react";
import {Redirect} from "react-router-dom";

const Login = () => {
    const [id,setId] = useState("")
    const [pw,setPw] = useState("")
    const [loginfail,setLoginfail] = useState(false)
    const [redirect,setRedirect] = useState(false)

    const handleInput1 = (e) => {setId(e.target.value)}
    const handleInput2 = (e) => {setPw(e.target.value)}

    const setCookie = (name, value, exp) => {
        var date = new Date();
        date.setTime(date.getTime() + exp*60*60*1000*2);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };

    const submit = async() => {
        setLoginfail(false)
        let url = "/api/user/login"
        let params = {
            id:id,
            pw:pw
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
        if(res.data==="fail") return setLoginfail(true)
        if(res.data!=="fail"){
            await setCookie('token',res.data.token,2);
            await setCookie('session',res.data.session,2);
            setRedirect(true)
        }
    }

    return (
        <div className="login">
            <div>
                <div className="login_welcome">
                    <div>
                        <img src="./pics/wordgenlogo2.png" alt="wordgen company logo" />
                        <span>wordGen</span>
                    </div>
                    <span>환영합니다!</span>
                </div>
                <div className="login_general_input">
                    <span>아이디</span>
                    <div>
                        <input onChange={handleInput1} placeholder="wordGen@wordgen.kr" />
                    </div>
                </div>
                <div className="login_general_input">
                    <span>비밀번호</span>
                    <div>
                        <input type="password" onChange={handleInput2} placeholder="너와 나의 비밀번호" />
                    </div>
                </div>
                <span className="login_submit" onClick={submit}>로그인</span>
                {
                    loginfail?<div className="login_alert">
                        <span>로그인 정보를 확인해주세요.</span>
                    </div>:""
                }
                {
                    redirect?<Redirect to="/studio" />:""
                }
                <div className="login_options">
                    <Link to="/register">회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;