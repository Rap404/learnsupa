import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token, allowedRoles }) => {
  // periksa apakah role di dalam token termasuk dalam daftar allowedRoles
  if (!token || !allowedRoles.includes(token.user.user_metadata.role)) {
    return <Navigate to="" />; // Redirect ke halaman home jika bukan admin
  }
  return children;
};

export default ProtectedRoute;
