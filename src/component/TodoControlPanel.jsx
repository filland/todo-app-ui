import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TodoControlPanel.css";

class TodoControlPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let id = this.props.settings.id;
    let handleDeleteTodo = this.props.settings.handleDeleteTodo;
    
    return (
      <div className="todo-control-panel">
        <div className="control-item">
          <Link to={"/todo/" + id}>
            Edit
          </Link>
        </div>
        <div className="control-item">
          <Link to="#">
            <i class="fas fa-tag"></i>
          </Link>
        </div>
        <div className="control-item">
          <Link to="#" onClick={handleDeleteTodo} >
            <i class="far fa-trash-alt"></i>
          </Link>
        </div>
        <div className="control-item">
          <Link to="#">
            <i class="fas fa-ellipsis-v"></i>
          </Link>
        </div>
      </div>
    );
  }
}

export default TodoControlPanel;
