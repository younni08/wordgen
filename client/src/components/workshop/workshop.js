import React from "react"
import WorkshopList from "./workshoplist"
import {Link} from "react-router-dom";

const WorkShop = () => {
    return (
        <div className="workshop">
            <div>
                <div className="studio_navi">
                    <Link to="/workshop"  className="navi_studio">
                        <span>ㅁㅁㅁ</span>
                    </Link>
                    <Link to="/studio" className="navi_worshop">
                        <span>새로운 프로젝트</span>
                    </Link>
                </div>
                <div className="workshop_navi">
                    <div>
                        <div className="workshop_navi_left">
                            <span>정렬</span>
                            <div>
                                <span className="on">최신순</span>
                                <span>최신순</span>
                                <span>최신순</span>
                            </div>
                        </div>
                        <div className="workshop_navi_right">
                            <span><i className="xi-search xi-x"></i></span>
                            <input placeholder="타이틀을 입력해주세요." />
                            <span><i className="xi-close-min xi-x"></i></span>
                        </div>
                    </div>
                </div>
                <div className="workshop_main">
                    <div>
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                        <WorkshopList />
                    </div>
                </div>
                <div className="workship_paging">
                    <div>
                        <span className="on">1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkShop;