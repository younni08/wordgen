import React from "react";
import {Link} from "react-router-dom";

const Navi = () => {
    return (
        <div className="navi">
            <div>
                <div>
                    <Link to="/">
                        <img src="./pics/wordgenlogo2.png" alt="wordgen_logo" />
                        <span>wordGen</span>
                    </Link>
                </div>
                <div>
                    <Link to="/"><span className="on">특징</span></Link>
                    <Link to="/solution"><span>솔루션</span></Link>
                    <Link to="/price"><span>가격</span></Link>
                    <Link to="/studio"><span>임시</span></Link>
                </div>
                <div>
                    <Link to="/login"><span>로그인</span></Link>
                    <Link to="/register"><span>회원가입</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Navi;