import React, { useEffect, useState } from "react";
import Navi from "./navi"
import {Switch,Route} from "react-router-dom"
import Index from "./components/index/index"
import Studio from "./components/studio/studio"


const Root = () => {
    return (
        <div className="root">
            <Navi />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/studio" component={Studio} />
            </Switch>
        </div>
    )
}

export default Root;