import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';

const MobileVote = (props) => {
    const [voteString1on,setVoteString1on] = useState(false)
    const [voteString2on,setVoteString2on] = useState(false)
    const [voteString3on,setVoteString3on] = useState(false)
    const [voteString4on,setVoteString4on] = useState(false)
    const [voteString5on,setVoteString5on] = useState(false)
    const [defaultOptions,setDefaultOptions] = useState(true)

    const init = () => {
        if(props.voteAddlevel!==0){
            setDefaultOptions(false)
        }
        if(props.voteAddlevel===1){
            setVoteString1on(true)
            setVoteString2on(false)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
        }

        if(props.voteAddlevel===2){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(false)
            setVoteString4on(false)
            setVoteString5on(false)
        }

        if(props.voteAddlevel===3){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(false)
            setVoteString5on(false)
        }

        if(props.voteAddlevel===4){
            setVoteString1on(true)
            setVoteString2on(true)
            setVoteString3on(true)
            setVoteString4on(true)
            setVoteString5on(false)
        }

        if(props.voteAddlevel===5){
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
        <div className="studio_mobile_body">
            <div className="mobilequestion">
                <img src="./pics/wordgenlogo2.png" alt="wordgen mobile question sample" />
                <div>{parse(props.longText)}</div>
            </div>
            {
                defaultOptions?<div className="mobilevote_options">
                <div>
                    <span>1.</span>
                    <span>남색</span>
                </div>
                <div>
                    <span>2.</span>
                    <span>파랑</span>
                </div>
                <div>
                    <span>3.</span>
                    <span>초록</span>
                </div>
                <div>
                    <span>4.</span>
                    <span>노랑</span>
                </div>
                <div>
                    <span>5.</span>
                    <span>주황</span>
                </div>
                </div>:""
            }
            <div className="mobilevote_options">
                
                {
                    voteString1on?<div>
                    <span>1.</span>
                    <span>{props.voteString1}</span>
                    </div>:""
                }
                {
                    voteString2on?<div>
                    <span>2.</span>
                    <span>{props.voteString2}</span>
                    </div>:""
                }
                {
                    voteString3on?<div>
                    <span>3.</span>
                    <span>{props.voteString3}</span>
                    </div>:""
                }
                {
                    voteString4on?<div>
                    <span>4.</span>
                    <span>{props.voteString4}</span>
                    </div>:""
                }
                {
                    voteString5on?<div>
                    <span>5.</span>
                    <span>{props.voteString5}</span>
                    </div>:""
                }
            </div>
        </div>
    )
}

export default MobileVote