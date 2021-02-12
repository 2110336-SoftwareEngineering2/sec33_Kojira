import React from 'react';
import { NONT_OWNER_TYPE, NONT_SITTER_TYPE } from "../../Constants/UserType"

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
            props.accountType === NONT_OWNER_TYPE
              ? "btn btn-info btn-block"
              : "btn btn-outline-info btn-block"
          }
          id="nont-owner-btn"
          onClick={() => props.onUserTypeButtonClick(NONT_OWNER_TYPE)}
        >
          Nont Owner
        </button>
      </div>
      <div className="col-5" id="nont-sitter-col">
        <button
          type="button"
          className={
            props.accountType === NONT_SITTER_TYPE
              ? "btn btn-success btn-block"
              : "btn btn-outline-success btn-block"
          }
          id="nont-sitter-btn"
          onClick={() => props.onUserTypeButtonClick(NONT_SITTER_TYPE)}
        >
          Nont Sitter
        </button>
      </div>
    </div>
  );
}
 
export default UserTypeButton;