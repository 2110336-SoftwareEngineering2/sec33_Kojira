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

const ShelternameForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="name-input" className="form-label">
          Name{" "}
          <abbr className={styles.required} title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className={"form-control ".concat(
            props.validName === DEFAULT
              ? ""
              : props.validName === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="name-input"
          name="name"
          onChange={props.onFormChange}
          onBlur={props.validateName}
          defaultValue = {props.defaultValue}
          aria-describedby="name-desc"
          required
        />
        <div id="name-desc" className={"form-text "+styles.fade}>
          Your name must not longer than 50 characters.
        </div>
        {props.validName === EXIST && (
          <div className="invalid-feedback">Name already exists.</div>
        )}
      </div>
    </div>
  );
};

export default ShelternameForm;
