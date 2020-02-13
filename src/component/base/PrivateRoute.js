import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        let flag = AuthService.isLogged();
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

export default PrivateRoute;
