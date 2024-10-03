import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAppContext } from '../../context/AppContext'; // Import the context

const HRDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { employees, leaveRequests } = useAppContext(); // Destructure context values

    const totalEmployees = employees.length;
    const pendingLeaveRequests = leaveRequests.filter(request => request.status === 'Pending').length;

    // Function to handle viewing employee list
    const handleViewEmployeeList = () => {
        navigate('/employee-list'); // Navigate to the employee list page
    };

    // Function to handle managing leave requests
    const handleManageLeaveRequests = () => {
        navigate('/leave-requests'); // Navigate to the leave requests page
    };

    // Function to handle adding a new employee
    const handleAddNewEmployee = () => {
        // This could open a modal or navigate to a new page
        navigate('/add-employee'); // Navigate to the add employee page (if you have one)
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">HR Dashboard</h1>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h2 className="card-title">Total Employees</h2>
                            <p className="card-text">{totalEmployees}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h2 className="card-title">Pending Leave Requests</h2>
                            <p className="card-text">{pendingLeaveRequests}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <h2>Actions</h2>
                <button className="btn btn-primary me-2" onClick={handleViewEmployeeList}>View Employee List</button>
                <button className="btn btn-secondary me-2" onClick={handleManageLeaveRequests}>Manage Leave Requests</button>
                <button className="btn btn-success" onClick={handleAddNewEmployee}>Add New Employee</button>
            </div>
        </div>
    );
};

export default HRDashboard;
