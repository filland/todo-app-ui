import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import TodoService from "../service/TodoService";
import { clearInfobar } from "./InfobarContainer";
import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  SHOW_FULL_TODO_SUCCESS,
  SHOW_FULL_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS
} from "../reducer/TodoReducer";

class TodosListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this.props.getTodos();
  }

  componentDidUpdate() {
    if (this.props.todos.length === 0) {
      this.props.getTodos();
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  setShowFullTodo = (todoId, isShown) => {
    this.props.setShowFullTodo(todoId, isShown);
  };

  handleDeleteTodoLinkClick = todoId => {
    this.props.deleteTodo(todoId);
  };

  cleanup = () => {
    this.props.clearInfobar();
  };

  render() {
    const { todos } = this.props.todos;

    if (todos && todos.length !== 0) {
      const todosTemplate = todos
        .filter(todo => todo.active === true)
        .map((todo, index) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              handleSetShowFullTodo={this.setShowFullTodo}
              handleDeleteTodoLinkClick={this.handleDeleteTodoLinkClick}
            ></Todo>
          );
        });

      return (<div>
        {todosTemplate}
      </div>);
    } else {
      return (
        <div className="common">
          You did not add any todos or server is not available
        </div>
      );
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

const setShowFullTodo = (todoId, isShown) => {
  return (dispatch, getState) => {
    dispatch({ type: SHOW_FULL_TODO_REQUEST });

    let todos = getState().todos.todos;

    todos.forEach(todo => {
      // only one todo can be fully shown at the time
      todo.shouldShowFullTodo = false;

      if (todo.id === todoId) {
        todo.shouldShowFullTodo = isShown;
      }
    });

    dispatch({ type: SHOW_FULL_TODO_SUCCESS, payload: todos });
  };
};

const deleteTodo = todoId => {
  return dispatch => {
    dispatch({ type: DELETE_TODO_REQUEST });

    TodoService.deleteTodo(todoId, () => {
      dispatch({ type: DELETE_TODO_SUCCESS, payload: todoId });
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
    setShowFullTodo: (todoId, isShown) =>
      dispatch(setShowFullTodo(todoId, isShown)),
    getTodos: () => dispatch(fetchTodos()),
    deleteTodo: todoId => dispatch(deleteTodo(todoId)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListContainer);
