// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// PrivateRoute to protect routes for authenticated users only (e.g., Dashboard, SetPin)
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the Home page
  if (!user) {
    return <Navigate to="/" />;
  }

  return children; // Render the protected page if user is authenticated
};

export default PrivateRoute;
