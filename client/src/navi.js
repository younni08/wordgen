import React from "react";

const Navi = () => {
    return (
        <div className="navi">
            <div>
                <img src="./pics/wordgenlogo.png" alt="wordgen_logo" />
                <span>wordGen</span>
            </div>
            <div>
                <span>특징</span>
                <span>솔루션</span>
                <span>가격</span>
            </div>
            <div>
                <span>로그인</span>
                <span>회원가입</span>
            </div>
        </div>
    )
}

export default Navi;