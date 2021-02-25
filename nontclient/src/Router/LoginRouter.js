import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";

const LoginRouter = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/home" component={Dashboard} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default LoginRouter;
