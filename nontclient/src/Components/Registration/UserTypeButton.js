import React from "react";
import UserType from "../../Constants/UserType";
import styles from "./Registration.module.css";

const UserTypeButton = (props) => {
  return (
    <div className="row d-flex justify-content-center" >
      <div className="col-sm-4 d-flex justify-content-center mb-4">
        <button
          type="button"
          className={
            props.accountType === UserType.NONT_OWNER
              ? "btn btn-info btn-block"
              : "btn btn-outline-info btn-block"
          }
          id={styles.nontOwnerButton}
          onClick={() => props.onUserTypeButtonClick(UserType.NONT_OWNER)}
        >
          Nont Owner
        </button>
      </div>
      <div className="col-sm-4 d-flex justify-content-center mb-4">
        <button
          type="button"
          className={
            props.accountType === UserType.NONT_SITTER
              ? "btn btn-success btn-block"
              : "btn btn-outline-success btn-block"
          }
          id={styles.nontSitterButton}
          onClick={() => props.onUserTypeButtonClick(UserType.NONT_SITTER)}
        >
          Nont Sitter
        </button>
      </div>
    </div>
  );
};

export default UserTypeButton;
