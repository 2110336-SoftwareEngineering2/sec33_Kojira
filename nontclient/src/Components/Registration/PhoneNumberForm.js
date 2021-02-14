import React from "react";
import { VALID, INVALID } from "../../Constants/FormValidity";

const PhoneNumberForm = (props) => {
  return (
    <div className="col-lg m-4">
      <label htmlFor="phone-input" className="form-label">
        Phone Number{" "}
        <abbr className="required" title="required">
          *
        </abbr>
      </label>
      <input
        type="text"
        className={"form-control ".concat(
          props.validPhoneNumber === VALID
            ? "is-valid"
            : props.validPhoneNumber === INVALID
            ? "is-invalid"
            : ""
        )}
        id="phone-input"
        name="phoneNumber"
        onChange={props.onFormChange}
        onBlur={props.validatePhoneNumber}
        required
      />
      {props.validPhoneNumber === INVALID && (
        <div className="invalid-feedback">Invalid phone number</div>
      )}
    </div>
  );
};

export default PhoneNumberForm;
