import React from "react";
import GuardedRoute from "./GuardedRoute";
import RoomRegistration from "../Components/Room/RoomRegistration";
import ShelterManage from "../Components/Shelter/ShelterManage";
import ShelterRegistration from "../Components/Shelter/ShelterRegistration";
import RoomManage from "../Components/Room/RoomManage";
import RoomUpdate from "../Components/Room/RoomUpdate";
import ShelterView from "../Components/Shelter/ShelterView";
import shelterUpdate from "../Components/Shelter/ShelterUpdate";

const NontSitterRouter = (props) => {
  const auth = props.auth;
  return (
    <React.Fragment>
      <GuardedRoute.NontSitterGuardedRoute
        path="/room/register/:shelterID"
        component={RoomRegistration}
        auth={auth}
      />
      <GuardedRoute.NontSitterGuardedRoute
        path="/roomUpdate/:roomID"
        component={RoomUpdate}
        auth={auth}
      />
      <GuardedRoute.NontSitterGuardedRoute
        path="/room/manage/:shelterID"
        component={RoomManage}
        auth={auth}
      />
      <GuardedRoute.NontSitterGuardedRoute
        path="/shelter"
        component={ShelterManage}
        auth={auth}
      />
      <GuardedRoute.NontSitterGuardedRoute
        path="/shelterView/:shelterID"
        component={ShelterView}
        auth={auth}
      />
      <GuardedRoute.NontSitterGuardedRoute
        path="/shelterRegister"
        component={ShelterRegistration}
        auth={auth}
      />

      <GuardedRoute.NontSitterGuardedRoute
        path="/shelterUpdate/:shelterID"
        component={shelterUpdate}
        auth={auth}
      />
    </React.Fragment>
  );
};

export default NontSitterRouter;
