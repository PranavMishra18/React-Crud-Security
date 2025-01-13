import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../../context/UserContext";

function PrivateRoute({ children, allowedRoles }) {
  const { auth } = useContext(UserContext);
  const location = useLocation(); // Get the current location

  if (!auth) {
    // Pass the current location to the login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const cleanedAllowedRoles = allowedRoles.map((role) =>
    role.replace(/[\[\]"]/g, "")
  );

  if (!cleanedAllowedRoles.includes(auth.role)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
