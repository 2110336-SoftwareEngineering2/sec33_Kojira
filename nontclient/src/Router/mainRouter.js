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

import Contexts from "../Utils/Context/Contexts";

const UserContext = Contexts.UserContext;

function Router(props) {
  const value = useContext(UserContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/nont" component={<h1>Nonts</h1>} />
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
