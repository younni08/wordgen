import React, { useMemo,useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom";

const SupportBox = (props) =>{
    const [list,setList] = useState("")

    const init = () => {
        if(props.list===undefined) return 0
        let temp = props.list.split(",")
        setList(temp)
    }

    useMemo(()=>{
        init();
    },[props.list])
    
    return (
        <div className="creater_box" id={props.id}>
            <div className="creater_box_header">
                <span>{props.title}</span>
            </div>
            <div className="creater_box_level1">
                <i className={props.icon} />
            </div>
            <div className="creater_box_level2">
                <span>{props.body}</span>
            </div>
            <div className="creater_box_level3">
                <ul>
                    {
                        list?list.map(c=>{
                            return(
                                <li key={c}>{c}</li>
                            )
                        }):""
                    }
                    
                </ul>
            </div>
            <div className="creater_box_level4">
                <Link to={"/support_registry?t="+props.level+"&c="+props.name}>가입하기</Link>
            </div>
        </div>
    )
}

export default SupportBox;