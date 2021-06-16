import React from "react";
import Navi from "./navi";
import {Switch,Route} from "react-router-dom";
import Index from "./components/index/index";
import Studio from "./components/studio/studio";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Price from "./components/price/price"
import Code from "./components/encouter/encouter"
import Workshop from "./components/workshop/workshop"

const Root = () => {
    return (
        <div className="root">
            <Navi />
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/studio" component={Studio} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/price" component={Price} />
                <Route exact path="/code" component={Code} />
                <Route exact path="/Workshop" component={Workshop} />
            </Switch>
        </div>
    )
}

export default Root;