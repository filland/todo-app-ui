import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Todo extends React.Component {
  handleEditClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.props.handleEditLinkClick(this.props.todo.id);
  };

  handleDeleteTodoClick = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.props.handleDeleteTodoLinkClick(this.props.todo.id);
  }

  todoTemplate = () => {
    const { todo, handleSetShowFullTodo } = this.props;

    if (todo.shouldShowFullTodo) {
      return (
        <div
          className="common todo-full"
          id={todo.id}
          onClick={() => handleSetShowFullTodo(todo.id, false)}
        >
          <p className="todo-title">{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.done ? "yes" : "no"}</p>
          <p>
            Created: <span id="createdDate"></span>
          </p>
          <p>Tags: tag1, tag2, tag3</p>
          <Link to={"/todo/" + todo.id} onClick={this.handleEditClick} className="link">
            Edit
          </Link>
          <Link to="#" onClick={this.handleDeleteTodoClick} className="link">Delete</Link>
        </div>
      );
    } else {
      return (
        <div
          className="common todo"
          id={todo.id}
          onClick={() => {
            handleSetShowFullTodo(todo.id, true);
          }}
        >
          <p className="todo-title">{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.done ? "yes" : "no"}</p>
        </div>
      );
    }
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
}

export default Todo;
