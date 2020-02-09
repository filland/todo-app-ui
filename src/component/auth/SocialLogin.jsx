import React, { Component } from "react";
import { Redirect, withRouter, useLocation } from "react-router-dom";
import AuthService from "../../service/AuthService";

class SocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

/**
   * This function looks for the @param paramName
   * 
   * @param paramName name of the param in the query
   * @param url - url query params
   * @returns value of the @param paramName or null if not found
   */
  getQueryParamValueFromLocationSearch(paramName, url) {
    let map = {};
    url
      .slice(1)
      .split("?")
      .map(param => {
        let pair = param.split("=");
        map[pair[0]] = pair[1];
      });
    return map[paramName];
  }

  componentWillMount() {
    const { location } = this.props;

    let token = this.getQueryParamValueFromLocationSearch(
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

export default withRouter(SocialLogin);
