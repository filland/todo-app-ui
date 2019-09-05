import React from "react";
import '../App.css'

class Todo extends React.Component {

  todoTemplate = () => {

    const { todo, handleShowFullTodo } = this.props;

    if (todo.isShowFull) {

      return (<div className= 'todo todo-full'>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.isDone ? "yes" : "no"}</p>
          <p>Created: <span id="createdDate"></span></p>
          <p>Tags: tag1, tag2, tag3</p>
      </div>);

    } else {

      return (
        <div className="todo" id={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <p>This todo is done: {todo.isDone ? "yes" : "no"}</p>
          <a onClick={() => { handleShowFullTodo(todo.id) }} href='#showFullTodo' id='showMoreUrl'>Show more</a>
        </div>
      )

    }

  }

  render() {
    return this.todoTemplate();
  }
}

export default Todo;