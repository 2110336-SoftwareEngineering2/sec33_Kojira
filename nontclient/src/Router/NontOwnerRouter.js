import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export default function NontOwnerRouter(props) {
  return (
    <Switch>
      <Redirect to="/NontOwner" />
    </Switch>
  );
}
