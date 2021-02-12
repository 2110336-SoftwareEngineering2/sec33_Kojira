import React from 'react';

const PhoneNumberForm = props => {
  return ( 
    <div className="col-lg m-4">
      <label htmlFor="phone-input" className="form-label">
        Phone Number{" "}
        <abbr className="required" title="required">
          *
        </abbr>
      </label>
      <input
        type="text"
        className="form-control"
        id="phone-input"
        name="phoneNumber"
        onChange={props.onFormChange}
        required
      />
    </div>
  );
}
 
export default PhoneNumberForm;