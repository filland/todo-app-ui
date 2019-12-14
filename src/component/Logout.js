import React from "react";
import "../App.css";
import { Redirect } from "react-router-dom";
import AuthService from "../service/AuthService";

function Logout() {
  AuthService.logout();

  return <Redirect to="/"></Redirect>;
}

export default Logout;
