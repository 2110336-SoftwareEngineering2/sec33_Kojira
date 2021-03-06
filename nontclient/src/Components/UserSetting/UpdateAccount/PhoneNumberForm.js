import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  CHANGING,
} from "../../../Constants/FormValidity";

const PhoneNumberForm = (props) => {
  return (
    <div className="col-lg m-3">
      <label htmlFor="phone-input" className="form-label">
        Phone Number{" "}
      </label>
      <input
        type="text"
        className={"form-control ".concat(
          props.validPhoneNumber === DEFAULT ||
            props.validPhoneNumber === CHANGING 
            ? ""
            : props.validPhoneNumber === VALID
            ? "is-valid"
            : "is-invalid"
        )}
        id="phone-input"
        name="phoneNumber"
        value={props.value}
        onChange={props.onFormChange}
        onBlur={props.validatePhoneNumber}
        required
      />
      {props.validPhoneNumber === EMPTY && (
        <div className="invalid-feedback">Phone number cannot be empty.</div>
      )}
      {props.validPhoneNumber === INVALID && (
        <div className="invalid-feedback">Invalid phone number.</div>
      )}
    </div>
  );
};

export default PhoneNumberForm;
