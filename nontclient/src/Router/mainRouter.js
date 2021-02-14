import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../Components/Homepage/Homepage";
import NontOwnerRouter from "./NontOwnerRouter";
import NontSitterRouter from "./NontSitterRouter";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route path="/NontOwner" component={NontOwnerRouter} />
        <Route path="/NontSitter" component={NontSitterRouter} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
