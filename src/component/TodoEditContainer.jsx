import React from "react";
import { connect } from "react-redux";
import TodoEdit from "./TodoEdit";
import Error from "./Error";
import TodoService from "../service/TodoService";
import {
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
} from "../reducer/TodoReducer";
import { INFOBAR_MESSAGE_UPDATE } from "../reducer/InfobarReducer";
import Loading from "./Loading";
import { clearInfobar } from "./InfobarContainer";

class TodoEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      todoId: props.match.params.id,
      loading: true
    };
  }

  componentDidMount() {
    TodoService.fetchOneTodo(this.state.todoId, todo => {
      this.setState({
        todo: todo,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.cleanup();
  }

  cleanup() {
    this.props.clearInfobar();
  }

  render() {
    const { updateTodo } = this.props;
    const { todo, todoId } = this.state;

    if (this.state.loading === true) {
      return <Loading message="Todo is loading..."></Loading>;
    }

    if (todo) {
      return <TodoEdit todo={todo} updateTodo={updateTodo} />;
    } else {
      let message = "No todo with id " + todoId + " found";
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
      dispatch({
        type: INFOBAR_MESSAGE_UPDATE,
        payload: {
          message: "Todo updated",
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
    updateTodo: todo => dispatch(updateTodo(todo)),
    clearInfobar: () => dispatch(clearInfobar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditContainer);
