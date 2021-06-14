import React,{useState,useEffect} from "react";

const Multiple = (props) => {
    const [voteString1on,setVoteString1on] = useState(false)
    const [voteString2on,setVoteString2on] = useState(false)
    const [voteString3on,setVoteString3on] = useState(false)
    const [voteString4on,setVoteString4on] = useState(false)
    const [voteString5on,setVoteString5on] = useState(false)

    useEffect(()=>{
        init()
    },[props.data])

    const init = () => {
        if(props.data===undefined) return 0
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
    
    return (
        <div className="mobilevote_options">
            {
                voteString1on?<div>
                <span>1.</span>
                <span>{props.data.question_choice1_txt}</span>
                </div>:""
            }
            {
                voteString2on?<div>
                <span>2.</span>
                <span>{props.data.question_choice2_txt}</span>
                </div>:""
            }
            {
                voteString3on?<div>
                <span>3.</span>
                <span>{props.data.question_choice3_txt}</span>
                </div>:""
            }
            {
                voteString4on?<div>
                <span>4.</span>
                <span>{props.data.question_choice4_txt}</span>
                </div>:""
            }
            {
                voteString5on?<div>
                <span>5.</span>
                <span>{props.data.question_choice5_txt}</span>
                </div>:""
            }
        </div>
    )
}

export default Multiple;