import React from "react";
import '../App.css'

class Todo extends React.Component {
  render() {
    const { todo } = this.props;

    return (
      <div className="todo">
        <p>{todo.title}</p>
        <p>{todo.description}</p>
        <p>This todo is done: {todo.isDone ? "yes" : "no"}</p>
      </div>
    );
  }
}

export default Todo;