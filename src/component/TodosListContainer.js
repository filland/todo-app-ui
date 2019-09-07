import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";

import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  SHOW_FULL_TODO_SUCCESS,
  SHOW_FULL_TODO_REQUEST,
  SET_TODO_ID_FOR_UPDATE
} from "../reducer/TodoReducer";
import AddTodo from "./AddTodo";

class TodosListContainer extends React.Component {
  componentDidMount() {
    this.props.getTodos();
  }

  setShowFullTodo = (todoID, isShown) => {
    this.props.setShowFullTodo(todoID, isShown);
  };

  handleTodoEditLinkClick = (todoID) => {
      this.props.setTodoIDForEdit(todoID);
  };

  render() {
    const { todos } = this.props.todos;

    if (todos) {
      const todosTemplate = todos.map((todo, index) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleSetShowFullTodo={this.setShowFullTodo}
            handleEditLinkClick={this.handleTodoEditLinkClick}
          ></Todo>
        );
      });

      console.log(todosTemplate);
      

      return todosTemplate;
    } else {
      return <p>You did not add any todos.</p>;
    }
  }
}

const getTodos = () => {
  return dispatch => {
    const todos = [
      {
        id: 1,
        title: "JUST DO IT",
        description: "sode description",
        isDone: false,
        shouldShowFullTodo: false
      },
      {
        id: 2,
        title: "JUST DO IT",
        description: "sode description",
        isDone: false,
        shouldShowFullTodo: false
      },
      {
        id: 3,
        title: "JUST DO IT",
        description: "sode description",
        isDone: false,
        shouldShowFullTodo: false
      }
    ];

    dispatch({
      type: GET_TODOS_REQUEST
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

const setShowFullTodo = (todoID, isShown) => {
  return (dispatch, getState) => {
    dispatch({ type: SHOW_FULL_TODO_REQUEST });

    let todos = getState().todos.todos;

    todos.forEach(todo => {
      // only one todo can be fully shown at the time
      todo.shouldShowFullTodo = false;

      if (todo.id === todoID) {
        todo.shouldShowFullTodo = isShown;
      }
    });

    dispatch({ type: SHOW_FULL_TODO_SUCCESS, payload: todos });
  };
};

const setTodoIDForEdit = (todoID) => {
  return (dispatch) => {
    dispatch({
      type: SET_TODO_ID_FOR_UPDATE,
      payload: todoID
    })
  }
}

const mapStateToProps = store => {
  return {
    todos: store.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowFullTodo: (todoID, isShown) =>
      dispatch(setShowFullTodo(todoID, isShown)),
    getTodos: () => dispatch(getTodos()),
    setTodoIDForEdit: (todoID) => dispatch(setTodoIDForEdit(todoID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosListContainer);
