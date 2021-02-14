import React from "react";
import styles from "./LoginPrompt.module.css";
import UserType from "../../Constants/UserType";

const LoginPrompt = function (props) {
  return (
    <div>
      <h2 id={styles.LoginHeader} className={"mt-3 " + styles.textCenter}>
        Login
      </h2>
      <h3 className={"mt-4 " + styles.textCenter}>
        Are you a Nont Owner or a Nont Sitter ?
      </h3>
      <div className={"row mb-5 " + styles.center}>
        <button
          id={styles.NontOwnerButton}
          onClick={() => props.changeMode(UserType.NONT_OWNER)}
        >
          A Nont Owner
        </button>
      </div>
      <div className={"row mb-5 " + styles.center}>
        <button
          id={styles.NontSitterButton}
          onClick={() => props.changeMode(UserType.NONT_SITTER)}
        >
          A Nont Sitter
        </button>
      </div>
      <p className={styles.textCenter}>
        Don't have an account yet? Sign up <a href="/register">here</a>
      </p>
    </div>
  );
};

export default LoginPrompt;
