import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../Components/Homepage/Homepage";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Homepage} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
