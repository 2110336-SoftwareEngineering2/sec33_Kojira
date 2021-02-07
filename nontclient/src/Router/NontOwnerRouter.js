import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Components/LoginLogout/Login";
import UserType from "../Utils/UserType";

export default function NontOwnerRouter(props) {
  return (
    <Switch>
      <Route
        path="/NontOwner/login"
        component={() => <Login user={UserType.NONT_OWNER} />}
      />
      <Redirect to="/NontOwner" />
    </Switch>
  );
}
