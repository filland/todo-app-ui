import React from "react";
import { connect } from "react-redux";
import TodoEdit from "./TodoEdit";
import { UPDATE_TODO_REQUEST } from "../reducer/TodoReducer";

class TodoEditContainer extends React.Component {
  render() {
    const { todoID, todos, updateTodo } = this.props;

    let todo;

    todos.map(t => {
      if (todoID === t.id) {
        todo = t;
      }
    });

    return <TodoEdit todo={todo} updateTodo={updateTodo}></TodoEdit>;
  }
}

const updateTodo = todo => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TODO_REQUEST,
      payload: todo
    });
  };
};

const mapStateToProps = store => {
  return {
    todos: store.todos.todos,
    todoID: store.todos.editTodoID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTodo: todo => dispatch(updateTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoEditContainer);
