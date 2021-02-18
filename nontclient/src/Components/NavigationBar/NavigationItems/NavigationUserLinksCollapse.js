import React from "react";
import styles from "../NavigationLinks.module.css";

const NavigationUserLinksCollapse = (props) => {
  const value = props.value;
  return (
    <React.Fragment>
      {value.login && (
        <React.Fragment>
          <hr />
          <li className="nav-item">
            <p style={{ textAlign: "center", color: "white" }}>
              {"You are logged in as " + value.email}
            </p>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/profile">
              Profile
            </a>
          </li>
          <li>
            <p
              className={"nav-link " + styles.leftLink}
              type="button"
              onClick={() => props.logout()}
            >
              Log out
            </p>
          </li>
        </React.Fragment>
      )}
      {!value.login && (
        <React.Fragment>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/login">
              {" "}
              Log In{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + styles.leftLink} href="/register">
              {" "}
              Create an account{" "}
            </a>
          </li>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NavigationUserLinksCollapse;
