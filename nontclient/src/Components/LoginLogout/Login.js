import React, { Component } from "react";
import UserType from "../../Utils/UserType";
import styles from "./Login.module.css";
import NontOwnerLogin from "./NontOwnerLogin";
import NontSitterLogin from "./NontSitterLogin";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null,
    };
  }

  changeMode(newmode) {
    this.setState({ mode: newmode });
  }

  render() {
    // implement login page.
    return (
      <div className={styles.superCenter} id={styles.LoginOutsideDiv}>
        <div id={styles.LoginDiv} className={styles.center}>
          {this.state.mode === null && (
            <div>
              <h2
                id={styles.LoginHeader}
                className={"mt-3 " + styles.textCenter}
              >
                Login
              </h2>
              <h3 className="mt-4">Choose user type</h3>
              <div className={"row mb-5 " + styles.center}>
                <button
                  id={styles.NontOwnerButton}
                  onClick={() => this.changeMode(UserType.NONT_OWNER)}
                >
                  Nont Owner
                </button>
              </div>
              <div className={"row mb-5 " + styles.center}>
                <button
                  id={styles.NontSitterButton}
                  onClick={() => this.changeMode(UserType.NONT_SITTER)}
                >
                  Nont Sitter
                </button>
              </div>
            </div>
          )}
          {this.state.mode === UserType.NONT_OWNER && <NontOwnerLogin />}
          {this.state.mode === UserType.NONT_SITTER && <NontSitterLogin />}
        </div>
      </div>
    );
  }
}
