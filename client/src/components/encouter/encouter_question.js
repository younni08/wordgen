import React,{useState,useEffect} from "react";
import parse from 'html-react-parser';

const EncouterQuestion = (props) => {
    const [image,setImage] = useState(false)
    const [bodytext,setBodyText] = useState("<p>위 색중에서 어떤 색이 가장 마음에 드시나요?</p><p>다음 중 보기에서 선택해주세요. </p>")
    const [voteString1on,setVoteString1on] = useState(false)
    const [voteString2on,setVoteString2on] = useState(false)
    const [voteString3on,setVoteString3on] = useState(false)
    const [voteString4on,setVoteString4on] = useState(false)
    const [voteString5on,setVoteString5on] = useState(false)

    const init = () => {
        if(props.data.question_longtext===undefined) return 0;
        if(props.data.question_image_cnt!==0) setImage(true)
        setBodyText(props.data.question_longtext)
        if(props.data.question_choice===1){
            setVoteString1on(true)
            setVoteString2on(false)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
        }

        if(props.data.question_choice===2){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
        }

        if(props.data.question_choice===3){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(false)
            setVoteString5on(false)
        }
        if(props.data.question_choice===4){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(true)
            setVoteString5on(false)
        }
        if(props.data.question_choice===5){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(true)
            setVoteString5on(true)
        }
    }

    useEffect(()=>{
        init();
    },[props])

    return (
        <div className="mobilequestion">
            {
                image?<img src="./pics/wordgencolor.png" alt="wordgen color" />:""
            }
            <div>{parse(bodytext)}</div>
        </div>
    )
}

export default EncouterQuestion;