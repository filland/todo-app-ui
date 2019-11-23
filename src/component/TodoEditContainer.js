import React from "react";
import { connect } from "react-redux";
import TodoEdit from "./TodoEdit";
import Error from "./Error";
import TodoService from "../service/TodoService";
import {
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS
} from "../reducer/TodoReducer";
import Loading from "./Loading";

class TodoEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      todoID: props.match.params.id,
      loading: true
    };
  }

  componentDidMount() {
    TodoService.fetchOneTodo(this.state.todoID, todo => {
      this.setState({
        todo: todo,
        loading: false
      });
    });
  }

  render() {
    const { updateTodo } = this.props;
    const { todo, todoID } = this.state;

    if(this.state.loading == true) {
      return <Loading componentName="todo"></Loading>
    }

    if (todo) {
      return <TodoEdit todo={todo} updateTodo={updateTodo} />;
    } else {
      let message = "No todo with id " + todoID + " found";
      return <Error message={message} />;
    }
  }
}

const updateTodo = todo => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TODO_REQUEST
    });

    TodoService.updateTodo(todo, updatedTodo => {
      dispatch({
        type: UPDATE_TODO_SUCCESS,
        payload: { todo: updatedTodo }
      });
    });
  };
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateTodo: todo => dispatch(updateTodo(todo)),
    getTodos: () => dispatch(TodoService.fetchTodos)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoEditContainer);
