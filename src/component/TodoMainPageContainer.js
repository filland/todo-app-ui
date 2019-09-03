import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";

import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS } from "../reducer/TodoReducer";

class TodoMainPageContainer extends React.Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const { todos } = this.props.todos;
    // console.log(todos);
    console.log(this.props);

    if (todos) {
      const todosTemplate = todos.map(todo => {
        return <Todo todo={todo}></Todo>;
      });

      return todosTemplate;
    } else {
      return <p>You did not add any todos.</p>;
    }
  }
}

const getTodos = () => {
  return dispatch => {
    console.log("getTodos called");

    const todos = [
      {
        title: "JUST DO IT",
        description: "sode description",
        isDone: false
      }
    ];

    dispatch({
      type: GET_TODOS_REQUEST,
      areLoading: true
    });

    setTimeout(() => {
      dispatch(
        {
          type: GET_TODOS_SUCCESS,
          payload: todos
        },
        3000
      );
    });
  };
};

const getFullTodoInfo = todoID => {
  console.log("get full doto info called");

  return dispatch => {
    dispatch({
      type: GET_TODOS_REQUEST,
      areLoading: true
    });
  };
};

const mapStateToProps = store => {
  return {
    todos: store.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTodoInfo: todoID => dispatch(getFullTodoInfo(todoID)),
    getTodos: () => dispatch(getTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoMainPageContainer);
