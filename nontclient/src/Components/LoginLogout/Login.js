import React, { Component } from "react";
import UserType from "../../Utils/UserType";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.user === UserType.NONT_OWNER) {
      return <h1>Nont Owner Login Page</h1>;
    } else if (this.props.user === UserType.NONT_SITTER) {
      return <h1>Nont Sitter Login Page</h1>;
    } else {
      return <h1>Login Page</h1>;
    }
  }
}
