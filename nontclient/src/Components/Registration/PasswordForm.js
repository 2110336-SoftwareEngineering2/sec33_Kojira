import React from 'react';

const PasswordForm = props => {
  return ( 
    <div className="row">
      <div className="col-lg m-4">
        <label htmlFor="password-input" className="form-label">
          Password{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="password"
          id="password-input"
          className="form-control"
          name="password"
          onChange={props.onFormChange}
          aria-describedby="password-desc"
          required
        />
        <div id="password-desc" className="form-text">
          Your password must be 8-32 characters long.
        </div>
      </div>
      <div className="col-lg m-4">
        <label htmlFor="retype-password-input" className="form-label">
          Retype Password{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="password"
          id="retype-password-input"
          className="form-control"
          name="retypePassword"
          onChange={props.onFormChange}
          aria-describedby="retype-password-desc"
          required
        />
        <div id="retype-password" className="form-text">
          Please retype your password.
        </div>
      </div>
    </div>
  );
}
 
export default PasswordForm;