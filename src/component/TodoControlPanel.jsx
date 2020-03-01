import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TodoControlPanel.css";
import Select from "./base/Select";
import "./base/Select.css";

class TodoControlPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let id = this.props.settings.id;
    let handleDeleteTodo = this.props.settings.handleDeleteTodo;
    let handleMarkAsDone = this.props.settings.handleMarkAsDone;
    let items = [
      {
        text: "Mark as done",
        handler: handleMarkAsDone
      }
    ];

    return (
      <div className="todo-control-panel">
        <div className="control-item">
          <Link to={"/todo/" + id}>Edit</Link>
        </div>
        <div className="control-item">
          <Link to="#">
            <i class="fas fa-tag"></i>
          </Link>
        </div>
        <div className="control-item">
          <Link to="#" onClick={handleDeleteTodo}>
            <i class="far fa-trash-alt"></i>
          </Link>
        </div>
        <div className="control-item select-container">
          <i id={"more-todo-actions-id-" + id} class="fas fa-ellipsis-v"></i>
          <Select
            id={"more-todo-actions-select-id-" + id}
            parentId={"more-todo-actions-id-" + id}
            items={items}
          ></Select>
        </div>
      </div>
    );
  }
}

export default TodoControlPanel;
