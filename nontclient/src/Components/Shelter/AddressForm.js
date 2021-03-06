import React from "react";
import styles from "./Shelter.module.css";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../Constants/FormValidity";

const AddressForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="address-input" className="form-label">
          Address{" "}
          <abbr className={styles.required} title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className={"form-control ".concat(
            props.validAddress === DEFAULT
              ? ""
              : props.validAddress === VALID
              ? "is-valid"
              : "is-invalid"
          )}
          id="address-input"
          name="address"
          onChange={props.onFormChange}
          defaultValue = {props.defaultValue}
          required
        />
        <div id="name-desc" className={"form-text "+styles.fade}>
          Your address must not longer than 500 characters.
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
