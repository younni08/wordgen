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
                    <span>회원가입</span>
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
                        <input onChange={handleInput2} placeholder="비밀번호" />
                    </div>
                </div>
                <div className="login_general_input">
                    <span>비밀번호 재입력</span>
                    <div>
                        <input onChange={handleInput2} placeholder="비밀번호를 다시 입력해주세요" />
                    </div>
                </div>
                <div className="login_checkuser">
                    <div>
                        <span><i className="xi-book-o xi-x" /></span>
                        <span>교육자</span>
                    </div>
                    <div>
                        <span><i className="xi-user xi-x" /></span>
                        <span>학생</span>
                    </div>
                </div>
                <div className="login_agreement">
                    <label htmlFor="login_agreement">이용 약관에 동의하십니까?</label>
                    <input type="checkbox" id="login_agreement" />
                </div>
                <span className="login_submit">회원가입</span>
            </div>
        </div>
    )
}

export default Login;