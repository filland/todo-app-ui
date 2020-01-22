import React from "react";
import "../App.css";
import { Redirect } from "react-router-dom";
import AuthService from "../service/AuthService";
import { connect } from "react-redux";
import { LOGOUT_SUCCESS } from "../reducer/TodoReducer";

class Logout extends React.Component {
 
  render() { 
    AuthService.logout();
    this.props.logoutUser();
    return <Redirect to="/"></Redirect>;
  }
}
 
const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
