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
import LoginSocial from "./component/auth/LoginSocial";
import Profile from "./component/Profile";
import RegistrationConfirmation from "./component/auth/RegistrationConfirmation";

class App extends React.Component {
  todoEdit = ({ match }) => {
    return <TodoEditContainer match={match}></TodoEditContainer>;
  };

  render() {
    return (
      <Router>
        <div className="main">
          <Route path="/" component={Navbar}></Route>
          <Route component={InfobarContainer}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route exact path="/registration-confirmation" component={RegistrationConfirmation}></Route>
          <Route exact path="/login" component={LoginContainer}></Route>
          <Route path="/oauth2/redirect" component={LoginSocial}></Route>
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
          <PrivateRoute path="/profile" component={Profile} />
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
