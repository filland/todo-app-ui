import React from "react";
import "../App.css";
import "./TodoAdd.css";

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
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
      title: "",
      description: ""
    });

    document.getElementById("todo-add-title-id").firstChild.value = '';
    document.getElementById("todo-add-description-id").firstChild.value = '';
  };

  componentDidMount() {
    let descElement = document.getElementById("todo-add-description-id");
    let titleElement = document.getElementById("todo-add-title-id");
    let buttonElement = document.getElementById("todo-add-button-id");
    descElement.style.display="none";
    buttonElement.style.display="none";
    titleElement.addEventListener("click", (e) => {
      titleElement.firstChild.placeholder = "title";
      descElement.style.display="flex";
      buttonElement.style.display="flex";
    });
  }

  render() {
    return (
      <div className="common todo-add">
        <div className="flex-container" id="todo-add-title-id">
          <input
            type="text"
            defaultValue={this.state.title}
            onChange={this.todoTitleChange}
            placeholder="add new todo..."
          ></input>
        </div>
        <div className="flex-container" id="todo-add-description-id">
          <textarea
            defaultValue={this.state.description}
            onChange={this.todoDescriptionChange}
            placeholder="description"
          ></textarea>
        </div>
        <div className="flex-container" id="todo-add-button-id">
          <button className="green-button" onClick={this.addButtonClick}>
            Add todo
          </button>
        </div>
      </div>
    );
  }
}

export default TodoAdd;
