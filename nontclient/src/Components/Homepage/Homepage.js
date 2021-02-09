import React, { Component } from "react";
import LoginService from "../../Services/LoginService";
import { withRouter } from "react-router";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: null,
    };
  }
  componentDidMount() {
    LoginService.getLoggedInEmail(this);
  }

  logout() {
    this.setState({ loggedIn: false });
    localStorage.removeItem("access_token");
  }

  render() {
    return (
      <>
        <h1 className="col">Nont Community of Pet Lovers</h1>
        {this.state.loggedIn && (
          <>
            <h2 className="col"> Logged in as {this.state.email}</h2>
            <button onClick={() => this.logout()}>Log out</button>
          </>
        )}
        {!this.state.loggedIn && (
          <button onClick={() => this.props.history.push("/login")}>
            Log in
          </button>
        )}
      </>
    );
  }
}

export default withRouter(Homepage);
