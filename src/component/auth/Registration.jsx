import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.css";
import TextField from "../base/TextField";
import Button from "../base/Button";
import AuthService from "../../service/AuthService";
import { Link } from "react-router-dom";
import { clearInfobar } from "../InfobarContainer";
import { INFOBAR_MESSAGE_UPDATE } from "../../reducer/InfobarReducer";
import "./Registration.css";

class Registraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: null,
        email: null,
        password: null
      },
      usernameRed: {},
      emailRed: {},
      passwordRed: {},
      // true after the registed button clicked and backend did not response yet
      isLoading: false
    };

    this.registerUserButtonHandler = this.registerUserButtonHandler.bind(this);
  }

  usernameChangeHandler = username => {
    this.setState({
      user: Object.assign({}, this.state.user, { username: username })
    });
  };

  emailChangeHandler = email => {
    this.setState({
      user: Object.assign({}, this.state.user, { email: email })
    });
  };

  passwordChangeHandler = password => {
    this.setState({
      user: Object.assign({}, this.state.user, { password: password })
    });
  };

  registerUserButtonHandler(e) {
    this.setState({ 
      isLoading: true,
      usernameRed: {},
      emailRed: {},
      passwordRed: {}
    });
    AuthService.register(
      this.state.user,
      // success
      response => {
        let {code, errors} = response.body;
        if (response.status === 201) {
          this.props.history.push("/login");
          this.props.showInfoMessage(
            "Account was successfully created. An email was sent to your email to complete the registration",
            "info"
          );
        } else if (code === 4002) {
          this.props.showInfoMessage(
            "User with such email already exists",
            "error"
          );
          this.setState({
            isLoading: false,
            emailRed: { "border-color": "red" }
          });
        } else if (code === 4003) {
          this.props.showInfoMessage(
            "User with such username already exists",
            "error"
          );
          this.setState({
            isLoading: false,
            usernameRed: { "border-color": "red" }
          });
        } else if (code === 4006) {
          this.props.showInfoMessage(
            "Please, make sure that you provided valid information",
            "error"
          );
          this.setState({
            isLoading: false,
            usernameRed: errors.hasOwnProperty("username")
              ? { "border-color": "red" }
              : {},
              emailRed: errors.hasOwnProperty("email")
              ? { "border-color": "red" }
              : {},
              passwordRed: errors.hasOwnProperty("password")
              ? { "border-color": "red" }
              : {}
          });
        } else {
          this.props.showInfoMessage(
            "Please, make sure that you provided valid information",
            "error"
          );
          this.setState({ isLoading: false });
        }
      },
      // failure
      message => {
        console.log(message);
        this.props.showInfoMessage(
          "Server is not available. Please, try later",
          "error"
        );
        this.setState({ isLoading: false });
      }
    );
  }

  componentWillUnmount() {
    this.props.clearInfobar();
  }

  render() {
    const usernameSettings = {
      id: "username",
      label: "Username",
      value: "user5",
      placeholder: "username",
      isView: false,
      styles: this.state.usernameRed,
      handler: this.usernameChangeHandler
    };

    const emailSettings = {
      id: "email",
      label: "Email",
      value: "user5@mail.cc",
      placeholder: "email",
      isView: false,
      styles: this.state.emailRed,
      handler: this.emailChangeHandler
    };

    const passwordSettings = {
      id: "password",
      label: "Password",
      value: "123123",
      isView: false,
      placeholder: "password",
      styles: this.state.passwordRed,
      handler: this.passwordChangeHandler,
      type: "password"
    };

    const registerButtonSettings = {
      id: "register-button",
      text: "Register",
      type: "submit",
      disabled: this.state.isLoading,
      handler: this.registerUserButtonHandler
    };

    return (
      <div className="common">
        <div className="registration">
          <h3>Register a new account</h3>
          <TextField settings={usernameSettings}></TextField>
          <TextField settings={emailSettings}></TextField>
          <TextField settings={passwordSettings}></TextField>
          <Button settings={registerButtonSettings}></Button>
        </div>
        <span className="login-link">
          Already have an account? <Link to="/login">Back to login page</Link>
        </span>
      </div>
    );
  }
}

const showInfobarMessage = (message, type) => {
  return (dispatch, getState) => {
    dispatch({
      type: INFOBAR_MESSAGE_UPDATE,
      payload: {
        message: message,
        type: type,
        show: true
      }
    });
  };
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    showInfoMessage: (message, type) =>
      dispatch(showInfobarMessage(message, type)),
    clearInfobar: () => dispatch(clearInfobar)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registraction);
