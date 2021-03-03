import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const DescriptionForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="description-input" className="form-label">
          Description {" "}
        </label>
        <textarea
          className={"form-control ".concat(
            props.valid === DEFAULT
              ? ""
              : props.valid === VALID
              ? "form-control is-valid"
              : "form-control is-invalid"
          )}
          id="description-input"
          name="description"
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          aria-describedby="description-desc"
        />

        {props.valid === INVALID && 
        <div id="description-desc" className="form-text" style={{color:"red"}}>
          Description must not be longer than 500 characters.
        </div>}
        
      </div>
    </div>
  );
};

export default DescriptionForm;
