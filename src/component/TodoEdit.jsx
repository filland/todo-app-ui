import React from "react";
import PropTypes from "prop-types";
import TextField from "./base/TextField";
import CheckboxField from "./base/CheckboxField";
import Button from "./base/Button";
import "../App.css";
import "./TodoEdit.css";
import Textarea from "./base/Textarea";

class TodoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo,
      newTodo: Object.assign({}, props.todo)
    };
  }

  handleTitleChange = newTitle => {
    this.setState({
      newTodo: Object.assign({}, this.state.newTodo, { title: newTitle })
    });
  };

  handleDescChange = desc => {
    this.setState({
      newTodo: Object.assign({}, this.state.newTodo, { description: desc })
    });
  };

  handleDoneChange = done => {
    this.setState({
      newTodo: Object.assign({}, this.state.newTodo, { done: done })
    });
  };

  saveTodo = () => {
    this.props.updateTodo(this.state.newTodo);
  };

  render() {
    const { todo } = this.props;

    const titleFieldSettings = {
      id: "todo-title" + todo.id,
      label: "Title",
      value: todo.title,
      isView: false,
      handler: this.handleTitleChange
    };

    const descFieldSettings = {
      id: "todo-desc" + todo.id,
      label: "Description",
      value: todo.description,
      isView: false,
      handler: this.handleDescChange
    };

    const doneFieldSettings = {
      id: "todo-is-done" + todo.id,
      label: "Todo is done",
      value: todo.done,
      isView: true,
      handler: this.handleDoneChange
    };

    const saveButtonSettings = {
      id: "todo-is-done" + todo.id,
      text: "Save",
      type: "submit",
      handler: this.saveTodo
    };

    return (
      <div className="common todo-edit">
        <TextField settings={titleFieldSettings}></TextField>
        {/* <TextField settings={descFieldSettings}></TextField> */}
        <Textarea settings={descFieldSettings}></Textarea>
        <div className="checkbox-and-button">
          <CheckboxField settings={doneFieldSettings}></CheckboxField>
          <div>
            <Button settings={saveButtonSettings}></Button>
          </div>
        </div>
      </div>
    );
  }
}

TodoEdit.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

export default TodoEdit;
