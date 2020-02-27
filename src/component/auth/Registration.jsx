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
      // true after the registed button clicked and backend did not response yet
      isLoading: false
    };

    this.registerUserButtonHandler = this.registerUserButtonHandler.bind(this);
  }

  usernameChangeHandler = username => {
    // console.log(this.state);
    this.setState({
      user: Object.assign({}, this.state.user, { username: username })
    });
    // console.log(this.state);
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
    this.setState({isLoading: true});
    AuthService.register(
      this.state.user,
      // success
      () => {
        this.props.history.push("/login");
        this.props.showInfoMessage(
          "Account was successfully created. An email was sent to your email to complete the registration",
          "info"
        );
      },
      // failure
      message => {
        this.props.showInfoMessage(
          "Please, verify that you provided valid information",
          "error"
        );
        this.setState({isLoading: false});
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
      handler: this.usernameChangeHandler
    };

    const emailSettings = {
      id: "email",
      label: "Email",
      value: "user5@mail.cc",
      placeholder: "email",
      isView: false,
      handler: this.emailChangeHandler
    };

    const passwordSettings = {
      id: "password",
      label: "Password",
      value: "123123",
      isView: false,
      placeholder: "password",
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
    showInfoMessage: (message, type) => dispatch(showInfobarMessage(message, type)),
    clearInfobar: () => dispatch(clearInfobar)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registraction);
