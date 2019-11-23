import React from "react";
import "../App.css";
import { Redirect } from "react-router-dom";

function Logout() {
  localStorage.removeItem("authenticated");

  return <Redirect to="/"></Redirect>;
}

export default Logout;
