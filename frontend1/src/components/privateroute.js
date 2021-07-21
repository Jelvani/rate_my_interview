import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth"

const PrivateRoute = ({ children, ...rest }) => {

  return (
    <Route {...rest} render={() => {
      if (Auth()) {
        return children;
      }
      return <Redirect to="/login" />;


    }} />
  );
};
export default PrivateRoute