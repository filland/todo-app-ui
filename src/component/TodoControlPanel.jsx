import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TodoControlPanel.css";
import Select from "./base/Select";
import "./base/Select.css";

class TodoControlPanel extends Component {

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
            <i className="fas fa-tag"></i>
          </Link>
        </div>
        <div className="control-item">
          <Link to="#" onClick={handleDeleteTodo}>
            <i className="far fa-trash-alt"></i>
          </Link>
        </div>
        <div className="control-item">
          <Select
            selectId={"more-todo-actions-select-id-" + id}
            selectIcon={<i id={"more-todo-actions-id-" + id} className="fas fa-ellipsis-v"></i>}
            selectIconId={"more-todo-actions-id-" + id}
            items={items}
          ></Select>
        </div>
      </div>
    );
  }
}

export default TodoControlPanel;
