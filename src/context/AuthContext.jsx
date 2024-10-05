// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [users, setUsers] = useState([]); // Store users for signup/login

    useEffect(() => {
        // Load user role and auth state from localStorage on app load
        const storedRole = localStorage.getItem('userRole');
        const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
        if (storedAuth) {
            setIsAuthenticated(true);
            setRole(storedRole);
        }
    }, []);

    const login = (username, password) => {
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            setIsAuthenticated(true);
            setRole(user.role);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('isAuthenticated', 'true'); // Store auth state
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const signup = (username, password, role) => {
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            throw new Error('Account already exists');
        } else {
            const newUser = { username, password, role };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            setIsAuthenticated(true);
            setRole(role);
            localStorage.setItem('userRole', role);
            localStorage.setItem('isAuthenticated', 'true');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem('userRole');
        localStorage.setItem('isAuthenticated', 'false');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
