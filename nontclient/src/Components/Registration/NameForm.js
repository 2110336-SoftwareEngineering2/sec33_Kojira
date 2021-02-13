import React from "react";

const UsernameForm = (props) => {
  return (
    <div className="row">
      <div className="col-lg m-4">
        <label htmlFor="first-name-input" className="form-label">
          First Name{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className="form-control"
          id="first-name-input"
          name="firstName"
          onChange={props.onFormChange}
          required
        />
      </div>
      <div className="col-lg m-4">
        <label htmlFor="last-name-input" className="form-label">
          Last Name{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className="form-control"
          id="last-name-input"
          name="lastName"
          onChange={props.onFormChange}
          required
        />
      </div>
    </div>
  );
};

export default UsernameForm;
