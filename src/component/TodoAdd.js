import React from "react";
import "../App.css";
import "./TodoAdd.css";

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      titile: "",
      description: ""
    };
  }

  todoTitleChange = e => {
    this.setState({
      title: e.currentTarget.value
    });
  };

  todoDescriptionChange = e => {
    this.setState({
      description: e.currentTarget.value
    });
  };

  addButtonClick = e => {
    this.props.addTodo(this.state.title, this.state.description);

    this.setState({
      titile: "",
      description: ""
    });
  };

  render() {
    return (
      <div className="common todo-add">
        <div className="flex-container">
          <label>Title</label>
          <input
            type="text"
            defaultValue={this.state.title}
            onChange={this.todoTitleChange}
            placeholder="title"
          ></input>
        </div>
        <div className="flex-container">
          <label>Description</label>
          <textarea
            defaultValue={this.state.description}
            onChange={this.todoDescriptionChange}
            placeholder="description"
          ></textarea>
        </div>
        <div className="flex-container">
          <button className="green-button" onClick={this.addButtonClick}>
            Add todo
          </button>
        </div>
      </div>
    );
  }
}

export default TodoAdd;
