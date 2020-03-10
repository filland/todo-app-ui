import React, { Component } from "react";
import "./Select.css";

class Select extends Component {
  handleClickOnSelectIcon = e => {
    document.getElementById(this.props.selectId).style.display = "block";
  };

  handleCloseSelect = e => {
    if (
      !document
        .getElementById(this.props.selectIconId)
        .parentElement.contains(e.target)
    ) {
      document.getElementById(this.props.selectId).style.display = "none";
    }
  };

  componentDidMount() {
    // listen to clicks on the select
    document
      .getElementById(this.props.selectIconId)
      .parentElement.addEventListener("click", this.handleClickOnSelectIcon);

    // listen to clicks not on the select to close it
    document.addEventListener("click", this.handleCloseSelect);
  }

  componentWillUnmount() {
    // remove listeners
    document
      .getElementById(this.props.selectIconId)
      .parentElement.removeEventListener("click", this.handleClickOnSelectIcon);
    document.removeEventListener("click", this.handleCloseSelect);
  }

  render() {
    let { items } = this.props;

    let selectTemplate = items.map((item, index) => {
      return (
        <div key={index} className="select-item" onClick={item.handler}>
          {item.text}
        </div>
      );
    });

    return (
      <div className="select-container">
        <div className="select-icon" id={this.props.selectIconId}>
          {this.props.selectIcon}
        </div>
        <div className="select" id={this.props.selectId}>
          {selectTemplate}
        </div>
      </div>
    );
  }
}

export default Select;
