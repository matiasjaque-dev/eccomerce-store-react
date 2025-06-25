import React from "react";
import useAuthStore from "../stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useAuthStore();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
