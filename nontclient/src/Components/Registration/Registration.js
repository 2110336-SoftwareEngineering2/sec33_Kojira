import React, { Component } from "react";
import "./Registration.css";
import { NONT_OWNER_TYPE, NONT_SITTER_TYPE } from '../../Constants/UserType';

class Registration extends Component {

  state = {
    type: null,
    email: "",
    password: "",
    retypePassword: "",
    username: "",
    phoneNumber: "",
    bankAccount: "",
  };

  onUserTypeButtonClicked = type => {
    if (type == NONT_OWNER_TYPE) {
      this.setState({ type: NONT_OWNER_TYPE });
    }
    else if (type == NONT_SITTER_TYPE) {
      this.setState({ type: NONT_SITTER_TYPE });
    }
  }

  render() {
    
    return (
      <div className="container">
        <h1 className="my-5 text-center">Register Account</h1>
        <div className="row d-flex justify-content-center">
          <div class="col-5" id="nont-owner-col">
            <button
              type="button"
              class={this.state.type == NONT_OWNER_TYPE ? "btn btn-info btn-block" : "btn btn-outline-info btn-block"}
              id="nont-owner-btn"
              onClick={() => this.onUserTypeButtonClicked(NONT_OWNER_TYPE)}
            >
              Nont Owner
            </button>
          </div>
          <div class="col-5" id="nont-sitter-col">
            <button
              type="button"
              class={this.state.type == NONT_SITTER_TYPE ? "btn btn-success btn-block" : "btn btn-outline-success btn-block"}
              id="nont-sitter-btn"
              onClick={() => this.onUserTypeButtonClicked(NONT_SITTER_TYPE)}
            >
              Nont Sitter
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col m-4">
            <label for="email-input" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="email-input"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg m-4">
            <label for="password-input" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password-input"
              class="form-control"
              aria-describedby="password-desc"
              required
            />
            <div id="password-desc" class="form-text">
              Your password must be 8-32 characters long.
            </div>
          </div>
          <div className="col-lg m-4">
            <label for="retype-password-input" class="form-label">
              Retype Password
            </label>
            <input
              type="password"
              id="retype-password-input"
              class="form-control"
              aria-describedby="retype-password-desc"
              required
            />
            <div id="retype-password" class="form-text">
              Please retype your password.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m-4">
            <label for="username-input" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="username-input"
              aria-describedby="name-desc"
              required
            />
            <div id="name-desc" class="form-text">
              Your username must be 2-32 characters long.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg m-4">
            <label for="phone-input" class="form-label">
              Phone Number
            </label>
            <input type="text" class="form-control" id="phone-input" />
          </div>
          <div className="col-lg m-4">
            <label for="bank-input" class="form-label">
              Bank Account
            </label>
            <input type="text" class="form-control" id="bank-input" />
          </div>
        </div>
        <div className="m-5" style={{ textAlign: "center" }}>
          <button type="button" class="btn btn-outline-primary btn-lg">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Registration;
