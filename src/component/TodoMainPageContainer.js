import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";

import { GET_TODOS_REQUEST, GET_TODOS_SUCCESS, SHOW_FULL_TODO_SUCCESS, SHOW_FULL_TODO_REQUEST } from "../reducer/TodoReducer";

class TodoMainPageContainer extends React.Component {
  componentDidMount() {
    this.props.getTodos();
  }

  handleGetFullTodo = (todoID) => {
    console.log("show full todo for todoID ="+todoID);
    this.props.showFullTodo(todoID);
  }

  render() {
    const { todos, showFullTodoID } = this.props.todos;

    console.log(this.props);

    if (todos) {
      const todosTemplate = todos.map(todo => {

        if(todo.id === showFullTodoID){
          todo.shouldShowFullTodo = true;
        }

        return <Todo key={todo.id} todo={todo} handleShowFullTodo={this.handleShowFullTodo}></Todo>;
      });

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

const showFullTodo = todoID => {
  return dispatch => { 
    
    dispatch({type: SHOW_FULL_TODO_REQUEST});

    let fullTodo = {
      
    }

    setTimeout(() => {
      dispatch({type: SHOW_FULL_TODO_SUCCESS, payload: todoID})
    }, 3000);
  }
};

const mapStateToProps = store => {
  return {
    todos: store.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showFullTodo: todoID => dispatch(showFullTodo(todoID)),
    getTodos: () => dispatch(getTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoMainPageContainer);
