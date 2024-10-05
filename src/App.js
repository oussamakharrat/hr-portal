import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import HRDashboard from './components/HR/HRDashboard';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import LeaveRequest from './components/Employee/LeaveRequest';
import Navbar from './components/Shared/Navbar';
import EmployeeList from './components/HR/EmployeeList';
import { AppProvider } from './context/AppContext';
import AddEmployee from './components/Employee/AddEmployee';
import ModifyEmployee from './components/Employee/ModifyEmployee'; // Import ModifyEmployee component
import { useAuth } from './context/AuthContext'; // Removed AuthProvider
import Dashboard from './components/Home/Dashboard';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Make sure this is within AuthProvider

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
};

const App = () => {
    const { isAuthenticated } = useAuth(); // Use this inside AuthProvider

    return (
        <AppProvider>
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="app-container">
                    <Routes>
                        {!isAuthenticated ? (
                            <>
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any other paths to login */}
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/login" element={<Navigate to="/" />} />
                                <Route path="/signup" element={<Navigate to="/" />} />
                                <Route path="/hr-dashboard" element={<ProtectedRoute element={<HRDashboard />} />} />
                                <Route path="/employee-dashboard" element={<ProtectedRoute element={<EmployeeDashboard />} />} />
                                <Route path="/leave-requests" element={<ProtectedRoute element={<LeaveRequest />} />} />
                                <Route path="/employee-list" element={<ProtectedRoute element={<EmployeeList />} />} />
                                <Route path="/add-employee" element={<ProtectedRoute element={<AddEmployee />} />} />
                                <Route path="/modify-employee/:id" element={<ProtectedRoute element={<ModifyEmployee />} />} /> {/* Add modify route */}
                            </>
                        )}
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
};

export default App;
