import React from "react";
import "../../App.css";
import "./TextField.css";

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.settings.value
    };
  }

  handleTextFieldChange = e => {
    this.setState(
      {
        value: e.currentTarget.value
      },
      () => {
        this.props.settings.handler(this.state.value);
      }
    );
  };

  viewTemplate = () => {
    const { settings } = this.props;
    return (
      <div className="text-input-div">
        <span className="text-input-label">{settings.label}</span>
        {settings.value && (
          <span className="text-value-value" id={settings.id}>
            {this.state.value}
          </span>
        )}
      </div>
    );
  };

  editTemplate = () => {
    const { settings } = this.props;
    return (
      <div className="edit-input-div">
        <label className="input-label">{settings.label}</label>
        <input
          type={settings.type || "text"}
          className="input"
          placeholder={settings.placeholder}
          value={this.state.value}
          onChange={this.handleTextFieldChange}
          id={settings.id}
        ></input>
      </div>
    );
  };

  render() {
    const { isView } = this.props.settings;

    if (isView) {
      return this.viewTemplate();
    } else {
      return this.editTemplate();
    }
  }
}

export default TextField;
