// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Access the authentication state

    return isAuthenticated ? children : <Navigate to="/login" />; // Redirect if not authenticated
};

export default ProtectedRoute;
