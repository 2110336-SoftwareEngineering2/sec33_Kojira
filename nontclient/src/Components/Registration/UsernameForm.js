import React from 'react';

const UsernameForm = props => {
  return ( 
    <div className="row">
      <div className="col m-4">
        <label htmlFor="username-input" className="form-label">
          Username{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className="form-control"
          id="username-input"
          name="username"
          onChange={props.onFormChange}
          aria-describedby="name-desc"
          required
        />
        <div id="name-desc" className="form-text">
          Your username must be 2-32 characters long.
        </div>
      </div>
    </div>
  );
}
 
export default UsernameForm;