import React, { useContext } from "react";
import { withRouter } from "react-router";
import Contexts from "../../Utils/Context/Contexts";

const UserContext = Contexts.UserContext;

const Homepage = () => {
  const value = useContext(UserContext);

  return (
    <React.Fragment>
      <h1 className="mt-5" style={{ textAlign: "center" }}>
        Nont Community of Pet Lovers
      </h1>
      {value.login && (
        <h2 className="mt-5" style={{ textAlign: "center" }}>
          You are logged in as a {value.userType}
        </h2>
      )}
      {!value.login && (
        <h2 className="mt-5" style={{ textAlign: "center" }}>
          You are not logged in
        </h2>
      )}
    </React.Fragment>
  );
};

export default withRouter(Homepage);
