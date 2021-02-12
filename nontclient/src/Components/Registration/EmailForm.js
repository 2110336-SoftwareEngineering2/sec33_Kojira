import React from 'react';

const EmailForm = props => {
  return ( 
    <div className="row">
      <div className="col m-4">
        <label htmlFor="email-input" className="form-label">
          Email address{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="email"
          className="form-control"
          id="email-input"
          name="email"
          onChange={props.onFormChange}
          required
        />
      </div>
    </div>
  );

}
 
export default EmailForm;