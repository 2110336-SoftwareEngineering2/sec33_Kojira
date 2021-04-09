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
        <label htmlFor="birth_date-input" className="emphasis form-label">
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
          max={new Date().toISOString().split("T")[0]}
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          aria-describedby="birth_date-desc"
          required
        />

        {props.valid === INVALID && document.getElementById("birth_date-input").value.length === 0 &&
        <div id="birth_date-desc" className="form-text text-danger">
          Date of birth is required.
        </div>}

      </div>
  );
};

export default BirthDateForm;
