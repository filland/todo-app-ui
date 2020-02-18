import React from "react";
import "./Infobar.css";
import { Link } from "react-router-dom";

function Infobar(props) {
  const { message, type, show } = props.settings.message;

  if (show === true) {

    switch (type) {
      case "info":
        return (
          <div className={"common infobar info-message"}>
            <span>{message}</span>
            <Link className="infobar-close-info" onClick={props.settings.close}>x</Link> 
          </div>
        )
      case "error":
        return (
          <div className={"common infobar error-message"}>
            <span>{message}</span>
            <Link href="#" className="infobar-close-error" onClick={props.settings.close}>x</Link> 
          </div>
        )
    }
  } else {
    return null;
  }
}

export default Infobar;
