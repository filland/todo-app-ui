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
  MARK_TODO_AS_DONE_SUCCESS,
  SET_TODOS_PAGENATION_SUCCESS
} from "../reducer/TodoReducer";
import Pagination from "./base/Pagination";

/**
 * Pageable todo list
 */
class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // use default page and page size
    this.props.fetchTodos();
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
              handleMarkAsDone={this.handleTodoMarkAsDone}
            ></Todo>
          );
        });

      let settings = {
        current: this.props.todos.pagination.current,
        total: this.props.todos.pagination.total,
        updateCurrentPageHandler: page => {
          this.props.fetchTodos(page);
        }
      };

      return (
        <>
          <div>{todosTemplate}</div>
          <Pagination settings={settings}></Pagination>
        </>
      );
    } else {
      return (
        <div className="common">
          You did not add any todos or server is not available
        </div>
      );
    }
  }
}

const fetchTodos = (page, size) => {
  return dispatch => {
    dispatch({
      type: GET_TODOS_REQUEST
    });

    TodoService.fetchTodos(page, size, fetchTodosRS => {
      fetchTodosRS.list.sort(function(a, b) {
        return a.id > b.id ? -1 : b.id > a.id ? 1 : 0;
      });

      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: fetchTodosRS.list
      });

      dispatch({
        type: SET_TODOS_PAGENATION_SUCCESS,
        payload: {
          current: fetchTodosRS.page,
          total: fetchTodosRS.total
        }
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
    fetchTodos: (pageNumber, pageSize) =>
      dispatch(fetchTodos(pageNumber, pageSize)),
    deleteTodo: todoId => dispatch(deleteTodo(todoId)),
    markTodoAsDone: todoId => dispatch(markTodoAsDone(todoId)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
