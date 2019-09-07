import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import TodosListContainer from "./component/TodosListContainer";
import BreadcrumbsContainer from "./component/BreadcrumbsContainer";
import TodoEditContainer from "./component/TodoEditContainer";
import AddTodoContainer from "./component/AddTodoContainer";

class App extends React.Component {
  todoEdit = ({ match }) => {
    return <TodoEditContainer todoID={match.params.id}></TodoEditContainer>;
  };

  render() {
    return (
      <Router>
        <div className="main">
          <BreadcrumbsContainer />
          <Route exact path="/" component={AddTodoContainer}></Route>
          <Route exact path="/" component={TodosListContainer}></Route>
          <Route path="/todo/:id" component={this.todoEdit}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
