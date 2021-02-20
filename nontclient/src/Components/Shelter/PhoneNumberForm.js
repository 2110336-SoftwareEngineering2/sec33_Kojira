import React from "react";
import {
  VALID,
  DEFAULT,
} from "../../Constants/FormValidity";

const PhoneNumberForm = (props) => {
  return (
    <div className="col m-4">
      <label htmlFor="phone-input" className="form-label">
        Phone Number{" "}
      </label>
      <input
        type="text"
        className={"form-control ".concat(
          props.validPhoneNumber === DEFAULT || props.validPhoneNumber
            ? ""
            : props.validPhoneNumber === VALID
            ? "is-valid"
            : "is-invalid"
        )}
        id="phone-input"
        name="phoneNumber"
        onChange={props.onFormChange}
      />
    </div>
  );
};

export default PhoneNumberForm;
