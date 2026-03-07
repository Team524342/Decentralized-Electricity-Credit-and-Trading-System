import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserRole } from '../utils/auth';

/**
 * ProtectedRoute Component
 * Restricts access to routes based on authentication and user role
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child component to render if authorized
 * @param {string|string[]} props.allowedRoles - Role(s) allowed to access this route
 * @returns {React.ReactElement} Protected content or redirect to login
 * 
 * @example
 * <ProtectedRoute allowedRoles={['producer']}>
 *   <ProducerDashboard />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  // Check if user has valid authentication token
  const token = getAccessToken();
  
  if (!token) {
    // Not authenticated - redirect to login
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check user's role
  if (allowedRoles) {
    const userRole = getUserRole();
    const allowedList = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!userRole || !allowedList.includes(userRole)) {
      // User doesn't have required role - redirect to unauthorized page or home
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and authorized
  return children;
}

