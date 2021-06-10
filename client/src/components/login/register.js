import React, { useState } from "react";
import axios from "axios"
import {Redirect} from "react-router-dom";

const Login = () => {
    const [id,setId] = useState("")
    const [pw,setPw] = useState("")
    const [pw2,setPw2] = useState("")
    const [type,setType] = useState("")
    const [checkpw,setCheckpw] = useState(false)
    const [checkpw1,setCheckpw1] = useState(false)
    const [checkpw2,setCheckpw2] = useState(false)
    const [checkid,setCheckid] = useState(false)
    const [checktype,setChecktype] = useState(false)
    const [checkagree,setCheckagree] = useState(false)
    const [checkpwlength,setCheckpwlength] = useState(false)
    const [repeatemail,setRepeatemail] = useState(false)
    const [redirect,setRedirect] = useState(false)

    const handleInput1 = (e) => {setId(e.target.value)}
    const handleInput2 = (e) => {setPw(e.target.value)}
    const handleInput3 = (e) => {setPw2(e.target.value)}

    const clicktype1 = () => {
        document.getElementById("login_checkuser2").className = ""
        document.getElementById("login_checkuser1").className = "on"
        setType("teacher")
    }
    const clicktype2 = () => {
        document.getElementById("login_checkuser1").className = ""
        document.getElementById("login_checkuser2").className = "on"
        setType("student")
    }

    const register = async() => {
        setCheckpw(false)
        setCheckpw1(false)
        setCheckpw2(false)
        setCheckid(false)
        setChecktype(false)
        setCheckagree(false)
        setCheckpwlength(false)
        setRepeatemail(false)

        let url = "/api/user/register"
        if(id==="") return setCheckid(true)
        if(pw==="") return setCheckpw1(true)
        if(pw.length<8) return setCheckpwlength(true)
        if(pw2==="") return setCheckpw2(true)
        if(pw!==pw2) return setCheckpw(true)
        if(type!=="teacher"&&type!=="student") return setChecktype(true)
        let getCheckbox = document.getElementById("login_agreement").checked
        if(getCheckbox===false) return setCheckagree(true)

        // type,agree
        let params = {
            id:id,
            pw:pw,
            checkbox:getCheckbox,
            type:type
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
        if(res.data==="registered"){
            alert("회원가입되었습니다.")
            return setRedirect(true)
        }
        if(res.data==="fail"){
            return alert("잘못된 접근입니다.")
        }
        if(res.data==="id is too short"){
            return alert("비밀번호가 너무 짧아요.")
        }
        if(res.data==="matching email"){
            return setRepeatemail(true)
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
                    <span>회원가입</span>
                </div>
                <div className="login_general_input">
                    <span>아이디</span>
                    <div>
                        <input type="email" onChange={handleInput1} placeholder="wordGen@wordgen.kr" />
                    </div>
                </div>
                {
                    checkid?<div className="login_alert">
                        <span>이메일을 입력해주세요.</span>
                    </div>:""
                }
                {
                    repeatemail?<div className="login_alert">
                        <span>중복되는 이메일이 존재합니다.</span>
                    </div>:""
                }
                <div className="login_general_input">
                    <span>비밀번호</span>
                    <div>
                        <input type="password" onChange={handleInput2} placeholder="비밀번호" />
                    </div>
                </div>
                {
                    checkpw1?<div className="login_alert">
                        <span>비밀번호를 입력해주세요.</span>
                    </div>:""
                }
                {
                    checkpwlength?<div className="login_alert">
                        <span>비밀번호는 8자 이상 입력해주세요.</span>
                    </div>:""
                }
                <div className="login_general_input">
                    <span>비밀번호 재입력</span>
                    <div>
                        <input type="password" onChange={handleInput3} placeholder="비밀번호를 다시 입력해주세요" />
                    </div>
                </div>
                {
                    checkpw2?<div className="login_alert">
                        <span>비밀번호를 다시 입력해주세요.</span>
                    </div>:""
                }
                {
                    checkpw?<div className="login_alert">
                        <span>비밀번호가 일치하지 않습니다.</span>
                    </div>:""
                }
                <div className="login_checkuser">
                    <div id="login_checkuser1" onClick={clicktype1}>
                        <span><i className="xi-book-o xi-x" /></span>
                        <span>교육자</span>
                    </div>
                    <div id="login_checkuser2" onClick={clicktype2}>
                        <span><i className="xi-user xi-x" /></span>
                        <span>학생</span>
                    </div>
                </div>
                {
                    checktype?<div className="login_alert">
                        <span>교육자 혹은 학생을 선택해주세요.</span>
                    </div>:""
                }
                <div className="login_agreement">
                    <label htmlFor="login_agreement">이용 약관에 동의하십니까?</label>
                    <input type="checkbox" id="login_agreement" />
                </div>
                {
                    checkagree?<div className="login_alert">
                        <span>약관에 동의해야 진행이 가능합니다.</span>
                    </div>:""
                }
                <span className="login_submit" onClick={register}>회원가입</span>
                {
                    redirect?<Redirect to="/login" />:""
                }
            </div>
        </div>
    )
}

export default Login;