import React from "react";
import TodoEdit from "./TodoEdit";

class TodoEditContainer extends React.Component {

  render() {
    const { todoID } = this.props;

    return <TodoEdit todoID={todoID}></TodoEdit>;
  }
}

export default TodoEditContainer;
