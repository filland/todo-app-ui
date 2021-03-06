import React from "react";
import "../../App.css";
import "./CheckboxField.css";

class CheckboxField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.settings.value
    };
  }

  handleCheck = e => {
    this.setState(
      {
        checked: !this.state.checked
      },
      () => {
        let flag = this.state.checked;
        this.props.settings.handler(flag);
      }
    );
  };

  prepareTemplate = editable => {
    const { settings } = this.props;
    return (
      <div className="common-input checkbox">
        <label className="text-input-label">{settings.label}</label>
        <input
          className="input"
          type="checkbox"
          placeholder={settings.placeholder}
          checked={this.state.checked}
          onChange={this.handleCheck}
          id={settings.id}
          disabled={editable}
        ></input>
      </div>
    );
  };

  render() {
    const { isView } = this.props.settings;

    if (isView) {
      return this.prepareTemplate(false);
    } else {
      return this.prepareTemplate(true);
    }
  }
}

export default CheckboxField;
