import React from "react";
import {
  Link,
  Redirect
} from "react-router-dom";
import Button from "../base/Button";
import TextField from "../base/TextField";
import "../../App.css";
import "./Login.css";
import { GITHUB_AUTH_URL} from "../../service/constants";

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
  };

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
      <div className="login-component">
        <div className="common login-basic">
          <TextField settings={usernameSettings} />
          <TextField settings={passwordSettings} />
          <Button settings={loginButtonSettings} />
          <p className="register-link">
            Do not have an account? <Link to="/registration">Register</Link>
          </p>
        </div>
        <div className="common login-social">
          <h2>Social login</h2>
          <div className="login-social-item">
            <div>
              <i className="fab fa-github"></i>
              <a href={GITHUB_AUTH_URL}>
                 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
