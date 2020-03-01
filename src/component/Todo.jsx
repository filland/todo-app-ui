import React from "react";
import "./Todo.css";
import PropTypes from "prop-types";
import TodoControlPanel from "./TodoControlPanel";

class Todo extends React.Component {
  handleDeleteTodoClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.props.handleDeleteTodoLinkClick(this.props.todo.id);
  };

  handleMarkAsDone = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.props.handleMarkAsDone(this.props.todo.id);
  }

  todoTemplate = () => {
    const { todo } = this.props;
    let settings = {
      id: todo.id,
      handleDeleteTodo: this.handleDeleteTodoClick,
      handleMarkAsDone: this.handleMarkAsDone
    };
    return (
      <div className="common todo" id={todo.id}>
        <p className="todo-title">{todo.title}</p>
        <p>{todo.description}</p>
        {/* <p>This todo is done: {todo.done ? "yes" : "no"}</p> */}
        <TodoControlPanel settings={settings}></TodoControlPanel>
      </div>
    );
  };

  render() {
    return this.todoTemplate();
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired
};

export default Todo;
