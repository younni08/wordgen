import React from "react";

const Studio = () => {
    return (
        <div className="studio">
            <div>
                <div className="studio_navi">
                    <span>left</span>
                    <span>right</span>
                </div>
                <div className="studio_main">
                    <div className="studio_level1">
                        <div className="studio_mobile">
                            <span>모바일 뷰</span>
                            <div>

                            </div>
                        </div>
                        <div className="studio_setting">
                            <div>
                                <span>종류</span>
                                <span className="on">수정</span>
                                <span>추가 설정</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio;