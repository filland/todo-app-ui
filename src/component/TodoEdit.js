import React from "react";
import PropTypes from "prop-types";
import TextField from "./base/TextField";
import CheckboxField from "./base/CheckboxField";
import Button from "./base/Button";
import "../App.css";

class TodoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo,
      newTodo: Object.assign({}, props.todo)
    };
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
  }

  handleTitleChange = newTitle => {
    this.setState({
      newTodo: Object.assign({}, this.state.newTodo, { title: newTitle })
    });
  };

  handleDescChange = desc => {
    this.setState({
        newTodo: Object.assign({}, this.state.newTodo, {description: desc})
      });
  };

  handleIsDoneChange = isDone => {
    this.setState({
      newTodo: Object.assign({}, this.state.newTodo, {isDone: isDone})
    });
  }

  saveTodo = () => {
    this.props.updateTodo(this.state.newTodo);
  };

  render() {
    const { todo } = this.props;

    // const todoIDFieldSettings = {
    //   id: "todo-id" + todo.id,
    //   label: "Todo ID",
    //   value: todo.id,
    //   isView: true
    // };

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
      handler: this.handleIsDoneChange
    };

    const saveButtonSettings = {
      id: "todo-is-done" + todo.id,
      text: "Save",
      type: "submit",
      handler: this.saveTodo
    };

    return (
      <div className="common todo-edit">
        {/* <TextField settings={todoIDFieldSettings}></TextField> */}
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
