import React, {useState, useEffect } from "react";
import axios from "axios";
import Vote from "./encouter_vote"
import WordCloud from "./encouter_wordcloud"
import Question from "./encouter_question";
import Mulitple from "./res_muliplechoice"
import Single from "./res_singleword"
import { Redirect } from "react-router";

const Encouter = () => {
    const [multiplechoice,setMultiplechoice] = useState(false);
    const [singleword,setSingleword] = useState(false);
    const [redirect,setRedirect] = useState(false);
    const [vote,setVote] = useState(false)
    const [question,setQuestion] = useState(false)
    const [wordcloud,setWordcloud] = useState(false)
    const [info,setInfo] = useState([])

    useEffect(()=>{
        init()
    },[])

    const init = async() => {
        let getURL = window.location.href;
        if(getURL.split("/code?q=")[1]===undefined) return console.log("notfound")
        let code = getURL.split("/code?q=")[1].split("#")[0]
        let pass = getURL.split("/code?q=")[1].split("#")[1]
        if(code===undefined&&pass===undefined) return console.log("errrrorrr")
        let url = "/api/user/encouterinit"
        let params = {
            code:code,
            pass:pass
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
        if(res.data.type==="vote"){
            setVote(true)
            setMultiplechoice(true)
            setInfo(res.data.data)
        }
        if(res.data.type==="wordcloud"){
            setWordcloud(true)
            setSingleword(true)
            setInfo(res.data.data)
        }
        if(res.data.type==="question"){
            setQuestion(true)
            setMultiplechoice(true)
            setInfo(res.data.data)
        }
        if(res.data==="fail") return console.log("eerorroro")
    }

    return (
        <div className="encouter">
            <div>
                <div className="encouter_level1">
                    <span>{info.question_title}</span>
                </div>
                <div className="encouter_level2">
                    {
                        vote?<Vote 
                            data = {info}
                            vote = ""
                        />:""
                    }
                    {
                        wordcloud?<WordCloud 
                            data = {info}
                            vote = ""
                        />:""
                    }
                    {
                        question?<Question 
                            data = {info}
                            vote = ""
                        />:""
                    }
                </div>
                <div className="encouter_level3">
                    <span>여러분의 생각을 선택해주세요.</span>
                    {
                        multiplechoice?<Mulitple 
                            data = {info}
                        />:""
                    }
                    {
                        singleword?<Single 
                            data = {info}
                        />:""
                    }
                </div>
            </div>
        </div>
    )
}

export default Encouter;