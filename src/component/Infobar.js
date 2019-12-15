import React from "react";

function Infobar(props) {
  const { message, type, show } = props.settings;

  if (show === true) {
    let messageTypeClass;

    switch (type) {
      case "info":
        messageTypeClass = "info-message";
        break;
      case "error":
        messageTypeClass = "error-message";
        break;
      default:
        messageTypeClass = "error-message";
    }

    return <div className={"common " + messageTypeClass}>{message}</div>;
  } else {
    return null;
  }
}

export default Infobar;
