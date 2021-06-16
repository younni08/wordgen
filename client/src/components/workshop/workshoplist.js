import React from "react";

const WorkshopList = () => {
    return (
        <div className="workshoplist">
            <div>
                <span><i className="xi-star xi-x"></i></span>
            </div>
            <div>
                <div className="workshop_list_level1">
                    <div>
                        <span>타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 </span>
                    </div>
                    <span>수업 자료</span>
                </div>
                <div className="workshop_list_level2">
                    <div>
                        <span>QR 코드 다운로드</span>
                        <span>등록일: 2020-09-08</span>
                    </div>
                    <span>자료 분석</span>
                </div>
            </div>
        </div>
    )
}

export default WorkshopList;