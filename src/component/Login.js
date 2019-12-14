import React from "react";
import "../App.css";
import {
  // BrowserRouter
  // Router,
  // Route,
  // Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import AuthService from '../service/AuthService';


class Login extends React.Component {
  state = {
    redirectToRefferer: false
  };

  handleLogin = e => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    AuthService.login_basic_auth(username, password);
    if (AuthService.isLogged()) {
      this.setState({ redirectToRefferer: true, loginFailMessage: "" });
    } else {
      this.setState({ loginFailMessage: "Username or password is wrong" });
    }
  };

  render() {
    const { from } = this.props.location.state || { form: { pathname: "/" } };

    if (this.state.redirectToRefferer) {
      return <Redirect to={from}></Redirect>;
    }

    return (
      <div className = "common">
        <div>
          <label>
            username:{" "}
            <input type="text" id="username" defaultValue="user"></input>{" "}
          </label>
        </div>
        <div>
          <label>
            password:{" "}
            <input type="text" id="password" defaultValue="123123"></input>{" "}
          </label>
        </div>
        <div>
          <button className="green-button" onClick={this.handleLogin}>Login</button>
        </div>
        <div>{this.state.loginFailMessage}</div>
      </div>
    );
  }
}

export default connect()(Login);