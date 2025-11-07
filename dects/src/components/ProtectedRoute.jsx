import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserRole } from '../utils/auth';

// ProtectedRoute requires a token; optionally restrict by role (string or array)
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles) {
    const role = getUserRole();
    const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!role || !allowed.includes(role)) return <Navigate to="/login" replace />;
  }

  return children;
}
