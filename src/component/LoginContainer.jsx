import React, { Component } from "react";
import { connect } from "react-redux";
import { INFOBAR_MESSAGE_UPDATE, LOGIN_SUCCESS } from "../reducer/TodoReducer";
import AuthService from "../service/AuthService";
import { clearInfobar } from "./InfobarContainer";
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
    const redirectTo = "/";

    const handleLogin = this.props.loginUser;

    return (
      <Login
        redirectTo={redirectTo}
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
      () => {
        if (AuthService.isLogged()) {
          dispatch(clearInfobar());
          dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          dispatch({
            type: INFOBAR_MESSAGE_UPDATE,
            payload: {
              message: "Not managed to login for some reason",
              type: "error",
              show: true
            }
          });
        }
      },
      () => {
        dispatch({
          type: INFOBAR_MESSAGE_UPDATE,
          payload: {
            message: "Username or password is wrong",
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
    redirectToRefferer: store.todos.login.redirectToRefferer
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
