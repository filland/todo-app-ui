import React, { Component } from "react";
import { connect } from "react-redux";
import "../App.css";
import TextField from "./base/TextField";
import Button from "./base/Button";
import AuthService from "../service/AuthService";
import { Redirect } from "react-router-dom";
import { clearInfobar } from "./InfobarContainer";
import { INFOBAR_MESSAGE_UPDATE } from "../reducer/TodoReducer";

class Registraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
          "username": null,
          "email": null,
          "password": null
      },
      isRegistered: false
    };

    this.registerUserButtonHandler = this.registerUserButtonHandler.bind(this);
  }

  usernameChangeHandler = username => {
      console.log(this.state);
    this.setState({
      user: Object.assign({}, this.state.user, { username: username })
    });
    console.log(this.state);
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

  registerUserButtonHandler() {
      console.log(this.state);
    AuthService.register(
      this.state.user,
      // success
      () => {
        this.setState({
          isRegistered: true
        });
      },
      // failure
      message => {
        this.props.registerUser(message);
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
      handler: this.passwordChangeHandler,
      type: "password"
    };

    const registerButtonSettings = {
      id: "register-button",
      text: "Register",
      type: "submit",
      handler: this.registerUserButtonHandler
    };

    if (this.state.isRegistered) {
      return <Redirect to="/login"></Redirect>;
    }

    return (
      <div className="common">
        <TextField settings={usernameSettings}></TextField>
        <TextField settings={emailSettings}></TextField>
        <TextField settings={passwordSettings}></TextField>
        <Button settings={registerButtonSettings}></Button>
      </div>
    );
  }
}

const setInfoMessage = (message) => {
  return (dispatch, getState) => {
    dispatch({
        type: INFOBAR_MESSAGE_UPDATE,
        payload: {
          message: message,
          type: "error",
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
    registerUser: () => dispatch(setInfoMessage),
    clearInfobar: () => dispatch(clearInfobar)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registraction);
