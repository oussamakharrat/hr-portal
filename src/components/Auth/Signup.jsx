// src/components/Auth/Signup.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        try {
            signup(username, password, role); // Call signup with username, password, and role
            navigate('/'); // Redirect to home or desired page
        } catch (err) {
            setError(err.message); // Set error message
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSignup} className="mt-5">
                <h2>Sign Up</h2>
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
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <select 
                        id="role" 
                        className="form-select" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <div className="mt-3">
                <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to Login */}
            </div>
        </div>
    );
};

export default Signup;
