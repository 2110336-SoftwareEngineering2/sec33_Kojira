import React from 'react';
import { VALID, INVALID, DEFAULT, EMPTY, EXIST, CHANGING } from "../../Constants/FormValidity";

const EmailForm = props => {
  return ( 
    <div className="row">
      <div className="col m-4">
        <label htmlFor="email-input" className="form-label">
          Email address{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="email"
          className={"form-control ".concat(
            props.validEmail === DEFAULT || props.validEmail === CHANGING
              ? ""
              : props.validEmail === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="email-input"
          name="email"
          onChange={props.onFormChange}
          onBlur={props.validateEmail}
          required
        />
        {props.validEmail === EMPTY && (
          <div className="invalid-feedback">Email cannot be empty.</div>
        )}
        {props.validEmail === EXIST && (
          <div className="invalid-feedback">Email already exists.</div>
        )}
        {props.validEmail === INVALID && (
          <div className="invalid-feedback">Invalid email.</div>
        )}
      </div>
    </div>
  );

}
 
export default EmailForm;