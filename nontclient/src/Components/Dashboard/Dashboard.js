import React, { useContext } from "react";
import Contexts from "../../Utils/Context/Contexts";
import UserType from "../../Constants/UserType";
import NontOwnerDashboard from "./NontOwnerDashboard";
import NontSitterDashboard from "./NontSitterDashboard";

const Dashboard = () => {
  const user = useContext(Contexts.UserContext);
  return (
    <React.Fragment>
      {user.userType === UserType.NONT_OWNER && <NontOwnerDashboard />}
      {user.userType === UserType.NONT_SITTER && <NontSitterDashboard />}
    </React.Fragment>
  );
};

export default Dashboard;
