import React, { Component } from "react";
import LoginService from "../../Services/LoginService";

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
  render() {
    return (
      <>
        <h1 className="col">Nont Community of Pet Lovers</h1>
        {this.state.loggedIn && (
          <h2 className="col"> Logged in as {this.state.email}</h2>
        )}
      </>
    );
  }
}

export default Homepage;
