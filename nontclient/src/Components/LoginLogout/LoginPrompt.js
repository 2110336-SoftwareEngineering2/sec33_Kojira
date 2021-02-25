import React from "react";
import styles from "./LoginPrompt.module.css";
import UserType from "../../Constants/UserType";

const LoginPrompt = function (props) {
  return (
    <div>
      <h2 id={styles.LoginHeader} className={"mt-3 " + styles.textCenter}>
        Login
      </h2>

      <div className={"row mb-4 " + styles.center}>
        <div className={"col-md-6 col-sm-12 " + styles.center}>
          <button
            id={styles.NontOwnerButton}
            className="btn btn-outline-primary"
            onClick={() => props.changeMode(UserType.NONT_OWNER)}
            style={
              props.mode === UserType.NONT_OWNER
                ? {
                    backgroundColor: "#3ba3fc",
                    color: "white",
                  }
                : {}
            }
          >
            Nont Owner
          </button>
        </div>
        <div className={"col-md-6 col-sm-12 " + styles.center}>
          <button
            id={styles.NontSitterButton}
            className="btn btn-outline-primary"
            onClick={() => props.changeMode(UserType.NONT_SITTER)}
            style={
              props.mode === UserType.NONT_SITTER
                ? {
                    backgroundColor: "#3ba3fc",
                    color: "white",
                  }
                : {}
            }
          >
            Nont Sitter
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default LoginPrompt;
