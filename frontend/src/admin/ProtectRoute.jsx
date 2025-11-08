import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('admin') === 'true';

  return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
