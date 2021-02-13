import React from 'react';

const UsernameForm = props => {
  return ( 
    <div className="row">
      <div className="col m-4">
        <label htmlFor="name-input" className="form-label">
          Name{" "}
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          className="form-control"
          id="name-input"
          name="name"
          onChange={props.onFormChange}
          required
        />
      </div>
    </div>
  );
}
 
export default UsernameForm;