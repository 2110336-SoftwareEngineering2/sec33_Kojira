import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";

import UserSetting from "../Components/UserSetting/UserSetting";

import GuardedRoute from "./GuardedRoute";
import NontOwnerRouter from "./NontOwnerRouter";
import NontSitterRouter from "./NontSitterRouter";

import Contexts from "../Utils/Context/Contexts";

const UserContext = Contexts.UserContext;

function Router() {
  const value = useContext(UserContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (value.loaded) {
      setIsAuthenticated(value.login);
      setUserType(value.userType);
    }
  }, [value.loaded]);

  // in case user isn't logged in, the loaded field won't be updated after the mount of this component
  // so the above useEffect won't be triggered.
  if (value.loaded && isAuthenticated !== value.login) {
    setIsAuthenticated(value.login);
    setUserType(false);
  }

  const auth = { auth: isAuthenticated, userType: userType };

  return (
    <BrowserRouter>
      <Switch>
        <GuardedRoute.LoginGuardedRoute
          path="/setting"
          component={UserSetting}
          auth={auth}
        />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/home" component={Dashboard} />
        <NontSitterRouter
          path={[
            "/shelter",
            "/shelterRegister",
            "/shelterView",
            "/shelterUpdate",
            "/room",
            "/roomUpdate",
          ]}
          component={NontSitterRouter}
          auth={auth}
        />

        <NontOwnerRouter
          path={["/nont", "/findShelter"]}
          component={NontOwnerRouter}
          auth={auth}
        />

        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
