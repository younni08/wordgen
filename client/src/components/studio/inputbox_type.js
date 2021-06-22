import React from "react";

const Inputbox_option1 = () => {
    return (
        <div className="inputbox_option">
            <div>
                <span>즐겨찾기</span>
                <div>
                    <div className="inputbox_optionbox" id="vote">
                        <div>
                            <i className="xi-chart-bar xi-2x"></i>
                        </div>
                        <span>투표</span>
                    </div>
                    <div className="inputbox_optionbox" id="wordcloud">
                        <div>
                            <i className="xi-cloud-o xi-2x"></i>
                        </div>
                        <span>워드 클라우드</span>
                    </div>
                    <div className="inputbox_optionbox" id="question">
                        <div>
                            <i className="xi-timer-o xi-2x"></i>
                        </div>
                        <span>문제 출제</span>
                    </div>
                </div>
            </div>
            <div>
                <span>옵션</span>
                <div>
                <div className="inputbox_optionbox" id="vote">
                    <div>
                        <i className="xi-chart-bar xi-2x"></i>
                    </div>
                    <span>투표</span>
                </div>
                <div className="inputbox_optionbox" id="wordcloud">
                    <div>
                        <i className="xi-cloud-o xi-2x"></i>
                    </div>
                    <span>워드 클라우드</span>
                </div>
                <div className="inputbox_optionbox" id="question">
                    <div>
                        <i className="xi-timer-o xi-2x"></i>
                    </div>
                    <span>문제 출제</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-camera-o xi-2x"></i>
                    </div>
                    <span>관찰일기</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-paper-o xi-2x"></i>
                    </div>
                    <span>일기</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-chart-pie xi-2x"></i>
                    </div>
                    <span>경품추천</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-image-o xi-2x"></i>
                    </div>
                    <span>추가 예정</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-movie xi-2x"></i>
                    </div>
                    <span>추가 예정</span>
                </div>
                <div className="inputbox_optionbox">
                    <div>
                        <i className="xi-file-o xi-2x"></i>
                    </div>
                    <span>추가 예정</span>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Inputbox_option1;