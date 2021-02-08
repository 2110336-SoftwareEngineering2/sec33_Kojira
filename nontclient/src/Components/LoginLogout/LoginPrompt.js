import React from "react";
import styles from "./Login.module.css";
import UserType from "../../Utils/UserType";

const LoginPrompt = function (props) {
  return (
    <div>
      <h2 id={styles.LoginHeader} className={"mt-3 " + styles.textCenter}>
        Login
      </h2>
      <h3 className="mt-4">Choose user type</h3>
      <div className={"row mb-5 " + styles.center}>
        <button
          id={styles.NontOwnerButton}
          onClick={() => props.changeMode(UserType.NONT_OWNER)}
        >
          Nont Owner
        </button>
      </div>
      <div className={"row mb-5 " + styles.center}>
        <button
          id={styles.NontSitterButton}
          onClick={() => props.changeMode(UserType.NONT_SITTER)}
        >
          Nont Sitter
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
