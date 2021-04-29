import React from "react";
import {
  VALID,
  INVALID,
  DEFAULT,
  EMPTY,
  EXIST,
  CHANGING,
} from "../../../Constants/FormValidity";

const NameForm = (props) => {
  return (
      <div className="col m-4">
        <label htmlFor="name-input" className="emphasis form-label">
          Name{" "}
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
          id="name-input"
          name="name"
          onChange={props.onChange}
          defaultValue = {props.defaultValue}
          aria-describedby="name-desc"
          required
        />
        {props.valid === INVALID && document.getElementById("name-input").value.length !== 0 &&
        <div id="name-desc" className="form-text text-danger">
          Name must not be longer than 32 characters.
        </div>}

        {props.valid === INVALID && document.getElementById("name-input").value.length === 0 &&
        <div id="name-desc" className="form-text text-danger">
          Name is required.
        </div>}

      </div>
  );
};

export default NameForm;
