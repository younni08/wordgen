import React from "react";

const Mobileview = () => {
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
                        <span>오늘의 날씨는 무엇인가요?</span>
                    </div>
                    <div className="studio_mobile_body">

                    </div>
                    <div className="studio_mobile_bottom">
                        <div>
                            <span>입력해주세요.</span>
                        </div>
                        <span>입력</span>
                    </div>
                </div>
                <div className="bottom">
                    <span><i className="xi-album"></i></span>
                </div>
            </div>
        </div>
    )
}

export default Mobileview