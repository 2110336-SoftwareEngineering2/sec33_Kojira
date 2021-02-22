import React from "react";
import styles from "./Registration.module.css";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../Constants/FormValidity";

const UsernameForm = (props) => {
  return (
    <div className="row">
      <div className="col m-3">
        <label htmlFor="name-input" className="form-label">
          Name{" "}
          <abbr className={styles.required} title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className={"form-control ".concat(
            props.validName === DEFAULT || props.validName === CHANGING
              ? ""
              : props.validName === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="name-input"
          name="name"
          onChange={props.onFormChange}
          onBlur={props.validateName}
          aria-describedby="name-desc"
          required
        />
        <div id="name-desc" className={"form-text " + styles.fade}>
          Your name must not longer than 64 characters.
        </div>
        {props.validName === EMPTY && (
          <div className="invalid-feedback">Name cannot be empty.</div>
        )}
        {props.validName === EXIST && (
          <div className="invalid-feedback">Name already exists.</div>
        )}
        {props.validName === INVALID && (
          <div className="invalid-feedback">Invalid name.</div>
        )}
      </div>
    </div>
  );
};

export default UsernameForm;
