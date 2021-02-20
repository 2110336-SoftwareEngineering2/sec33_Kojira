import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  CHANGING,
} from "../../../Constants/FormValidity";

const PasswordForm = (props) => {
  return (
    <div className="row">
      <div className="col-lg m-4">
        <label htmlFor="password-input" className="form-label">
          New Password{" "}
          <abbr className="required" title="required">
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
        <div id="password-desc" className="form-text">
          Your new password must be 8-32 characters long.
        </div>
        {props.validPassword === INVALID && (
          <div className="invalid-feedback">Invalid password.</div>
        )}
      </div>
      <div className="col-lg m-4">
        <label htmlFor="retype-password-input" className="form-label">
          Retype New Password{" "}
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
        <div id="retype-password-desc" className="form-text">
          Please retype your new password.
        </div>
        {props.validRetypePassword === INVALID && (
          <div className="invalid-feedback">
            Retype new password must match your new password.
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
