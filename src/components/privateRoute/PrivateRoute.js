import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else if (currentUser && currentUser.emailVerified) {
          return <Component {...props} />;
        } else if (!currentUser.emailVerified) {
          return (
            <Redirect
              to={{
                pathname: "/verify_email",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
