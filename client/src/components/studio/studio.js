import React,{useState} from "react";
import Mobileview from "./mobile_view"

const Studio = () => {
    const [type,setType] = useState("")
    const [menu1,setMenu1] = useState(true)
    const [menu2,setMenu2] = useState(false)
    const [menu3,setMenu3] = useState(false)

    const studioMenu = (e) => {
        console.log(e.currentTarget.getAttribute("id"))
        if(e.currentTarget.getAttribute("id")==="studio_menu1"){
            document.getElementById("studio_menu2").className=""
            document.getElementById("studio_menu3").className=""
            document.getElementById("studio_menu1").className="on"
            document.getElementById("studio_menubox2").className="studio_menubox_hidden"
            document.getElementById("studio_menubox1").className="studio_menubox"
        }
        if(e.currentTarget.getAttribute("id")==="studio_menu2"){
            document.getElementById("studio_menu1").className=""
            document.getElementById("studio_menu3").className=""
            document.getElementById("studio_menu2").className="on"
            document.getElementById("studio_menubox1").className="studio_menubox_hidden"
            document.getElementById("studio_menubox2").className="studio_menubox"
        }
        if(e.currentTarget.getAttribute("id")==="studio_menu3"){
            document.getElementById("studio_menu1").className=""
            document.getElementById("studio_menu2").className=""
            document.getElementById("studio_menu3").className="on"
            document.getElementById("studio_menubox1").className="studio_menubox_hidden"
            document.getElementById("studio_menubox2").className="studio_menubox_hidden"
        }
    }

    const tempType1 = () => {
        document.getElementById("studio_type_wordcloud").className="studio_typebox"
        document.getElementById("studio_type_vote").className="studio_typebox_on"
        setType("vote")
    }

    const tempType2 = () => {
        document.getElementById("studio_type_vote").className="studio_typebox"
        document.getElementById("studio_type_wordcloud").className="studio_typebox_on"
        setType("wordcloud")
    }

    return (
        <div className="studio">
            <div>
                <div className="studio_navi">
                    <span>추가 메뉴</span>
                    <span>생각 중</span>
                </div>
                <div className="studio_main">
                    <div className="studio_level1">
                        <div className="studio_mobile">
                            <Mobileview
                                type={type}
                            />
                        </div>
                        <div className="studio_menu">
                            <div>
                                <span id="studio_menu1" onClick={studioMenu} className="on">종류</span>
                                <span id="studio_menu2" onClick={studioMenu}>설정</span>
                                <span id="studio_menu3" onClick={studioMenu}>추가 설정</span>
                            </div>

                            {/* studio menu 1 start */}
                            <div className="studio_menubox" id="studio_menubox1">
                                <div className="studio_menubox1">
                                    <div className="studio_typebox" id="studio_type_vote" onClick={tempType1}>
                                        <div>
                                            <i className="xi-chart-bar xi-2x"></i>
                                        </div>
                                        <span>투표</span>
                                    </div>
                                    <div className="studio_typebox" id="studio_type_wordcloud" onClick={tempType2}>
                                        <div>
                                            <i className="xi-cloud-o xi-2x"></i>
                                        </div>
                                        <span>워드 클라우드</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-paper-o xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-chart-pie xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-image-o xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-movie xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-timer-o xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-camera-o xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                    <div className="studio_typebox">
                                        <div>
                                            <i className="xi-file-o xi-2x"></i>
                                        </div>
                                        <span>추가 예정</span>
                                    </div>
                                </div>fd
                            </div>
                            {/* studio menu 1 end */}

                            {/* studio menu 2 start */}
                            <div className="studio_menubox" id="studio_menubox2">
                                <div className="studio_menubox2">
                                    <div className="studio_menubox2_general">
                                        <div>
                                            <span>질문을 적어주세요.</span>

                                        </div>
                                        <div className="inputwapper_text">
                                            <input placeholder="학생들에게 무엇을 물어볼까요?" />
                                        </div>
                                    </div>
                                    <div className="studio_menubox2_general">
                                        <div>
                                            <span>옵션</span>

                                        </div>
                                        <div className="inputwapper_singlebutton">
                                            <span><i className="xi-plus-min xi-x" />옵션 추가하기</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* studio menu 2 end */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio;