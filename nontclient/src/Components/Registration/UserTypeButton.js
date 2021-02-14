import React from 'react';
import UserType from "../../Constants/UserType";

const UserTypeButton = props => {
  return (
    <div
      className="row d-flex justify-content-center"
      style={{ height: "75px" }}
    >
      <div className="col-5" id="nont-owner-col">
        <button
          type="button"
          className={
            props.accountType === UserType.NONT_OWNER
              ? "btn btn-info btn-block"
              : "btn btn-outline-info btn-block"
          }
          id="nont-owner-btn"
          onClick={() => props.onUserTypeButtonClick(UserType.NONT_OWNER)}
        >
          Nont Owner
        </button>
      </div>
      <div className="col-5" id="nont-sitter-col">
        <button
          type="button"
          className={
            props.accountType === UserType.NONT_SITTER
              ? "btn btn-success btn-block"
              : "btn btn-outline-success btn-block"
          }
          id="nont-sitter-btn"
          onClick={() => props.onUserTypeButtonClick(UserType.NONT_SITTER)}
        >
          Nont Sitter
        </button>
      </div>
    </div>
  );
}
 
export default UserTypeButton;