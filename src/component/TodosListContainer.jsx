import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import TodoService from "../service/TodoService";
import { clearInfobar } from "./InfobarContainer";
import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  MARK_TODO_AS_DONE_REQUEST,
  MARK_TODO_AS_DONE_SUCCESS
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

  handleDeleteTodoLinkClick = todoId => {
    this.props.deleteTodo(todoId);
  };

  handleTodoMarkAsDone = todoId => {
    this.props.markTodoAsDone(todoId);
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
              handleDeleteTodoLinkClick={this.handleDeleteTodoLinkClick}
              handleMarkAsDone = {this.handleTodoMarkAsDone}
            ></Todo>
          );
        });

      return <div>{todosTemplate}</div>;
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

const deleteTodo = todoId => {
  return dispatch => {
    dispatch({ type: DELETE_TODO_REQUEST });
    TodoService.deleteTodo(todoId, () => {
      dispatch({ type: DELETE_TODO_SUCCESS, payload: todoId });
    });
  };
};

const markTodoAsDone = todoId => {
  return dispatch => {
    dispatch({ type: MARK_TODO_AS_DONE_REQUEST });
    TodoService.markTodoAsDone(todoId, () => {
      dispatch({ type: MARK_TODO_AS_DONE_SUCCESS, payload: todoId });
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
    getTodos: () => dispatch(fetchTodos()),
    deleteTodo: todoId => dispatch(deleteTodo(todoId)),
    markTodoAsDone: todoId => dispatch(markTodoAsDone(todoId)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosListContainer);
