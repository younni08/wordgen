import React from "react";
import ReactWordcloud from "react-wordcloud";
import words from ".//wordcloudwords";

const EncouterWordCloud = () => {
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
        <div className="mobile_wordcloud_body">
            <div className="mobile_wordcloud_wrapper">
                <ReactWordcloud options={options} words={words} />
            </div>
            <span>실시간으로 반영됩니다.</span>
        </div>
    )
}

export default EncouterWordCloud;