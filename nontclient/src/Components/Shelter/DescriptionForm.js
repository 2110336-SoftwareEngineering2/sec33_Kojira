import React from "react";
import {
  VALID,
  DEFAULT,
} from "../../Constants/FormValidity";

const DescriptionForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="description-input" className="form-label">
          Description{" "}
        </label>
        <textarea
          className={"form-control ".concat(
            props.validDescription === DEFAULT || props.validDescription
              ? ""
              : props.validDescription === VALID
              ? "is-valid"
              : "is-invalid"
          )}
          id="description-input"
          name="description"
          onChange={props.onFormChange}
        />
      </div>
    </div>
  );
};

export default DescriptionForm;
