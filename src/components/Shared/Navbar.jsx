// src/components/Shared/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, role } = useAuth(); // Access the role from Auth context

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link 
                    className="navbar-brand" 
                    to={isAuthenticated ? (role === 'admin' ? '/' : '/employee-dashboard') : '/login'}
                >
                    HR Portal
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticated && (
                            <>
                                {role === 'admin' ? (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/hr-dashboard">HR Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/leave-requests">Leave Requests</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/employee-dashboard">Employee Dashboard</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {isAuthenticated ? (
                                <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                            ) : (
                                <Link className="nav-link" to="/login">Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
