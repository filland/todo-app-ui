import React from "react";
import TodoAdd from "./TodoAdd";
import "../App.css";
import { connect } from "react-redux";
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS } from "../reducer/TodoReducer";
import TodoService from "../service/TodoService";

class TodoAddContainer extends React.Component {
  addTodo = (title, desc) => {
    this.props.addTodo(title, desc);
  };

  render() {
    return <TodoAdd addTodo={this.addTodo}></TodoAdd>;
  }
}

const addTodo = (title, desc) => {
  return dispatch => {
    dispatch({
      type: ADD_TODO_REQUEST
    });

    let todo = {
      id: null,
      title: title,
      description: desc,
      done: false,
      shouldShowFullTodo: false
    };

    TodoService.addTodo(todo, todo => {
      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: todo
      });
    });
  };
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title, desc) => dispatch(addTodo(title, desc))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoAddContainer);
