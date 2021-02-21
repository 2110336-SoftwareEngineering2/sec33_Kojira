import React from "react";

const DescriptionForm = (props) => {
  return (
    <div className="row">
      <div className="col m-4">
        <label htmlFor="description-input" className="form-label">
          Description{" "}
        </label>
        <textarea
          className={"form-control"}
          id="description-input"
          name="description"
          onChange={props.onFormChange}
        />
      </div>
    </div>
  );
};

export default DescriptionForm;
