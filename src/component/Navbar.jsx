import React from "react";
import "../App.css";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AuthService from "../service/AuthService";

class Navbar extends React.Component {
  render() {
    return (
      <div className="common-menu navbar">
        <Link className="navbar-logo" to="/">
          <i className="fas fa-check-square"></i>
          <span>TodoApp</span>
        </Link>
        {/* <Link className="navbar-link" to="/login">Log in</Link> */}
        {AuthService.isLogged() ? (
          <>
            <Link className="navbar-link" to="/">
              Main
            </Link>
            <Link className="navbar-link" to="/logout">
              Logout
            </Link>
            <Link className="navbar-link profile" to="/profile">
              <i className="far fa-user-circle"></i>
            </Link>
          </>
        ) : null}
      </div>
    );
  }
}

export default connect()(Navbar);
