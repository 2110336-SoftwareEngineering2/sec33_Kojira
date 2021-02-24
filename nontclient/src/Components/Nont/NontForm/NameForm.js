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
    <div className="row">
      <div className="col m-4">
        <label htmlFor="name-input" className="form-label">
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
          aria-describedby="name-desc"
          required
        />
        <div id="name-desc" className="form-text">
          Nont's name must not be longer than 32 characters.
        </div>
      </div>
    </div>
  );
};

export default NameForm;
