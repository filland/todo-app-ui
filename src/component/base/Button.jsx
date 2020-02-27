import React from "react";
import "../../App.css";
import PropTypes from "prop-types";

class Button extends React.Component {
  handleButtonClick = e => {
    this.props.settings.handler(e);
  };

  render() {
    const { settings } = this.props;

    return (
      <button
        type={settings.type}
        id={settings.id}
        className="green-button"
        onClick={e => this.handleButtonClick(e)}
        disabled={settings.disabled || false}
      >
        {settings.text}
      </button>
    );
  }
}

Button.propTypes = {
  settings: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  })
};

export default Button;
