import React from "react";

import "../App.css";

function Loading(props) {
  let { componentName } = props;
  return <div className="common">{componentName} is loading...</div>;
}

export default Loading;
