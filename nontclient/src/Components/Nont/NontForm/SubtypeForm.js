import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const SubtypeForm = (props) => {
  return (
      <div className="col m-4">
        <label htmlFor="subtype-input" className="form-label">
          Subtype / Breed {" "}
        </label>
        <input
          type="text"
          className={"form-control ".concat(
            props.valid === DEFAULT
              ? ""
              : props.valid === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="subtype-input"
          name="subtype"
          size="56"
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          aria-describedby="subtype-desc"
        />
        <div id="subtype-desc" className="form-text">
          Subtype must not be longer than 50 characters.
        </div>
      </div>
  );
};

export default SubtypeForm;
