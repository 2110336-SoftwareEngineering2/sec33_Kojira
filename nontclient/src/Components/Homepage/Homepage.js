import React, { useContext } from "react";
import { withRouter } from "react-router";
import Contexts from "../../Utils/Context/Contexts";
import UserType from "../../Constants/UserType";

const UserContext = Contexts.UserContext;

const Homepage = () => {
  const value = useContext(UserContext);

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="mt-5" style={{ textAlign: "center" }}>
          Nont Community of Pet Lovers
      </h1>
        {value.login && (
          <h2 className="mt-5" style={{ textAlign: "center" }}>
            You are logged in as {value.userType === UserType.ADMIN ? "an" : "a"}{" "}
            {value.userType}
          </h2>
        )}
        {!value.login && (
          <h2 className="mt-5" style={{ textAlign: "center" }}>
            You are not logged in
          </h2>
        )}
      </div>
    </React.Fragment>
  );
};

export default withRouter(Homepage);
