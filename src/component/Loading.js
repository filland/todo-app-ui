import React from "react";

import "../App.css";

function Loading(props) {
  let { message } = props;
  return <div className="common">{message}</div>;
}

export default Loading;
