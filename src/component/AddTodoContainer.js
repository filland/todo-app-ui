import React from "react";
import AddTodo from "./AddTodo";
import "../App.css";
import { connect } from "react-redux";
import {ADD_TODO_REQUEST, ADD_TODO_SUCCESS} from '../reducer/TodoReducer'

class AddTodoContainer extends React.Component {
  addTodo = (title, desc) => {
      this.props.addTodo(title, desc);
  };

  render() {
    return <AddTodo addTodo={this.addTodo}></AddTodo>;
  }
}

const addTodo = (title, desc) => {
    return dispatch => {
        dispatch({
            type: ADD_TODO_REQUEST
        })

        let todo = {
            id: null,
            title: title,
            description: desc,
            isDone: false,
            shouldShowFullTodo: false
        }

        dispatch({
            type: ADD_TODO_SUCCESS,
            payload: todo
        })
    }
}

const mapStateToProps = store => {
  return {
      
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title, desc) => dispatch(addTodo(title, desc))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoContainer);
