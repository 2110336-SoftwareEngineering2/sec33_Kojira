import React, { Component} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";


export default class Router extends Component {
    render(){
        return(
        <BrowserRouter>
            <Switch>
                <Route path="/home" component={() => <h1 className="col">Nont Community of Pet Lovers</h1>} />
                <Redirect to="/home"/>
            </Switch>
        </BrowserRouter>
        )
    }
}