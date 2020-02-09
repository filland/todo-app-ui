import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodosListContainer from "./component/TodosListContainer";
import TodoEditContainer from "./component/TodoEditContainer";
import TodoAddContainer from "./component/TodoAddContainer";
import PrivateRoute from "./component/base/PrivateRoute";
import Navbar from "./component/Navbar";
import Registration from "./component/auth/Registration";
import Logout from "./component/auth/Logout";
import InfobarContainer from "./component/InfobarContainer";
import LoginContainer from "./component/auth/LoginContainer";
import SocialLogin from "./component/auth/SocialLogin";
import Account from "./component/Account";

class App extends React.Component {
  todoEdit = ({ match }) => {
    return <TodoEditContainer match={match}></TodoEditContainer>;
  };

  render() {
    return (
      <Router>
        <div className="main">
          <PrivateRoute component={Navbar}></PrivateRoute>
          <Route component={InfobarContainer}></Route>
          <Route exact path="/login" component={LoginContainer}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route path="/oauth2/redirect" component={SocialLogin}></Route>
          <PrivateRoute path="/logout" component={Logout}></PrivateRoute>
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
          <PrivateRoute path="/account" component={Account} />
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
