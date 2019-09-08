import React from "react";
import { connect } from "react-redux";
import TodoEdit from "./TodoEdit";
import TodoService from "../service/TodoService";
import {
  UPDATE_TODO_REQUEST,
} from "../reducer/TodoReducer";

class TodoEditContainer extends React.Component {

  constructor(){
    super();
    this.state={
      todo: {}
    }
  }

  componentWillMount() {
    this.setState({
      todo: this.fetchTodo(this.props.todoID)
    })
  }

  fetchTodo = (todoID) => {
    try {
      return TodoService.fetchOneTodo(this.props.todoID);;
    } catch (e) {
      console.log(e);
    }
}

  render() {
    const { updateTodo } = this.props;
    const {todo} = this.state;

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
    // todoID: store.todos.editTodoID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTodo: todo => dispatch(updateTodo(todo)),
    getTodos: () => dispatch(TodoService.fetchTodos),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoEditContainer);
