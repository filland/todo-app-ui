import React from 'react';
import '../App.css';
import TextInput from './base/TextInput';

class TodoEdit extends React.Component {

    render() {

        const { todoID } = this.props;

        const titleSettingsInput = {
            id: 'todo-title',
            value: 'some value',
            label: 'Title',
            editable: false
        }

        const descSettingsInput = {
            id: 'todo-desc',
            value: 'some desc',
            label: 'Description',
            editable: false
        }

        return (
            <div className="common todo-edit">
                <p>Todo id: {todoID}</p>
                <TextInput settings={titleSettingsInput}></TextInput>
                <TextInput settings={descSettingsInput}></TextInput>
                <label>Done:
                    <input type="checkbox" id="todo-is-done"></input>
                </label>
            </div>);
    }

}

export default TodoEdit