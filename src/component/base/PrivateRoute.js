import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AuthService from "../../service/AuthService";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        let flag = AuthService.isLogged();
        if(props.pathname === "/registration") {
          flag = true;
        }
        return flag ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              // state: { from: props.location }
            }}
          />
        );
      }}
    ></Route>
  );
}

export default connect()(PrivateRoute);
