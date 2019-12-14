import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import TodoService from "../service/TodoService";

import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  SHOW_FULL_TODO_SUCCESS,
  SHOW_FULL_TODO_REQUEST,
  SET_TODO_ID_FOR_UPDATE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS
} from "../reducer/TodoReducer";

class TodosListContainer extends React.Component {
  componentDidMount() {
    this.props.getTodos();
  }

  componentDidUpdate() {
    if (this.props.todos.length === 0) {
      this.props.getTodos();
    }
  }

  setShowFullTodo = (todoID, isShown) => {
    this.props.setShowFullTodo(todoID, isShown);
  };

  handleTodoEditLinkClick = todoID => {
    this.props.setTodoIDForEdit(todoID);
  };

  handleDeleteTodoLinkClick = todoID => {
    this.props.deleteTodo(todoID);
  };

  render() {
    const { todos } = this.props.todos;

    if (todos) {
      const todosTemplate = todos
        .filter(todo => todo.active === true)
        .map((todo, index) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              handleSetShowFullTodo={this.setShowFullTodo}
              handleEditLinkClick={this.handleTodoEditLinkClick}
              handleDeleteTodoLinkClick={this.handleDeleteTodoLinkClick}
            ></Todo>
          );
        });

      // console.log(todosTemplate);

      return todosTemplate;
    } else {
      return <p>You did not add any todos.</p>;
    }
  }
}

const fetchTodos = () => {
  return dispatch => {
    dispatch({
      type: GET_TODOS_REQUEST
    });

    TodoService.fetchTodos(1, 40, todos => {
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: todos
      });
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

const setTodoIDForEdit = todoID => {
  return dispatch => {
    dispatch({
      type: SET_TODO_ID_FOR_UPDATE,
      payload: todoID
    });
  };
};

const deleteTodo = todoID => {
  return dispatch => {
    dispatch({ type: DELETE_TODO_REQUEST });

    TodoService.deleteTodo(todoID, () => {
      dispatch({ type: DELETE_TODO_SUCCESS, payload: todoID });
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
    setShowFullTodo: (todoID, isShown) =>
      dispatch(setShowFullTodo(todoID, isShown)),
    getTodos: () => dispatch(fetchTodos()),
    setTodoIDForEdit: todoID => dispatch(setTodoIDForEdit(todoID)),
    deleteTodo: todoID => dispatch(deleteTodo(todoID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListContainer);
