import React from "react";
import "../App.css";
import {
  BrowserRouter as 
  Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import AuthService from '../service/AuthService'

class Navbar extends React.Component {
  render() {
    return (<div className="common-menu navbar">
        <Link className="navbar-link" to="/">Main</Link>
        {/* <Link className="navbar-link" to="/login">Log in</Link> */}
        {AuthService.isLogged() ? <Link className="navbar-link" to="/logout">Logout</Link> : null}
    </div>);
  }
}

export default connect()(Navbar);
