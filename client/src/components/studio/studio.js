import React,{useMemo, useState} from "react";
import Mobileview from "./mobile"
import ReactQuill from "react-quill";
import QRCode from "qrcode.react"
// var QRCode = require('qrcode.react');
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { getCookie } from "../common/cookie";

const Studio = () => {

    // general
    const [type,setType] = useState("")
    const [question,setQuestion] = useState("")
    const [typevote,setTypevote] = useState(false)
    const [typewordcloud,setTypewordcloud] = useState(false)
    const [typequestion,setTypequestion] = useState(false)

    const studioMenu = (e) => {
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

    const getType = (e) => {
        document.getElementById("studio_menubox1").className="studio_menubox_hidden"
        document.getElementById("studio_menubox2").className="studio_menubox"
        document.getElementById("studio_menu1").className=""
        document.getElementById("studio_menu3").className=""
        document.getElementById("studio_menu2").className="on"
        if(e.currentTarget.getAttribute("id")==="studio_type_vote"){
            document.getElementById("studio_type_wordcloud").className="studio_typebox"
            document.getElementById("studio_type_question").className="studio_typebox"
            document.getElementById("studio_type_vote").className="studio_typebox_on"
            setType("vote")
            setTypewordcloud(false)
            setTypequestion(false)
            setTypevote(true)
        }
        if(e.currentTarget.getAttribute("id")==="studio_type_wordcloud"){
            document.getElementById("studio_type_question").className="studio_typebox"
            document.getElementById("studio_type_vote").className="studio_typebox"
            document.getElementById("studio_type_wordcloud").className="studio_typebox_on"
            setType("wordcloud")
            setTypevote(false)
            setTypequestion(false)
            setTypewordcloud(true)
        }
        if(e.currentTarget.getAttribute("id")==="studio_type_question"){
            document.getElementById("studio_type_vote").className="studio_typebox"
            document.getElementById("studio_type_wordcloud").className="studio_typebox"
            document.getElementById("studio_type_question").className="studio_typebox_on"
            setType("question")
            setTypevote(false)
            setTypewordcloud(false)
            setTypequestion(true)
        }
    }

    const handleQuestion = (e) => {setQuestion(e.target.value)}

    // vote
    const [voteAddlevel,setVooteAddleve] = useState(0)
    const [voteString1,setVoteString1] = useState("")
    const [voteString2,setVoteString2] = useState("")
    const [voteString3,setVoteString3] = useState("")
    const [voteString4,setVoteString4] = useState("")
    const [voteString5,setVoteString5] = useState("")

    const handleVoteString1 = (e) => {setVoteString1(e.target.value)}
    const handleVoteString2 = (e) => {setVoteString2(e.target.value)}
    const handleVoteString3 = (e) => {setVoteString3(e.target.value)}
    const handleVoteString4 = (e) => {setVoteString4(e.target.value)}
    const handleVoteString5 = (e) => {setVoteString5(e.target.value)}

    const [voteChartType,setVoteChartType] = useState("")

    const typeVoteAddList = () => {
        if(voteAddlevel===0){
            setVooteAddleve(1)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "50px"
        }
        if(voteAddlevel===1){
            setVooteAddleve(2)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "100px"
        }
        if(voteAddlevel===2){
            setVooteAddleve(3)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "150px"
        }
        if(voteAddlevel===3){
            setVooteAddleve(4)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "200px"
        }
        if(voteAddlevel===4){
            setVooteAddleve(5)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "250px"
        }
    }

    const handleVoteChartType = (e) => {
        if(e.currentTarget.getAttribute("id")==="chart_bar_verti"){
            document.getElementById("chart_pie").className=""
            document.getElementById("chart_bar_hori").className=""
            document.getElementById("chart_bar_verti").className="on"
            setVoteChartType("chart_bar_verti")
        }
        if(e.currentTarget.getAttribute("id")==="chart_bar_hori"){
            document.getElementById("chart_bar_verti").className=""
            document.getElementById("chart_bar_hori").className="on"
            document.getElementById("chart_pie").className=""
            setVoteChartType("chart_bar_hori")
        }
        if(e.currentTarget.getAttribute("id")==="chart_pie"){
            document.getElementById("chart_bar_verti").className=""
            document.getElementById("chart_bar_hori").className=""
            document.getElementById("chart_pie").className="on"
            setVoteChartType("chart_pie")
        }
    }

    const removeVoteList = (e) => {
        if(voteAddlevel===1){
            setVooteAddleve(0)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "0px"
        }
        if(voteAddlevel===2){
            setVooteAddleve(1)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "50px"
        }
        if(voteAddlevel===3){
            setVooteAddleve(2)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "100px"
        }
        if(voteAddlevel===4){
            setVooteAddleve(3)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "150px"
        }
        if(voteAddlevel===5){
            setVooteAddleve(4)
            document.getElementById("studio_menubox2_general_inputlist").style.height = "200px"
        }
        if(e.currentTarget.getAttribute("id")==="removeVoteList1"){
            let temp2 = voteString2
            let temp3 = voteString3
            let temp4 = voteString4
            let temp5 = voteString5
            setVoteString1(temp2)
            setVoteString2(temp3)
            setVoteString3(temp4)
            setVoteString4(temp5)
            setVoteString5("")
        }
        if(e.currentTarget.getAttribute("id")==="removeVoteList2"){
            let temp3 = voteString3
            let temp4 = voteString4
            let temp5 = voteString5
            setVoteString2(temp3)
            setVoteString3(temp4)
            setVoteString4(temp5)
            setVoteString5("")
        }
        if(e.currentTarget.getAttribute("id")==="removeVoteList3"){
            let temp4 = voteString4
            let temp5 = voteString5
            setVoteString3(temp4)
            setVoteString4(temp5)
            setVoteString5("")
        }
        if(e.currentTarget.getAttribute("id")==="removeVoteList4"){
            let temp5 = voteString5
            setVoteString4(temp5)
            setVoteString5("")
        }
        if(e.currentTarget.getAttribute("id")==="removeVoteList5"){
            setVoteString5("")
        }
    }

    // wordcloud
    const [wcMaxWord,setWcMaxWord] = useState(5)
    const setWCMaxword = (e) => {
        let temp = wcMaxWord;
        if(e.currentTarget.getAttribute("id")==="wcMaxIncrease"){
            if(temp===30) return 0
            temp = temp + 1
            setWcMaxWord(temp)
        }
        if(e.currentTarget.getAttribute("id")==="wcMaxDecrease"){
            if(temp===1) return 0
            temp = temp - 1
            setWcMaxWord(temp)
        }
    }

    const handleWcMaxword = (e) => {setWcMaxWord(e.target.value)}

    // question
    const [longText,setLongText] = useState("")
    const [studioimage,setStudioimage] = useState("");
    // 이건 필요한지 잘 모르겠음

    const handleLongText = (e) => {setLongText(e)}
    // 이미지 미리보기 추가해야함

    const readFile = (e) => {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setStudioimage(imageUrl);
    }

    
    // general function

    
    const init = async() => {
        let url = "/api/user/checkgrcode"
        let token = getCookie("token")
        let session = getCookie("session")
        // if(toekn===null|session===null) return alert("로그인 후 이용하세요.")
        let params = {
            token:token,
            session:session
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
    }
    
    useMemo(()=>{
        init()
    },[window.location.href])

    const sumitquestion = async() => {
        let url = "/api/user/savequestion";
        let formData = new FormData();
        let params = {
            type:type,
            question:question,
            voteAddlevel:voteAddlevel,
            voteString1:voteString1,
            voteString2:voteString2,
            voteString3:voteString3,
            voteString4:voteString4,
            voteString5:voteString5,
            voteChartType:voteChartType,
            longText:longText,
            studioimage:studioimage
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
    }

    return (
        <div className="studio">
            <div>
                <div className="studio_navi">
                    <span>요금제 변경</span>
                    <span>내 작업실</span>
                </div>
                <div className="studio_main">
                    <div className="studio_level1">
                        <div className="studio_mobile">
                            <Mobileview
                                type={type}
                                question={question}
                                voteAddlevel={voteAddlevel}
                                voteString1={voteString1}
                                voteString2={voteString2}
                                voteString3={voteString3}
                                voteString4={voteString4}
                                voteString5={voteString5}
                                voteChartType={voteChartType}
                                longText={longText}
                                studioimage={studioimage}
                            />
                        </div>
                        <div className="studio_menu">
                            <div>
                                <span id="studio_menu1" onClick={studioMenu} className="on">종류</span>
                                <span id="studio_menu2" onClick={studioMenu}>설정</span>
                                <span id="studio_menu3" onClick={studioMenu}>고급 설정</span>
                            </div>

                            {/* studio menu 1 start */}
                            <div className="studio_menubox" id="studio_menubox1">
                                <div className="studio_menubox1">
                                    <div className="studio_typebox" id="studio_type_vote" onClick={getType}>
                                        <div>
                                            <i className="xi-chart-bar xi-2x"></i>
                                        </div>
                                        <span>투표</span>
                                    </div>
                                    <div className="studio_typebox" id="studio_type_wordcloud" onClick={getType}>
                                        <div>
                                            <i className="xi-cloud-o xi-2x"></i>
                                        </div>
                                        <span>워드 클라우드</span>
                                    </div>
                                    <div className="studio_typebox" id="studio_type_question" onClick={getType}>
                                        <div>
                                            <i className="xi-timer-o xi-2x"></i>
                                        </div>
                                        <span>문제 풀이</span>
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
                                </div>
                            </div>
                            {/* studio menu 1 end */}

                            {/* studio menu 2 start */}
                            <div className="studio_menubox_hidden" id="studio_menubox2">
                                {
                                    typevote?
                                    <div className="studio_menubox2">
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>질문을 적어주세요.</span>
                                            </div>
                                            <div className="inputwapper_text">
                                                <input onChange={handleQuestion} placeholder="학생들에게 무엇을 물어볼까요?" />
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>옵션</span>
                                                <span>최대 5개까지 가능합니다.</span>
                                            </div>
                                            <div className="inputwapper_singlebutton" onClick={typeVoteAddList}>
                                                <span><i className="xi-plus-min xi-x" />옵션 추가하기</span>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general_inputlist" id="studio_menubox2_general_inputlist">
                                            <div>
                                                <span>1.</span>
                                                <input placeholder="첫번째 질문" onChange={handleVoteString1} />
                                                <span id="removeVoteList1" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>2.</span>
                                                <input placeholder="두번째 질문" onChange={handleVoteString2} />
                                                <span id="removeVoteList2" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>3.</span>
                                                <input placeholder="세번째 질문" onChange={handleVoteString3} />
                                                <span id="removeVoteList3" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>4.</span>
                                                <input placeholder="네번째 질문" onChange={handleVoteString4} />
                                                <span id="removeVoteList4" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>5.</span>
                                                <input placeholder="다섯번째 질문" onChange={handleVoteString5} />
                                                <span id="removeVoteList5" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>차트 선택</span>
                                            </div>
                                            <div className="inputwapper_morebutton">
                                                <div className="on" id="chart_bar_verti" onClick={handleVoteChartType} >
                                                    <span><i className="xi-chart-bar xi-2x" /></span>
                                                    <span>바차트(새로)</span>
                                                </div>
                                                <div id="chart_bar_hori" onClick={handleVoteChartType} >
                                                    <span><i className="xi-chart-bar xi-rotate-90 xi-2x" /></span>
                                                    <span>바차트(가로)</span>
                                                </div>
                                                <div id="chart_pie" onClick={handleVoteChartType} >
                                                    <span><i className="xi-chart-pie xi-2x" /></span>
                                                    <span>파이차트</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>연계</span>
                                                <span>최대 5개까지 가능합니다.</span>
                                            </div>
                                            <div className="inputwapper_singlebuttonnext" onClick={typeVoteAddList}>
                                                <span>저장 후 다음 문제 연계하기</span>
                                            </div>
                                        </div>
                                    </div>
                                    :""
                                }
                                {
                                    typewordcloud?<div className="studio_menubox2">
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>주제을 적어주세요.</span>
                                            </div>
                                            <div className="inputwapper_text">
                                                <input onChange={handleQuestion} placeholder="학생들에게 무엇을 물어볼까요?" />
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>1인당 입력 가능 횟수.</span>
                                                <span>최대 30회</span>
                                            </div>
                                            <div className="inputwapper_number_cnt">
                                                <input value={wcMaxWord} onChange={handleWcMaxword} />
                                                <div>
                                                    <span id="wcMaxIncrease" onClick={setWCMaxword}><i className="xi-caret-up-min"></i></span>
                                                    <span id="wcMaxDecrease" onClick={setWCMaxword}><i className="xi-caret-down-min"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>연계</span>
                                                <span>최대 5개까지 가능합니다.</span>
                                            </div>
                                            <div className="inputwapper_singlebuttonnext" onClick={typeVoteAddList}>
                                                <span>저장 후 다음 문제 연계하기</span>
                                            </div>
                                        </div>
                                    </div>
                                    :""
                                }
                                {
                                    typequestion?<div className="studio_menubox2">
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>주제을 적어주세요.</span>
                                            </div>
                                            <div className="inputwapper_text">
                                                <input onChange={handleQuestion} placeholder="학생들에게 무엇을 물어볼까요?" />
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>사진을 추가할까요?</span>
                                            </div>
                                            <div className="inputwapper_text">
                                                <input type="file" id="studio_inpu" onChange={readFile}/>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>문제를 입력해주세요.</span>
                                            </div>
                                            <div className="inputwapper_quill">
                                                <ReactQuill 
                                                    onChange={handleLongText}
                                                    modules={{
                                                        toolbar: {
                                                            container: [
                                                                [{ header: [1,2,false]}],
                                                                ['bold', 'italic', 'underline'],
                                                                [{ color: [] }, { background: [] }]
                                                            ]
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>옵션</span>
                                                <span>최대 5개까지 가능합니다.</span>
                                            </div>
                                            <div className="inputwapper_singlebutton" onClick={typeVoteAddList}>
                                                <span><i className="xi-plus-min xi-x" />옵션 추가하기</span>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general_inputlist" id="studio_menubox2_general_inputlist">
                                            <div>
                                                <span>1.</span>
                                                <input placeholder="첫번째 질문" onChange={handleVoteString1} />
                                                <span id="removeVoteList1" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>2.</span>
                                                <input placeholder="두번째 질문" onChange={handleVoteString2} />
                                                <span id="removeVoteList2" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>3.</span>
                                                <input placeholder="세번째 질문" onChange={handleVoteString3} />
                                                <span id="removeVoteList3" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>4.</span>
                                                <input placeholder="네번째 질문" onChange={handleVoteString4} />
                                                <span id="removeVoteList4" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                            <div>
                                                <span>5.</span>
                                                <input placeholder="다섯번째 질문" onChange={handleVoteString5} />
                                                <span id="removeVoteList5" onClick={removeVoteList}><i className="xi-close-min xi-x" /></span>
                                            </div>
                                        </div>
                                        <div className="studio_menubox2_general">
                                            <div>
                                                <span>연계</span>
                                                <span>최대 5개까지 가능합니다.</span>
                                            </div>
                                            <div className="inputwapper_singlebuttonnext" onClick={typeVoteAddList}>
                                                <span>저장 후 다음 문제 연계하기</span>
                                            </div>
                                        </div>
                                    </div>:""
                                }
                                
                            </div>
                            {/* studio menu 2 end */}

                        </div>
                    </div>
                    <div className="studio_level2">
                        <div>
                            <span>QR 코드 생성 및 저장</span>
                            <div>
                                <div className="studio_qr_left">
                                    <QRCode 
                                        value="http://wordgen.kr/"
                                        renderAs={"svg"}
                                        size={300}
                                        level={"L"}
                                    />
                                </div>
                                <div className="studio_qr_right">
                                    <div>
                                        <span className="bigtxt">QR코드 주소값</span>
                                        <div className="box">
                                            <span>https://www.wordgen.kr</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="bigtxt">QR코드 다운로드</span>
                                        <div className="button">
                                            <span><i className="xi-file-download-o xi-x" /></span>
                                            <span>QR코드 다운로드</span>
                                        </div>
                                        <span className="infotxt">QR 코드를 다운로드 받아 강의 자료물에 넣어주세요.</span>
                                    </div>
                                    <div>
                                        <span className="bigtxt">작업 저장</span>
                                        <div className="button" onClick={sumitquestion}>
                                            <span><i className="xi-save xi-x" /></span>
                                            <span>작업 저장</span>
                                        </div>
                                        <span className="infotxt">작업 이후 꼭 저장해주세요.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio;