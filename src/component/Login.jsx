import React from "react";
import {
  Link,
  // BrowserRouter
  // Router,
  // Route,
  // Link,
  Redirect
} from "react-router-dom";
import "../App.css";
import Button from "./base/Button";
import TextField from "./base/TextField";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    // this.loginUser = this.loginUser.bind(this);
  }

  handleUsernameChange = username => {
    this.setState({
      username: username
    });
  };

  handlePasswordChange = password => {
    this.setState({
      password: password
    });
  };

  loginUser = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    this.props.handleLogin(username, password);
  }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { from } = { from: { pathname: this.props.redirectTo } } || {
      from: { pathname: "/" }
    };

    if (this.props.redirectToRefferer) {
      return <Redirect to={from}></Redirect>;
    }

    const usernameSettings = {
      id: "username",
      label: "Username",
      value: "user",
      isView: false,
      handler: this.handleUsernameChange
    };

    const passwordSettings = {
      id: "password",
      label: "Password",
      value: "123123",
      isView: false,
      handler: this.handlePasswordChange,
      type: "password"
    };

    const loginButtonSettings = {
      id: "login-button",
      text: "Login",
      type: "submit",
      handler: this.loginUser
    };

    return (
      <div className="common">
        <TextField settings={usernameSettings} />
        <TextField settings={passwordSettings} />
        <Button settings={loginButtonSettings} />

        {/* <div>
          <label>
            Username:
            <input type="text" id="username" defaultValue="user"></input>
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="text" id="password" defaultValue="123123"></input>
          </label>
        </div>
        <div>
          <button className="green-button" onClick={this.handleLogin}>
            Login
          </button>
        </div> */}
        <Link to="/registration">Register</Link>
        {/* <div>{this.state.loginFailMessage}</div> */}
      </div>
    );
  }
}

export default Login;
