import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { LOGOUT_SUCCESS } from "../../reducer/AuthReducer";
import "../../App.css";

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
