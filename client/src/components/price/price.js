import React from "react";
import Pricebox from "./pricebox"

const Price = () => {
    return (
        <div className="price">
            <div>
                <div className="price_level1">
                    <span>부담없는 가격으로</span>
                    <span>더 질 높은 서비스를 제공하겠습니다.</span>
                    <span>대한민국의 모든 교육인을 응원합니다.</span>
                </div>
                <div className="price_level2">
                    <Pricebox 
                        title="Free"
                        body="무료"
                        icon="xi-gift-o xi-4x"
                        list="무료 체험 가능,+ 최대 참여자 10명,+ 프로젝트 1개 생성 가능"
                    />
                    <Pricebox 
                        title="Light"
                        body="월 5500원"
                        icon="xi-school xi-4x"
                        list="Free 요금제의 모든 혜택,+ 최대 참여자 30명,+ 프로젝트 생성 제한 없음,+ 연계 코드 최대 2개"
                    />
                    <Pricebox 
                        title="Premium"
                        body="월 11000원"
                        icon="xi-school xi-5x"
                        list="Light 요금제의 모든 혜택,+ 최대 참여자 100명,+ 연계 코드 최대 10개"
                    />
                    <Pricebox 
                        title="Enterprise"
                        body="월 55000원"
                        icon="xi-building xi-5x"
                        list="Premium 요금제의 모든 혜택,+ 최대 참여자 500명,+ 연계 코드 최대 100개,+ 설문조사 솔루션 이용 가능"
                    />
                </div>
            </div>
        </div>
    )
}

export default Price