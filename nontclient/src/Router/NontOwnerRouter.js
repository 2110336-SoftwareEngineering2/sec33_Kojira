import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";

import UserSetting from "../Components/UserSetting/UserSetting";

const NontOwnerRouter = () => {
  return (
    <Switch>
      <Route path="/setting" component={UserSetting} />
      <Route path="/nont" component={<h1>Nonts</h1>} />
      <Route path="/home" component={Dashboard} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default NontOwnerRouter;
