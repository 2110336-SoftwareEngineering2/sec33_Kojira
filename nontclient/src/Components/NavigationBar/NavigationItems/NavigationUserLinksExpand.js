import React from "react";
import styles from "../NavigationLinks.module.css";

const NavigationUserLinksExpand = (props) => {
  const value = props.value;
  return (
    <React.Fragment>
      {!value.login && (
        <React.Fragment>
          <a href="/login" id={styles.loginLink} className="mr-2">
            Log In
          </a>
          <a href="/register" id={styles.registerLink}>
            register
          </a>
        </React.Fragment>
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
              <a href="#" id={styles.profileLink}>
                Profile
              </a>
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
                <p type="button" onClick={() => props.logout()}>
                  Log Out
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavigationUserLinksExpand;
