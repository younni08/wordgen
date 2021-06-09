import React, { useState } from "react";

const Login = () => {
    const [id,setId] = useState("")
    const [pw,setPw] = useState("")

    const handleInput1 = (e) => {setId(e.target.value)}
    const handleInput2 = (e) => {setPw(e.target.value)}

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
                        <input onChange={handleInput2} placeholder="너와 나의 비밀번호" />
                    </div>
                </div>
                <span className="login_submit">로그인</span>
                <div className="login_options">
                    <span>회원가입</span>
                    <span>비밀번호 찾기</span>
                </div>
            </div>
        </div>
    )
}

export default Login;