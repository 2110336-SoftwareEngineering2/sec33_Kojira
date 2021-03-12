import React from "react";
import GuardedRoute from "./GuardedRoute";
import NontManage from "../Components/Nont/NontManage";
import NontUpdate from "../Components/Nont/NontUpdate";
import NontView from "../Components/Nont/NontView";
import NontRegistration from "../Components/Nont/NontRegistration";
import FindShelter from "../Components/FindShelter/FindShelter";

const NontOwnerRouter = (props) => {
  const auth = props.auth;
  return (
    <React.Fragment>
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
        path="/nont"
        component={NontManage}
        auth={auth}
      />

      <GuardedRoute.NontOwnerGuardedRoute
        path="/findShelter"
        component={FindShelter}
        auth={auth}
      />
    </React.Fragment>
  );
};

export default NontOwnerRouter;
