import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated:isAuthenticated, logout:logout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {

        if (isAuthenticated) {
          {
            /*rendering the dashboard*/
          }
          return <Component {...props} logout={logout}/>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
