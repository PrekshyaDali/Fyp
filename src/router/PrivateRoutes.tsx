import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Check if the token exists and is valid
  const isAuthenticated = token !== null && token !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
