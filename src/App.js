import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import TodosListContainer from "./component/TodosListContainer";
// import BreadcrumbsContainer from "./component/BreadcrumbsContainer";
import TodoEditContainer from "./component/TodoEditContainer";
import TodoAddContainer from "./component/TodoAddContainer";
import PrivateRoute from "./component/base/PrivateRoute";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import InfobarContainer from "./component/InfobarContainer";

class App extends React.Component {
  todoEdit = ({ match }) => {
    return <TodoEditContainer match={match}></TodoEditContainer>;
  };

  render() {
    return (
      <Router>
        <div className="main">
          <PrivateRoute component={Navbar}></PrivateRoute>
          <PrivateRoute component={InfobarContainer}></PrivateRoute>
          <Route exact path="/login" component={Login}></Route>
          <PrivateRoute path="/logout" component={Logout}></PrivateRoute>
          {/* <BreadcrumbsContainer /> */}
          <PrivateRoute
            exact
            path="/"
            component={TodoAddContainer}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/"
            component={TodosListContainer}
          ></PrivateRoute>
          <PrivateRoute
            path="/todo/:id"
            component={this.todoEdit}
          ></PrivateRoute>
        </div>
      </Router>
    );
  }
}

export default App;
