import React, { Component } from "react";
import AuthService from "../../service/AuthService";
import { withRouter } from "react-router-dom";
import { getQueryParamValueFromLocationSearch } from "../../util/UrlUtils";

class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCompleted: false,
      confirmationResult: null
    };
  }

  componentDidMount() {
    this.confirmRegistration();
  }

  confirmRegistration() {
    const { location } = this.props;
    let confirmationCode = getQueryParamValueFromLocationSearch(
      "token",
      location.search
    );
    AuthService.confirmRegistration(
      confirmationCode,
      () => {
        this.setState({
          confirmationCompleted: true,
          confirmationResult: "success"
        });
      },
      () => {
        this.setState({
          confirmationCompleted: true,
          confirmationResult: "error"
        });
      }
    );
  }

  render() {
    if (this.state.confirmationCompleted) {
      if (this.state.confirmationResult === "success") {
        setTimeout(() => {
          this.props.history.push("/");
        }, 3000);
      } else {
        return <div>We were not able to complete your registration.</div>;
      }
    }

    return (
      <div className="common">
        Please, wait until we completing your registration
      </div>
    );
  }
}

export default withRouter(EmailConfirmation);
