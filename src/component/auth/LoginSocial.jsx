import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { getQueryParamValueFromLocationSearch } from "../../util/UrlUtils";

class LoginSocial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false
    };
  }

  componentDidMount() {
    const { location } = this.props;

    let token = getQueryParamValueFromLocationSearch(
      "token",
      location.search
    );
    AuthService.setJwtToken(token);
    if (AuthService.isLogged()) {
      this.setState({isLogged: true});
    }
  }

  render() {

    if (this.state.isLogged) {
      return <Redirect to="/"></Redirect>;
    }

    return <div>Please, wait while we are authenticationing you...</div>;
  }
}

export default withRouter(LoginSocial);
