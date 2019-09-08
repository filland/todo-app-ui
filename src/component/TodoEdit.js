import React from "react";
import PropTypes from "prop-types";
import TextField from "./base/TextField";
import CheckboxField from "./base/CheckboxField";
import Button from "./base/Button";
import "../App.css";

class TodoEdit extends React.Component {
  constructor() {
    super();
    // for storing edited todo to send it up when Save button clicked
    this.state = {
      todo: {}
    };
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
    
  }

  static getDerivedStateFromProps(nextProps, prevState){
    console.log("getDerivedStateFromProps");
    return nextProps;
  }

  handleTitleChange = newTitle => {
    this.editedTodo = Object.assign({}, this.editedTodo, { title: newTitle });
  };

  handleDescChange = desc => {
    this.editedTodo = Object.assign({}, this.editedTodo, {
      description: desc
    });
  };

  saveTodo = () => {
    // this.props.updateTodo(this.editedTodo);
  };

  render() {
    const { todo } = this.props;

    const todoIDFieldSettings = {
      id: "todo-id" + todo.id,
      label: "Todo ID",
      value: todo.id,
      isView: true
    };

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

    const isDoneFieldSettings = {
      id: "todo-is-done" + todo.id,
      label: "Todo is done",
      value: todo.isDone,
      isView: true,
      handler: () => {}
    };

    const saveButtonSettings = {
      id: "todo-is-done" + todo.id,
      text: "Save",
      type: "submit",
      handler: this.saveTodo
    };

    return (
      <div className="common todo-edit">
        <TextField settings={todoIDFieldSettings}></TextField>
        <TextField settings={titleFieldSettings}></TextField>
        <TextField settings={descFieldSettings}></TextField>
        <CheckboxField settings={isDoneFieldSettings}></CheckboxField>
        <Button settings={saveButtonSettings}></Button>
      </div>
    );
  }
}

TodoEdit.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

export default TodoEdit;
