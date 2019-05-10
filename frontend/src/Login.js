import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.auth = props.auth;
    this.state = {
      isAuthenticated: this.auth.isAuthenticated()
    };
  }

  login() {
    const name = this.refs.input.value.trim();
    this.auth.authenticate(name || "Guest");
    this.setState({ isAuthenticated: true });
  }

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <div className="login">
        <input
          autoFocus
          type="text"
          placeholder="Guest"
          ref="input"
          onKeyPress={({ key }) => key === 'Enter' && this.login()}
        />
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
}

export default Login;
