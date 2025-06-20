import React from "react";
import useAuthStore from "../stores/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useAuthStore();

  console.log("Usuario actual:", user);
  console.log("Rol actual:", role);
  console.log("Roles permitidos:", allowedRoles);

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
