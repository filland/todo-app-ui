import React, { Component } from "react";
import "./Textarea.css";

class Textarea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.settings.value
    };
  }

  handleTextareaChange = e => {
    this.setState(
      {
        value: e.currentTarget.value
      },
      () => {
        this.props.settings.handler(this.state.value);
      }
    );
  };

  render() {
    let settings = this.props.settings;

    let rowsNumber = settings.value.split("\n").length;
    if (rowsNumber < 500) {
      settings.styles = {
        height: rowsNumber * 35
      };
    }

    return (
      <div className="textarea-container">
        <label className="textarea-label">{settings.label}</label>
        <textarea
          className="textarea-input"
          style={settings.styles ? settings.styles : {}}
          placeholder={settings.placeholder}
          value={this.state.value}
          onChange={this.handleTextareaChange}
          id={settings.id}
        ></textarea>
      </div>
    );
  }
}

export default Textarea;
