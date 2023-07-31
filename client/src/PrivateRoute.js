import React from "react";
import { Navigate, useLocation } from "react-router-dom";

//this function checks if the user is currently authenticated, otherwise they will be redirected to the sign in page
function PrivateRoute({ children, context }) {
  const location = useLocation();
  let isAuthenticated = context.authenticatedUser;
  return isAuthenticated ? (
    children
  ) : (
    //add location to state, to navigate back after sign in
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default PrivateRoute;