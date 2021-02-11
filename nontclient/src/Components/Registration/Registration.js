import React, { Component } from "react";
import "./Registration.css";
import { NONT_OWNER_TYPE, NONT_SITTER_TYPE } from "../../Constants/UserType";

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

  userTypeButtonClickHandler = (type) => {
    if (type == NONT_OWNER_TYPE) {
      this.setState({ type: NONT_OWNER_TYPE });
    } else if (type == NONT_SITTER_TYPE) {
      this.setState({ type: NONT_SITTER_TYPE });
    }
  };

  handleChange = (element) => {
    const state = this.state;
    state[element.currentTarget.name] = element.currentTarget.value;
    this.setState(state);
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-5 text-center">Register Account</h1>
        <div className="row d-flex justify-content-center">
          <div className="col-5" id="nont-owner-col">
            <button
              type="button"
              className={
                this.state.type == NONT_OWNER_TYPE
                  ? "btn btn-info btn-block"
                  : "btn btn-outline-info btn-block"
              }
              id="nont-owner-btn"
              onClick={() => this.userTypeButtonClickHandler(NONT_OWNER_TYPE)}
            >
              Nont Owner
            </button>
          </div>
          <div className="col-5" id="nont-sitter-col">
            <button
              type="button"
              className={
                this.state.type == NONT_SITTER_TYPE
                  ? "btn btn-success btn-block"
                  : "btn btn-outline-success btn-block"
              }
              id="nont-sitter-btn"
              onClick={() => this.userTypeButtonClickHandler(NONT_SITTER_TYPE)}
            >
              Nont Sitter
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col m-4">
            <label htmlFor="email-input" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email-input"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg m-4">
            <label htmlFor="password-input" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password-input"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              aria-describedby="password-desc"
              required
            />
            <div id="password-desc" className="form-text">
              Your password must be 8-32 characters long.
            </div>
          </div>
          <div className="col-lg m-4">
            <label htmlFor="retype-password-input" className="form-label">
              Retype Password
            </label>
            <input
              type="password"
              id="retype-password-input"
              className="form-control"
              name="retypePassword"
              value={this.state.retypePassword}
              onChange={this.handleChange}
              aria-describedby="retype-password-desc"
              required
            />
            <div id="retype-password" className="form-text">
              Please retype your password.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m-4">
            <label htmlFor="username-input" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username-input"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              aria-describedby="name-desc"
              required
            />
            <div id="name-desc" className="form-text">
              Your username must be 2-32 characters long.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg m-4">
            <label htmlFor="phone-input" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone-input"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-lg m-4">
            <label htmlFor="bank-input" className="form-label">
              Bank Account
            </label>
            <input
              type="text"
              className="form-control"
              id="bank-input"
              name="bankAccount"
              value={this.state.bankAccount}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="m-5" style={{ textAlign: "center" }}>
          <button type="button" className="btn btn-outline-primary btn-lg">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Registration;
