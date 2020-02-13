import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { getQueryParamValueFromLocationSearch } from "../../util/UrlUtils";

class LoginSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { location } = this.props;

    let token = getQueryParamValueFromLocationSearch(
      "token",
      location.search
    );
    AuthService.setJwtToken(token);
  }

  render() {

    if (AuthService.isLogged()) {
      return <Redirect to="/"></Redirect>;
    }

    return <div>Please, wait while we are authenticationing you...</div>;
  }
}

export default withRouter(LoginSocial);
