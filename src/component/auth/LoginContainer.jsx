import React, { Component } from "react";
import { connect } from "react-redux";
import { LOGIN_SUCCESS } from "../../reducer/AuthReducer";
import { INFOBAR_MESSAGE_UPDATE } from "../../reducer/InfobarReducer";
import AuthService from "../../service/AuthService";
import { clearInfobar } from "../InfobarContainer";
import Login from "./Login";

class LoginContainer extends Component {
  componentWillUnmount() {
    this.props.clearInfobar();
  }

  handleLogin(username, password) {
    this.props.loginUser(username, password);
  }

  render() {
    const redirectToRefferer = this.props.redirectToRefferer;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const handleLogin = this.props.loginUser;

    return (
      <Login
        redirectTo={from}
        handleLogin={handleLogin}
        redirectToRefferer={redirectToRefferer}
      />
    );
  }
}

const handleLoginUser = (username, password) => {
  return dispatch => {
    AuthService.login(
      username,
      password,
      response => {
        if (AuthService.isLogged()) {
          dispatch(clearInfobar());
          dispatch({
            type: LOGIN_SUCCESS
          });
        } else if (response.status === 403 || response.status === 400) {
          dispatch({
            type: INFOBAR_MESSAGE_UPDATE,
            payload: {
              message: "Username or password is wrong",
              type: "error",
              show: true
            }
          });
        }
      },
      e => {
        dispatch({
          type: INFOBAR_MESSAGE_UPDATE,
          payload: {
            message: "Server is not available. Please, try later",
            type: "error",
            show: true
          }
        });
      }
    );
  };
};

const mapStateToProps = store => {
  return {
    redirectToRefferer: store.auth.login.redirectToRefferer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, password) =>
      dispatch(handleLoginUser(username, password)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
