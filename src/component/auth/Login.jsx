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
    const redirectTo = this.props.redirectTo;
    
    if (this.props.redirectToRefferer) {
      return <Redirect to={redirectTo}></Redirect>;
    }

    const usernameSettings = {
      id: "username",
      label: "Username",
      value: "user1",
      isView: false,
      placeholder: "Username",
      handler: this.handleUsernameChange
    };

    const passwordSettings = {
      id: "password",
      label: "Password",
      value: "123123",
      isView: false,
      placeholder: "Password",
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
          <h3>Login to access your todos</h3>
          <TextField settings={usernameSettings} />
          <TextField settings={passwordSettings} />
          <Button settings={loginButtonSettings} />
          <p className="register-link">
            Do not have an account? <Link to="/registration">Register</Link>
          </p>
        </div>
        <div className="common login-social">
          {/* <h3>Social login  </h3> */}
          <div className="login-social-item">
            <div>
              <i className="fab fa-github"></i>
              <a href={GITHUB_AUTH_URL}>
                 Login with GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
