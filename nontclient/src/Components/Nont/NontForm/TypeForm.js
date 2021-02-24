import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const TypeForm = (props) => {
  return (
      <div className="col m-4">
        <label htmlFor="type-input" className="form-label">
          Type{" "}
          <abbr style={{color:"red"}} title="required"> 
            *
          </abbr>
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
          id="type-input"
          name="type"
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          aria-describedby="type-desc"
          required
        />
        <div id="type-desc" className="form-text">
          Type must be large dog, medium dog, small dog, cat, hamster, bird or rabbit.
        </div>
      </div>
  );
};

export default TypeForm;
