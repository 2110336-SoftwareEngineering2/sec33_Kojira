import React from "react";
import styles from "../NavigationLinks.module.css";

const NavigationUserLinksCollapse = (props) => {
  const value = props.value;
  return (
    <React.Fragment>
      {value.login && (
        <React.Fragment>
          <li className="nav-item">
            <p className={styles.textCenter}>
              {"You are logged in as " + value.email}
            </p>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              profile
            </a>
          </li>
          <li>
            <p
              className="nav-link"
              type="button"
              onClick={() => props.logout()}
            >
              Log Out
            </p>
          </li>
        </React.Fragment>
      )}
      {!value.login && (
        <li className="nav-item">
          <a className="nav-link" href="/login">
            {" "}
            Log In{" "}
          </a>
        </li>
      )}
    </React.Fragment>
  );
};

export default NavigationUserLinksCollapse;
