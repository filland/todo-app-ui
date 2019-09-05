import React from "react";

class TodoEditContainer extends React.Component {
  todoEditComponent = (todoID) => {
    return <div className="common todo-edit">editable todo {todoID}</div>;
  };

  render() {
    const { todoID } = this.props;

    return this.todoEditComponent(todoID);
  }
}

export default TodoEditContainer;
