import React from "react";
import styles from "./NavigationLinks.module.css";
import UserType from "../../Constants/UserType";
import Contexts from "../../Utils/Context/Contexts";

const userContext = Contexts.userContext;

const Logout = (value) => {
  value.setUserType(null);
  value.setLogin(null);
  value.setEmail(null);
  localStorage.removeItem("access_token");
};

const NavigationLinks = (props) => {
  return (
    <userContext.Consumer>
      {(value) => {
        return (
          <>
            {" "}
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/dashboard">
                  {" "}
                  dashboard<span className="sr-only">(current)</span>
                </a>
              </li>
              {props.userType === UserType.NONT_OWNER && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/reserve">
                      reserve
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      nont
                    </a>
                  </li>
                </>
              )}
              {props.userType === UserType.NONT_SITTER && (
                <li className="nav-item">
                  <a className="nav-link" href="/shelter">
                    shelter
                  </a>
                </li>
              )}
              <div className="d-block d-lg-none">
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    profile
                  </a>
                </li>
                <li className="nav-item">
                  {value.login && (
                    <>
                      <p className={styles.textCenter}>
                        {"You are logged in as " + value.email}
                      </p>
                      <a className="nav-link" href="#">
                        Log Out
                      </a>
                    </>
                  )}
                  {!value.login && (
                    <a className="nav-link" href="/login">
                      {" "}
                      Log In{" "}
                    </a>
                  )}
                </li>
              </div>
            </ul>
            <ul className="navbar-nav ml-auto d-none d-lg-block">
              {!value.login && (
                <a href="/login" id={styles.loginLink}>
                  Log In
                </a>
              )}
              {value.login && (
                <div className="dropdown">
                  <div data-toggle="dropdown">
                    <i
                      className="fa fa-user-circle dropdown-toggle"
                      id={styles.userCircle}
                      type="button"
                    >
                      <span className="caret ml-1"></span>
                    </i>
                  </div>

                  <div className="dropdown-menu" id={styles.dropdown}>
                    <p className={styles.textCenter}>
                      {"You are logged in as " + value.email}
                    </p>
                    <div
                      className={
                        styles.textCenter +
                        " " +
                        styles.dropdown +
                        " " +
                        styles.superCenter
                      }
                    >
                      <a href="#">Profile</a>
                    </div>
                    <div
                      className={
                        styles.textCenter +
                        " " +
                        styles.dropdown +
                        " " +
                        styles.superCenter
                      }
                    >
                      {value.login && (
                        <p type="button" onClick={() => Logout(value)}>
                          Log Out
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </>
        );
      }}
    </userContext.Consumer>
  );
};

export default NavigationLinks;
