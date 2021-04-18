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

const PhoneNumberForm = (props) => {
  return (
    <div className="col m-4">
      <label htmlFor="phone-input" className="emphasis form-label">
        Phone Number{" "}
      </label>
      <input
        type="text"
        className={"form-control ".concat(
          props.validPhoneNumber === DEFAULT
            ? ""
            : props.validPhoneNumber === VALID
            ? "is-valid"
            : "is-invalid"
        )}
        id="phone-input"
        name="phoneNumber"
        onChange={props.onFormChange}
        defaultValue = {props.defaultValue}
      />
    </div>
  );
};

export default PhoneNumberForm;
