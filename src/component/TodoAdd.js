import React from "react";
import "../App.css";

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
  };

  render() {
    return (
      <div className="common todo">
        <div className="common-input">
          <label>
            Title:
            <input
              type="text"
              defaultValue={this.state.title}
              onChange={this.todoTitleChange}
            ></input>
          </label>
        </div>
        <div className="common-input">
          <label>
            Description:
            <input
              type="text"
              defaultValue={this.state.description}
              onChange={this.todoDescriptionChange}
            ></input>
          </label>
        </div>
        <button className="green-button" onClick={this.addButtonClick}>
          Add todo
        </button>
      </div>
    );
  }
}

export default TodoAdd