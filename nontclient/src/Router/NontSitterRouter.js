import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "../Components/LoginLogout/Login";
import Registration from "../Components/Registration/Registration";
import RoomRegistration from "../Components/Room/RoomRegistration";
import ShelterManage from "../Components/Shelter/ShelterManage";
import UserSetting from "../Components/UserSetting/UserSetting";
import RoomManage from "../Components/Room/RoomManage";
import RoomUpdate from "../Components/Room/RoomUpdate";
import ShelterView from "../Components/Shelter/ShelterView";

const NontSitterRouter = () => {
  return (
    <Switch>
      <Route path="/setting" component={UserSetting} />
      <Route path="/room/register/:shelterID" component={RoomRegistration} />
      <Route path="/room/update/:roomID" component={RoomUpdate} />
      <Route path="/room/manage/:shelterID" component={RoomManage} />
      <Route path="/shelter" component={ShelterManage} />
      <Route path="/shelterView/:shelterID" component={ShelterView} />
      <Route path="/home" component={Dashboard} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default NontSitterRouter;
