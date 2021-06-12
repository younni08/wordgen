import React,{useEffect,useState} from "react";
import MobileVote from "./mobile_vote"
import MobileWordCloud from "./mobile_wordcloud"

const Mobileview = (props) => {
    const [question,setQuestion] = useState("학생들에게 무엇을 물어볼까요?")
    const [typeVote,setTypeVote] = useState(false)
    const [typewordcloud,setTypewordcloud] = useState(false)
    const [defaultBody,setDefaultBody] = useState(true)
    useEffect(()=>{
        init();
    },[props])

    const init = () => {
        if(props.question!=="") setQuestion(props.question)
        if(props.type!=="") setDefaultBody(false)
        if(props.type==="vote"){
            setTypewordcloud(false)
            setTypeVote(true)
        }
        if(props.type==="wordcloud"){
            setTypeVote(false)
            setTypewordcloud(true)
        }
    }

    // 사진 추가 
    return (
        <div className="studio_mobilebox">
            <div>
                <div className="top">
                    <div>
                        <span>9:57</span>
                        <span><i className="xi-call"></i></span>
                    </div>
                    <div>
                        <span><i className="xi-alarm-clock-o"></i></span>
                        <span>92%</span>
                        <span><i className="xi-battery-90"></i></span>
                        <span><i className="xi-signal-4"></i></span>
                    </div>
                </div>
                <div className="middle">
                    <div className="studio_mobilebox_header">
                        <div>
                            <img src="./pics/wordgenlogo2.png" alt="wordgen logo" />
                            <span>wordGen</span>
                        </div>
                        <span><i className="xi-bars"></i></span>
                    </div>
                    <div className="studio_mobile_title">
                        <span>{question}</span>
                    </div>
                    {
                        typeVote?<MobileVote 
                            voteAddlevel={props.voteAddlevel}
                            voteString1={props.voteString1}
                            voteString2={props.voteString2}
                            voteString3={props.voteString3}
                            voteString4={props.voteString4}
                            voteString5={props.voteString5}
                            voteChartType={props.voteChartType}
                        />:""
                    }
                    {
                        typewordcloud?<MobileWordCloud 

                        />:""
                    }
                    {
                        defaultBody?<div className="studio_mobile_body_default"></div>:""
                    }
                </div>
                <div className="bottom">
                    <span><i className="xi-album"></i></span>
                </div>
            </div>
        </div>
    )
}

export default Mobileview