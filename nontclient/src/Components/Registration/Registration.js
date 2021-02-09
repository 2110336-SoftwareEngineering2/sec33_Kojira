import React, { Component } from 'react';
import './Registration.css';

class Registration extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="container">
        <h1 className = "my-5 title">
          Register Account
        </h1>
        <div className="m-4">
          <label for="email-input" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email-input" placeholder="name@example.com" />
        </div>
        <div className="row">
          <div className="col-lg m-4">
            <label for="password-input" class="form-label">Password</label>
            <input type="password" id="password-input" class="form-control" aria-describedby="password-desc" />
            <div id="password-desc" class="form-text">
              Your password must be 8-32 characters long.
            </div>
          </div>
          <div className="col-lg m-4">
            <label for="retype-password-input" class="form-label">Retype Password</label>
            <input type="password" id="retype-password-input" class="form-control" aria-describedby="retype-password-desc" />
            <div id="retype-password" class="form-text">
              Please retype your password.
            </div>
          </div>
        </div>
        <div className="m-4">
          <label for="username-input" class="form-label">Username</label>
          <input type="text" class="form-control" id="username-input" aria-describedby="name-desc" />
          <div id="name-desc" class="form-text">Your username must be 2-32 characters long.</div>
        </div>
        <div className="m-5" style={{ textAlign: 'center' }}>
          <button type="button" class="btn btn-outline-primary btn-lg">Register</button>
        </div>
      </div>
    );
  }
}

export default Registration;
