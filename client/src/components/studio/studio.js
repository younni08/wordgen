import React from "react";
import {Link} from "react-router-dom"
import Inputbox from "./inputbox"

// var QRCode = require('qrcode.react');
import 'react-quill/dist/quill.snow.css';

const Studio = () => {

    return (
        <div className="studio">
            <div>
                <div className="studio_navi">
                    <Link to="/setting"  className="navi_studio">
                        <span>설정</span>
                    </Link>
                    <Link to="/workshop" className="navi_worshop">
                        <span>내 작업실</span>
                    </Link>
                </div>
                <div className="studio_main">
                    <div>
                        <div className="studio_left">

                        </div>
                        <div className="studio_center">
                            <Inputbox />
                            <div className="studio_center_options">
                                <span>질문 추가</span>
                                <span>저장 및 다음 단계</span>
                            </div>
                        </div>
                        <div className="studio_left">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio;