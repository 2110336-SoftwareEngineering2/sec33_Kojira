import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const BirthDateForm = (props) => {
  return (
      <div className="col m-4">
        <label htmlFor="birth_date-input" className="form-label">
          Date of birth{" "}
          <abbr style={{color:"red"}} title="required">
            *
          </abbr>
        </label>
        <input
          type="date"
          className={"form-control ".concat(
            props.valid === DEFAULT
              ? ""
              : props.valid === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="birth_date-input"
          name="birth_date"
          placeholder=""
          max="2021-12-31"
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          required
        />
      </div>
  );
};

export default BirthDateForm;
