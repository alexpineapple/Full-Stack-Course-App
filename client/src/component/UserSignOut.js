import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

//this function calls on the context action to initiate a user signing out
function UserSignOut ({ context }) {
  useEffect(() => context.actions.signOut());
  return <Navigate to="/" />;
}

export default UserSignOut;