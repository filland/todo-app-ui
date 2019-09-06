import React from 'react';
import '../../App.css';

class TextInput extends React.Component {
    render() {

        const { settings } = this.props;

        return (
            <div className="common-input input-text">
                <label className="input-text-label">{settings.label}</label>
                <input type="text" placeholder={settings.placeholder} value={settings.value} id={settings.id} disabled={!settings.editable}></input>
            </div>
        );
    }
}

export default TextInput