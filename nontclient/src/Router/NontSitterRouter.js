import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

export default function NontSitterRouter(props) {
  return (
    <Switch>
      <Redirect to="/NontSitter" />
    </Switch>
  );
}
