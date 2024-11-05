// src/components/PublicRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// PublicRoute to allow access to public pages (Login, Signup) only for unauthenticated users
const PublicRoute = ({ children, restricted }) => {
  const { user } = useContext(AuthContext);

  // If user is logged in and the route is restricted, redirect to Dashboard
  if (user && restricted) {
    return <Navigate to="/dashboard" />;
  }

  return children; // Render the page if it's accessible
};

export default PublicRoute;
