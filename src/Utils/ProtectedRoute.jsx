import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  logout,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} logout={logout} />;
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
