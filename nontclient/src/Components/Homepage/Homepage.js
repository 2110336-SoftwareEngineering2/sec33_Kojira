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

  render() {
    return (
      <>
        <userContext.Consumer>
          {(value) => {
            return (
              <>
                <h1>Nont Community of Pet Lovers</h1>
                {value.login && (
                  <h2>You are logged in as a {value.userType}</h2>
                )}
                {!value.login && <h2>You are not logged in</h2>}
              </>
            );
          }}
        </userContext.Consumer>
      </>
    );
  }
}

export default withRouter(Homepage);
