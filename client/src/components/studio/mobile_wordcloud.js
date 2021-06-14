import React from "react";
import ReactWordcloud from "react-wordcloud";
import words from "./wordcloudwords";

const TempCloud = () =>{
    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [30, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 30,-30],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 500
    };

    return (
        <ReactWordcloud options={options} words={words} />
    )
}

const MemoCloud = React.memo(TempCloud);  

const Wordcloud = () => {
    return (
        <div className="studio_mobile_body">
            <div className="mobile_wordcloud_body">
                <div className="mobile_wordcloud_wrapper">
                    <MemoCloud />
                </div>
                <span>실시간으로 반영됩니다.</span>
            </div>
            <div className="mobile_wordcloud_input">
                <div>
                    <input placeholder="생각나는 단어를 입력해주세요." />
                </div>
                <span>추가</span>
            </div>
        </div>
    )
}

export default Wordcloud