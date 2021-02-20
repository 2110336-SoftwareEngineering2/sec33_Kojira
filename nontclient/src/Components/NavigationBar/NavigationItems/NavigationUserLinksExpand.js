import React from "react";
import styles from "../NavigationLinks.module.css";

const NavigationUserLinksExpand = (props) => {
  const value = props.value;
  return (
    <React.Fragment>
      {!value.login && (
        <React.Fragment>
          <a href="/login" className="mr-2">
            <button
              type="button"
              className="btn btn-light"
              id={styles.loginBtn}
            >
              Log in
            </button>
          </a>
          <a href="/register">
            <button
              type="button"
              className="btn btn-success"
              id={styles.registerBtn}
            >
              Create an account
            </button>
          </a>
        </React.Fragment>
      )}
      {value.login && (
        <div className="dropdown">
          <div data-toggle="dropdown" id="profileDropdown">
            <i
              className="fa fa-user-circle"
              id={styles.userCircle}
              type="button"
            ></i>
            <span className="caret ml-2"></span>
            <span className="dropdown-toggle"></span>
          </div>

          <div
            className="dropdown-menu"
            id={styles.dropdown}
            aria-labelledby="dropdownMenuButton1"
          >
            <p className={styles.textCenter}>
              {"You are logged in as " + value.email}
            </p>
            <hr />
            <a href="/setting">
              <button
                type="button"
                className={"btn btn-outline-primary " + styles.dropdownBtn}
              >
                Setting
              </button>
            </a>
            {value.login && (
              <button
                type="button"
                className={"btn btn-outline-primary " + styles.dropdownBtn}
                onClick={props.logout}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavigationUserLinksExpand;
