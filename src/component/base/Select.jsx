import React, { Component } from "react";
import "./Select.css";

class Select extends Component {
  constructor(props) {
    super(props);
  }

  handleClickOnSelectIcon = e => {
    this.selectElement.style.display = "block";
    this.selectIcon.firstChild.style.backgroundColor=this.props.settings.onHoverColor;
  };

  handleCloseSelect = e => {
    if (
      !this.selectIcon.parentElement.contains(e.target)
    ) {
      this.selectElement.style.display = "none";
      this.selectIcon.firstChild.style.backgroundColor="";
    }
  };

  handleItemClick = e => {
    this.selectElement.style.display = "none";
    this.selectIcon.style.backgroundColor="";
    this.selectIcon.firstChild.style.backgroundColor="";
  }

  componentDidMount() {

    this.selectElement = document.getElementById(this.props.settings.selectId);
    this.selectIcon = document.getElementById(this.props.settings.selectIconId);

    // listen to clicks on the select
    this.selectIcon.parentElement.addEventListener("click", this.handleClickOnSelectIcon);
    // listen to clicks not on the select to close it
    document.addEventListener("click", this.handleCloseSelect);
  }

  componentWillUnmount() {
    // remove listeners
    this.selectIcon.parentElement.removeEventListener("click", this.handleClickOnSelectIcon);
    document.removeEventListener("click", this.handleCloseSelect);
  }

  render() {
    let { settings } = this.props;

    let selectTemplate = settings.items.map((item, index) => {
      return (
        <div key={index} className="select-item" onClick={(e) => {
          item.handler(e);
          this.handleItemClick(e);
          }}>
          {item.text}
        </div>
      );
    });

    return (
      <div className="select-container">
        <div className="select-icon" id={settings.selectIconId}>
          {settings.selectIcon}
        </div>
        <div className="select" id={settings.selectId}>
          {selectTemplate}
        </div>
      </div>
    );
  }
}

export default Select;
