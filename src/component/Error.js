import React from "react";
import "../App.css";

class Error extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div className="error common">
        {message ? <p>{message}</p> : <p>Ups... Something broken...</p>}
      </div>
    );
  }
}

export default Error;
