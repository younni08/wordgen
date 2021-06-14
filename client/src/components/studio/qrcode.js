import React from "react";
import QRCode from "qrcode.react"

const Qr = (props) => {
    return (
        <div>
            <QRCode 
                value={"https://www.wordgen.kr/#/code?q="+props.passcode}
                renderAs={"svg"}
                size={300}
                level={"L"}
            />
        </div>
    )
}

export default Qr;