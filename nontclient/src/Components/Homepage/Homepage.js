import React, { Component } from "react";
import LoginService from "../../Services/LoginService";
import { withRouter } from "react-router";
import Contexts from "../../Utils/Context/Contexts";

const userContext = Contexts.userContext;

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: null,
      email: null,
    };
  }
  componentDidMount() {
    LoginService.getLoggedInEmail(this);
  }

  logout() {
    this.props.setUserType(null);
    localStorage.removeItem("access_token");
  }

  render() {
    return (
      <>
        <userContext.Consumer>
          {(value) => {
            if (this.state.userType !== value.userType) {
              this.setState({ userType: value.userType });
            }
          }}
        </userContext.Consumer>
        {this.state.userType !== null && (
          <>
            <h2 className="col"> Logged in as {this.state.email}</h2>
            <button onClick={() => this.logout()}>Log out</button>
          </>
        )}

        {this.state.userType === null && (
          <button onClick={() => this.props.history.push("/login")}>
            Log in
          </button>
        )}
      </>
    );
  }
}

export default withRouter(Homepage);
