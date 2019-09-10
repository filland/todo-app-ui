import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import TodosListContainer from "./component/TodosListContainer";
import BreadcrumbsContainer from "./component/BreadcrumbsContainer";
import TodoEditContainer from "./component/TodoEditContainer";
import TodoAddContainer from "./component/TodoAddContainer";

class App extends React.Component {
  todoEdit = ({ match }) => {
    return <TodoEditContainer match={match}></TodoEditContainer>;
  };

  render() {
    return (
      <Router>
        <div className="main">
          <BreadcrumbsContainer />
          <Route exact path="/" component={TodoAddContainer}></Route>
          <Route exact path="/" component={TodosListContainer}></Route>
          <Route path="/todo/:id" component={this.todoEdit}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
