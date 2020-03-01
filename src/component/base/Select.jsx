import React, { Component } from "react";
import "./Select.css";

class Select extends Component {
  handleClickOnParent = e => {
    document.getElementById(this.props.id).style.display = "block";
  };

  handleCloseSelect = e => {
    if (
      !document
        .getElementById(this.props.parentId)
        .parentElement.contains(e.target)
    ) {
      document.getElementById(this.props.id).style.display = "none";
    }
  };

  componentDidMount() {
    // listen to clicks on the select
    document
      .getElementById(this.props.parentId)
      .parentElement.addEventListener("click", this.handleClickOnParent);

    // listen to clicks no on the select to close it
    document.body.addEventListener("click", this.handleCloseSelect);
  }

  componentWillUnmount() {
    // remove listeners
    document
      .getElementById(this.props.parentId)
      .parentElement.removeEventListener("click", this.handleClickOnParent);
    document.body.removeEventListener("click", this.handleCloseSelect);
  }

  render() {
    let { items, id } = this.props;

    let selectTemplate = items.map((item, index) => {
      return (
        <div key={index} className="select-item" onClick={item.handler}>
          {item.text}
        </div>
      );
    });

    return (
      <div id={id} className="select">
        {selectTemplate}
      </div>
    );
  }
}

export default Select;
