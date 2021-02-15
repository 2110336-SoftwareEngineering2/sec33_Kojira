import React, { Component } from "react";
import styles from "./LoginFields.module.css";
import LoginService from "../../Services/LoginService";
import { withRouter } from "react-router";
import LoginResultError from "../../Constants/ErrorTypes/LoginResultError";
import Contexts from "../../Utils/Context/Contexts";

const userContext = Contexts.userContext;

class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }

  handleLoginError(err) {
    switch (err) {
      case LoginResultError.INCORRECT_USERNAME_OR_PASSWORD:
        this.setState({ errMessage: "Incorrect username or password" });
        break;
      case LoginResultError.UNKNOWN_ERROR:
        this.setState({
          errMessage: "unexpected error occurred",
        });
        break;
      default:
        this.setState({ errMessage: "" });
    }
    setTimeout(() => {
      this.setState({ errMessage: "" });
    }, 3000);
  }

  handleOnChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleOnChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(updateUserInfo) {
    LoginService.Login(
      this.state.email,
      this.state.password,
      this.props.UserType,
      this
    ).then((result) => {
      if (result !== true) {
        this.handleLoginError(result);
      } else {
        updateUserInfo();
      }
    });
  }

  render() {
    return (
      <userContext.Consumer>
        {(value) => {
          return (
            <div id={styles.LoginFieldsDiv} className={styles.textCenter}>
              <i
                className="fa fa-chevron-left"
                title="Back"
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
                <button
                  id={styles.logInButton}
                  onClick={() => this.handleSubmit(value.UpdateUserInfo)}
                >
                  Log in
                </button>
              </div>
              {this.state.errMessage !== "" && (
                <p className={styles.redColor}>{this.state.errMessage}</p>
              )}
              <p>
                Don't have an account yet? Sign up <a href="/register">here</a>
              </p>
            </div>
          );
        }}
      </userContext.Consumer>
    );
  }
}

export default withRouter(LoginFields);
