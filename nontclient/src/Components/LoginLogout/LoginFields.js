import React, { Component } from "react";
import styles from "./LoginFields.module.css";
import LoginService from "../../Services/LoginService";

export default class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    LoginService.Login(
      this.state.email,
      this.state.password,
      this.props.UserType
    );
  }

  render() {
    return (
      <div id={styles.LoginFieldsDiv} className={styles.textCenter}>
        <i
          className="fa fa-chevron-left"
          id={styles.backChevronButton}
          type="button"
          onClick={() => this.props.changeMode(null)}
        ></i>
        <h1 className="mt-4">Login as a {this.props.UserType}</h1>
        <div className={"row " + styles.center}>
          <input
            onChange={(e) => this.handleOnChangeEmail(e)}
            type="email"
            id={styles.emailInput}
            size="50"
            placeholder="Enter your email"
          ></input>
        </div>
        <div className={"row " + styles.center}>
          <input
            onChange={(e) => this.handleOnChangePassword(e)}
            type="password"
            id={styles.passwordInput}
            size="50"
            placeholder="Enter your password"
          ></input>
        </div>
        <div className={"row " + styles.center}>
          <button id={styles.logInButton} onClick={() => this.handleSubmit()}>
            Log in
          </button>
        </div>
        <p>
          Don't have an account yet? Sign up <a href="/signup">here</a>
        </p>
      </div>
    );
  }
}
