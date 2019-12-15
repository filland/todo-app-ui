import React from "react";
import TodoAdd from "./TodoAdd";
import "../App.css";
import { connect } from "react-redux";
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, INFOBAR_MESSAGE_UPDATE } from "../reducer/TodoReducer";
import TodoService from "../service/TodoService";
import { clearInfobar } from "./InfobarContainer";

class TodoAddContainer extends React.Component {

  addTodo = (title, desc) => {
    this.props.addTodo(title, desc);
  };

  clearInfobar = () => {
    this.props.clearInfobar();
  }

  render() {

    this.clearInfobar();

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
      active: true,
      shouldShowFullTodo: false
    };

    TodoService.addTodo(todo, todo => {
      dispatch({
        type: ADD_TODO_SUCCESS,
        payload: todo
      });
      dispatch({
        type: INFOBAR_MESSAGE_UPDATE,
        payload: {
          message: "Todo was added.",
          type: "info",
          show: true
        }
      });
    });
  };
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title, desc) => dispatch(addTodo(title, desc)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoAddContainer);
