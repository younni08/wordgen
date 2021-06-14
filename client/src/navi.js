import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import {getCookie} from "./components/common/cookie"

const Navi = () => {
    const [login,setLogin] = useState(false)
    const [expand,setExpand] = useState(false);
    useEffect(()=>{
        init();
    },[])

    const init = () => {
        let token = getCookie("token")
        if(token!==null){
            setLogin(true)
        }
    }

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
    }

    const logout = () => {
        deleteCookie("token")
        deleteCookie("session")
    }

    const expandmenu = () => {
        console.log(expand)
        if(expand===false){
            setExpand(true)
            document.getElementById("navi_mobile").style.height = "287px"
        }else{
            setExpand(false)
            document.getElementById("navi_mobile").style.height = "0px"
        }
    }

    return (
        <div className="navi">
            <div>
                <div className="navi_level1">
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
                        <Link to="/code"><span>임시2</span></Link>
                    </div>
                    {
                        login?<div><Link className="logout" to="/"  onClick={logout}>로그아웃</Link></div>:<div>
                            <Link to="/login"><span>로그인</span></Link>
                            <Link to="/register"><span>회원가입</span></Link>
                        </div>
                    }
                    <span onClick={expandmenu}><i className="xi-bars xi-x"></i></span>
                </div>
                <div className="navi_level2" id="navi_mobile">
                    <Link to="/"><span className="on">특징</span></Link>
                    <Link to="/solution"><span>솔루션</span></Link>
                    <Link to="/price"><span>가격</span></Link>
                    <Link to="/studio"><span>임시</span></Link>
                    <Link to="/code"><span>임시2</span></Link>
                    {
                        login?<div><Link className="logout" to="/" onClick={logout}><span>로그아웃</span></Link></div>:<div>
                            <Link to="/login"><span>로그인</span></Link>
                            <Link to="/register"><span>회원가입</span></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navi;