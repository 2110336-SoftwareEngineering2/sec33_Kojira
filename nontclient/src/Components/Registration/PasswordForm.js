import React from "react";
import styles from "./Registration.module.css";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  CHANGING,
} from "../../Constants/FormValidity";

const PasswordForm = (props) => {
  return (
    <div className="row">
      <div className="col-lg m-4">
        <label htmlFor="password-input" className="form-label">
          Password{" "}
          <abbr className={styles.required} title="required">
            *
          </abbr>
        </label>
        <input
          type="password"
          id="password-input"
          className={"form-control ".concat(
            props.validPassword === DEFAULT || props.validPassword === CHANGING
              ? ""
              : props.validPassword === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          name="password"
          onChange={props.onFormChange}
          onBlur={props.validatePassword}
          aria-describedby="password-desc"
          required
        />
        <div id="password-desc" className={"form-text " + styles.fade}>
          Your password must be 8-32 characters long.
        </div>
        {props.validPassword === INVALID && (
          <div className="invalid-feedback">Invalid password.</div>
        )}
        {props.validPassword === EMPTY && (
          <div className="invalid-feedback">Password cannot be empty.</div>
        )}
      </div>
      <div className="col-lg m-4">
        <label htmlFor="retype-password-input" className="form-label">
          Retype Password{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="password"
          id="retype-password-input"
          className={"form-control ".concat(
            props.validRetypePassword === DEFAULT ||
              props.validRetypePassword === CHANGING
              ? ""
              : props.validRetypePassword === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          name="retypePassword"
          onChange={props.onFormChange}
          onBlur={props.validateRetypePassword}
          aria-describedby="retype-password-desc"
          required
        />
        <div id="retype-password-desc" className={"form-text " + styles.fade}>
          Please retype your password.
        </div>
        {props.validRetypePassword === INVALID && (
          <div className="invalid-feedback">
            Retype password must match your password.
          </div>
        )}
        {props.validRetypePassword === EMPTY && (
          <div className="invalid-feedback">
            Retype password cannot be empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
