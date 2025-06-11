// src/utils/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    // You can replace this with a spinner or nicer loading UI if you want
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the children components
  return children;
};

export default ProtectedRoute;
