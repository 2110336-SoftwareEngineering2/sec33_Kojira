import React from "react";

const PhoneNumberForm = (props) => {
  return (
    <div className="col m-4">
      <label htmlFor="phone-input" className="form-label">
        Phone Number{" "}
      </label>
      <input
        type="text"
        className={"form-control"}
        id="phone-input"
        name="phoneNumber"
        onChange={props.onFormChange}
      />
    </div>
  );
};

export default PhoneNumberForm;
