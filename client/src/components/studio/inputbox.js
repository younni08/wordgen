import React from "react";
import InputboxType from "./inputbox_type"

const Inputbox = () => {
    return (
        <div className="inputbox">
            <div className="inputbox_left">
                <div>
                    <span><i className="xi-caret-up xi-x"></i></span>
                    <span className="word">위로</span>
                </div>
                <div>
                    <span className="word">아래로</span>
                    <span><i className="xi-caret-down xi-x"></i></span>
                </div>
            </div>
            <div className="inputbox_right">
                <div>
                    <div>
                        <span>1/6</span>
                    </div>
                    <div>
                        <span>옵션</span>
                        <span>옵션</span>
                        <span>고급옵션</span>
                    </div>
                    <div>
                        <span>삭제</span>
                    </div>
                </div>
                <div>
                    <InputboxType />
                </div>
            </div>
        </div>
    )
}

export default Inputbox;