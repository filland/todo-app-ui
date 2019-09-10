import React from "react";
import { connect } from "react-redux";
import TodoEdit from "./TodoEdit";
import Error from "./Error";
import TodoService from "../service/TodoService";
import { UPDATE_TODO_REQUEST } from "../reducer/TodoReducer";

class TodoEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      todoID: props.match.params.id
    };
  }

  componentWillMount() {
    this.setState({
      todo: this.fetchTodo(this.state.todoID)
    });
  }

  fetchTodo = todoID => {
    try {
      return TodoService.fetchOneTodo(todoID);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { updateTodo } = this.props;
    const { todo, todoID } = this.state;

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

    TodoService.updateTodo(todo);

    dispatch({
      type: UPDATE_TODO_REQUEST,
      payload: {todo: todo}
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
