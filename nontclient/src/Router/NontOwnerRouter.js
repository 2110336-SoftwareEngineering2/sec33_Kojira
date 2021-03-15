import React from "react";
import { Switch } from "react-router-dom";
import GuardedRoute from "./GuardedRoute";
import NontManage from "../Components/Nont/NontManage";
import NontUpdate from "../Components/Nont/NontUpdate";
import NontView from "../Components/Nont/NontView";
import NontRegistration from "../Components/Nont/NontRegistration";
import FindShelter from "../Components/FindShelter/FindShelter";
import Reserve from "../Components/Reservation/Reserve";

const NontOwnerRouter = (props) => {
  const auth = props.auth;
  return (
    <Switch>
      <GuardedRoute.NontOwnerGuardedRoute
        path="/nont/update/:id"
        component={NontUpdate}
        auth={auth}
      />
      <GuardedRoute.NontOwnerGuardedRoute
        path="/nont/create"
        component={NontRegistration}
        auth={auth}
      />
      <GuardedRoute.NontOwnerGuardedRoute
        path="/nont/:id"
        component={NontView}
        auth={auth}
      />
      <GuardedRoute.NontOwnerGuardedRoute
        exact
        path="/nont"
        component={NontManage}
        auth={auth}
      />

      <GuardedRoute.NontOwnerGuardedRoute
        path="/findShelter"
        component={FindShelter}
        auth={auth}
      />
      <GuardedRoute.NontOwnerGuardedRoute 
        path="/reserve/:roomID"
        component={Reserve}
        auth={auth}
      />
    </Switch>
  );
};

export default NontOwnerRouter;
