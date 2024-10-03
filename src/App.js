// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup'; // Ensure you have a Signup component
import HRDashboard from './components/HR/HRDashboard'; // Ensure this component exists
import EmployeeDashboard from './components/Employee/EmployeeDashboard'; // Ensure this component exists
import LeaveRequest from './components/Employee/LeaveRequest'; // Ensure this component exists
import Navbar from './components/Shared/Navbar';
import EmployeeList from './components/HR/EmployeeList'; // Ensure this component exists
import { AppProvider } from './context/AppContext';
import AddEmployee from './components/Employee/AddEmployee'; // Ensure this component exists
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Home/Dashboard'; // Ensure this component exists

const App = () => {
    return (
        <AppProvider>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/hr-dashboard" element={<HRDashboard />} />
                            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                            <Route path="/leave-requests" element={<LeaveRequest />} />
                            <Route path="/employee-list" element={<EmployeeList />} />
                            <Route path="/add-employee" element={<AddEmployee />} />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </AppProvider>
    );
};

export default App;
