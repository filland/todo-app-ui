import React from "react";
import "./Infobar.css";
import { Link } from "react-router-dom";

function Infobar(props) {
  const { message, type, show } = props.settings.message;

  if (show === true) {
    if (type === "info") {
      return (
        <div className={"common infobar info-message"}>
          <span>{message}</span>
          <Link
            className="infobar-close-info"
            to="#"
            onClick={props.settings.close}>
            x
          </Link>
        </div>
      );
    } else if (type === "error") {
      return (
        <div className={"common infobar error-message"}>
          <span>{message}</span>
          <Link
            className="infobar-close-error"
            to="#"
            onClick={props.settings.close}>
            x
          </Link>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default Infobar;
