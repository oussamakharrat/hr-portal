// src/components/Auth/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            login(username, password); // Pass username and password to the login function
            
            // Check user role and redirect accordingly
            const userRole = localStorage.getItem('userRole'); // Assuming you store the role in local storage
            if (userRole === 'admin') {
                navigate('/'); // Redirect to HR Dashboard for admin
            } else {
                navigate('/employee-dashboard'); // Redirect to Employee Dashboard for employees
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.'); // Set error message
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleLogin} className="mt-5">
                <h2>Login</h2>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error if exists */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="form-control" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="mt-3">
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Link to Sign up */}
            </div>
        </div>
    );
};

export default Login;
