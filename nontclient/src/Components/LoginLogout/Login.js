import React, { Component } from "react";
import styles from "./Login.module.css";
import LoginPrompt from "./LoginPrompt";
import LoginFields from "./LoginFields";
import LoginService from "../../Services/LoginService";
import { withRouter } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null,
    };
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  async checkLoginStatus() {
    try {
      const respond = await LoginService.checkLoginStatus();
      if (respond.data.authenticated) {
        this.props.history.push("/home"); // if already have the token (logged in already) then go to home.
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    if (localStorage.getItem("access_token") !== null) {
      this.checkLoginStatus();
    }
  }

  changeMode(newmode) {
    this.setState({ mode: newmode });
  }

  render() {
    return (
      <div className={styles.center} id={styles.LoginOutsideDiv}>
        <div className="row">
          <div className={"col"}>
            <div className="row">
              <LoginPrompt
                changeMode={(newmode) => this.changeMode(newmode)}
                mode={this.state.mode}
              />
            </div>
            <div className="row">
              {this.state.mode !== null && (
                <LoginFields
                  UserType={this.state.mode}
                  changeMode={(newmode) => this.changeMode(newmode)}
                />
              )}
            </div>
            <p className={styles.textCenter}>
              Don't have an account yet? Sign up <a href="/register">here</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
