import React from "react";
import "../App.css";

function Error(props) {
  const { message } = props;
  return (
    <div className="error">
      {message ? <p>{message}</p> : <p>Ups... Something broken...</p>}
    </div>
  );
}

export default Error;
