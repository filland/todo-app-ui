import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { connect } from "react-redux";

class BreadcrumbsContainer extends React.Component {
  render() {
    const links = [
      { id: 1, text: "Main", url: "/" },
      // { id: 2, text: "todo-edit", url: "/todos" },
      // { id: 3, text: "something", url: "/todos" },
    ];

    return <Breadcrumbs links = {links}></Breadcrumbs>;
  }
}

export default connect()(BreadcrumbsContainer);
