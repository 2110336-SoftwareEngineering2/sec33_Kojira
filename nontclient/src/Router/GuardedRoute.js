import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserType from "../Constants/UserType";

const GuardedRoute = {
  LoginGuardedRoute: ({ component: Component, auth, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          auth.auth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  },
  NontOwnerGuardedRoute: ({ component: Component, auth, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          (auth.auth && auth.userType === null) ||
          auth.userType === UserType.NONT_OWNER ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  },
  NontSitterGuardedRoute: ({
    component: Component,
    auth,
    userType,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          (auth.auth && auth.userType == null) ||
          auth.userType === UserType.NONT_SITTER ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  },
};

export default GuardedRoute;
