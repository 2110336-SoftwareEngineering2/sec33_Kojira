import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Components/LoginLogout/Login";
import UserType from "../Utils/UserType";

export default function NontSitterRouter(props) {
  return (
    <Switch>
      <Route
        path="/NontSitter/login"
        component={() => <Login user={UserType.NONT_SITTER} />}
      />
      <Redirect to="/NontSitter" />
    </Switch>
  );
}
