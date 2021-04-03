import React from "react";
import GuardedRoute from "./GuardedRoute";
import { Switch } from "react-router-dom";
import SelectDB from "../Components/Admin/SelectDB";
import InfoDB from "../Components/Admin/InfoDB";
import EditDB from "../Components/Admin/EditDB";

const AdminRouter = (props) => {
  const auth = props.auth;
  return (
  <Switch>
    <GuardedRoute.AdminGuardedRoute
      path="/selectdb"
      component={SelectDB}
      auth={auth}
    />
    <GuardedRoute.AdminGuardedRoute
      path="/infodb/:dbname"
      component={InfoDB}
      auth={auth}
    />
    <GuardedRoute.AdminGuardedRoute
      path="/editdb/:dbname/:id"
      component={EditDB}
      auth={auth}
    />
  </Switch>
  );
};

export default AdminRouter;
