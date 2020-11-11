import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userData = useSelector(state => state);
  return (
    <Route
      {...rest}
      render={props =>
        (!!userData.token) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: rest.redirectRoute, extras: {...rest.location}}} />
        )
      }
    />
  );
};

export default ProtectedRoute;
