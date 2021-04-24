import React, { Component } from "react";
import styles from "./LoginFields.module.css";
import LoginService from "../../Services/LoginService";
import { withRouter } from "react-router";
import LoginResultError from "../../Constants/ErrorTypes/LoginResultError";
import Contexts from "../../Utils/Context/Contexts";

const UserContext = Contexts.UserContext;

class LoginFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
      loading: false,
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
    this.setState({ loading: true });
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
      <UserContext.Consumer>
        {(value) => {
          return (
            <div id={styles.LoginFieldsDiv} className={styles.textCenter}>
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleSubmit(value.UpdateUserInfo);
                }}
              >
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
                    className="btn btn-success"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
                {this.state.errMessage !== "" && (
                  <p className={styles.redColor}>{this.state.errMessage}</p>
                )}
                {this.state.loading && (
                  <div
                    className="spinner-border"
                    id={styles.spinner}
                    role="status"
                  ></div>
                )}
              </form>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(LoginFields);
