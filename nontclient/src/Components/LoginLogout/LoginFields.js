import React, { Component } from "react";

export default class LoginFields extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1 className="mt-4">Login as a {this.props.UserType}</h1>
      </>
    );
  }
}
