// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([]); // Store users for signup/login

    const login = (username, password) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            setIsAuthenticated(true);
            setRole(user.role);
            localStorage.setItem('userRole', user.role); // Store the user role in local storage
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const signup = (username, password, role) => {
        // Check if user already exists
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            throw new Error('Account already exists'); // Throw error if account exists
        } else {
            // Create a new user and add to users list
            const newUser = { username, password, role };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setIsAuthenticated(true);
            setRole(role);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
