import React from "react";
import GuardedRoute from "./GuardedRoute";
import { Switch } from "react-router-dom";

const AdminRouter = (props) => {
  const auth = props.auth;
  return <Switch></Switch>;
};

export default AdminRouter;
