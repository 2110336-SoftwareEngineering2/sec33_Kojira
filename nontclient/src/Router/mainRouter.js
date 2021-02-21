import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import NontOwnerRouter from "./NontOwnerRouter";
import NontSitterRouter from "./NontSitterRouter";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";
import RoomRegistration from "../Components/Room/RoomRegistration";
import ShelterManage from "../Components/Shelter/ShelterManage";
import UserSetting from "../Components/UserSetting/UserSetting";
import RoomManage from "../Components/Room/RoomManage";
import RoomUpdate from "../Components/Room/RoomUpdate";

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Dashboard} />
        <Route path="/NontOwner" component={NontOwnerRouter} />
        <Route path="/NontSitter" component={NontSitterRouter} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/room/register/:shelterID" component={RoomRegistration} />
        <Route path="/room/update/:roomID" component={RoomUpdate} />
        <Route path="/room/manage/:shelterID" component={RoomManage} />
        <Route path="/shelter" component={ShelterManage} />
        <Route path="/setting" component={UserSetting} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
