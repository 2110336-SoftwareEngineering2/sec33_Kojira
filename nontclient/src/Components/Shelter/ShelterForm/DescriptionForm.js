import React from "react";
import styles from "../Shelter.module.css";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const DescriptionForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="description-input" className="form-label">
          Description{" "}
        </label>
        <textarea
          className={"form-control ".concat(
            props.validDescription === DEFAULT
              ? ""
              : props.validDescription === VALID
              ? "is-valid"
              : "is-invalid"
          )}
          id="description-input"
          name="description"
          onChange={props.onFormChange}
          defaultValue = {props.defaultValue}
        />
        <div id="name-desc" className={"form-text "+styles.fade}>
          Your description must not longer than 500 characters.
        </div>
      </div>
    </div>
  );
};

export default DescriptionForm;
