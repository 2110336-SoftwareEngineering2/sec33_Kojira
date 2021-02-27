import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";
import RoomRegistration from "../Components/Room/RoomRegistration";
import ShelterManage from "../Components/Shelter/ShelterManage";
import UserSetting from "../Components/UserSetting/UserSetting";
import RoomManage from "../Components/Room/RoomManage";
import RoomUpdate from "../Components/Room/RoomUpdate";
import ShelterView from "../Components/Shelter/ShelterView";

import LoginService from "../Services/LoginService";

import UserType from "../Constants/UserType";

const requireNontOwner = (to, from, next) => {
  if (to.meta.auth) {
    LoginService.checkLoginStatus().then((respond) => {
      if (
        respond.status === 200 &&
        respond.data.userType === UserType.NONT_OWNER
      ) {
        next();
      }
      console.log(respond.data);
      next.redirect("/home");
    });
  } else {
    next();
  }
};

const requireNontSitter = (to, from, next) => {
  if (to.meta.auth) {
    LoginService.checkLoginStatus().then((respond) => {
      if (
        respond.status === 200 &&
        respond.data.userType === UserType.NONT_SITTER
      ) {
        next();
      }
      next.redirect("/home");
    });
  } else {
    next();
  }
};

function Router() {
  return (
    <BrowserRouter>
      {/* <React.Fragment>
        <GuardProvider guards={[requireNontOwner]}>
          <Switch>
            <GuardedRoute
              path="/nont"
              component={() => <h1>Nonts</h1>}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/reserve"
              component={() => <h1>Reserve</h1>}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/setting"
              component={UserSetting}
              meta={{ auth: true }}
            />
          </Switch>
        </GuardProvider>
        <GuardProvider guards={[requireNontSitter]}>
          <Switch>
            <Route
              path="/room/register/:shelterID"
              component={RoomRegistration}
              meta={{ auth: true }}
            />
            <GuardedRoute path="/room/update/:roomID" component={RoomUpdate} />
            <GuardedRoute
              path="/room/manage/:shelterID"
              component={RoomManage}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/shelter"
              component={ShelterManage}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/shelterView/:shelterID"
              component={ShelterView}
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/setting"
              component={UserSetting}
              meta={{ auth: true }}
            />
          </Switch>
        </GuardProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/home" component={Dashboard} />
        </Switch>
      </React.Fragment> */}

      <Switch>
        <Route path="/nont" component={() => <h1>Nonts</h1>} />
        <Route path="/room/register/:shelterID" component={RoomRegistration} />
        <Route path="/room/update/:roomID" component={RoomUpdate} />
        <Route path="/room/manage/:shelterID" component={RoomManage} />
        <Route path="/shelter" component={ShelterManage} />
        <Route path="/shelterView/:shelterID" component={ShelterView} />
        <Route path="/setting" component={UserSetting} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/home" component={Dashboard} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
