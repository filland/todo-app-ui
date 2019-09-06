import React from "react";
import "../App.css";
import {Link} from 'react-router-dom';

class Todo extends React.Component {

  handleEditClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  todoTemplate = () => {
    const { todo, handleSetShowFullTodo } = this.props;

    if (todo.shouldShowFullTodo) {
      return (
        <div className="common todo-full" id={todo.id} onClick={() => handleSetShowFullTodo(todo.id, false)}>
          <p className="todo-title">{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.isDone ? "yes" : "no"}</p>
          <p>
            Created: <span id="createdDate"></span>
          </p>
          <p>Tags: tag1, tag2, tag3</p>
          <Link to={"/todo/"+todo.id} onClick = {this.handleEditClick}>Edit</Link>
        </div>
      );
    } else {
      return (
        <div className="common todo" id={todo.id} onClick={() => {handleSetShowFullTodo(todo.id, true);}}>
          <p className="todo-title">{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.isDone ? "yes" : "no"}</p>
        </div>
      );
    }
  };

  render() {
    return this.todoTemplate();
  }
}

export default Todo;
