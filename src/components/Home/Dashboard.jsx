// src/components/Home/Dashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Import the context

const Dashboard = () => {
    const navigate = useNavigate();
    const { employees, leaveRequests } = useAppContext();

    const totalEmployees = employees.length;
    const pendingLeaveRequests = leaveRequests.filter(request => request.status === 'Pending').length;
    const recentActivities = [
        { action: "John Doe", type: "added", date: "2024-10-01" },
        { action: "Jane Smith", type: "requested leave", date: "2024-09-29" },
        { action: "Paul Brown", type: "updated profile", date: "2024-09-28" },
    ];

    const handleViewEmployeeList = () => {
        navigate('/employee-list');
    };

    const handleManageLeaveRequests = () => {
        navigate('/leave-requests');
    };

    const handleAddNewEmployee = () => {
        navigate('/add-employee');
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">HR Dashboard</h1>

            {/* Employee and Leave Statistics Section */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Total Employees</h2>
                            <p className="card-text display-4">{totalEmployees}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Pending Leave Requests</h2>
                            <p className="card-text display-4">{pendingLeaveRequests}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Total Departments</h2>
                            <p className="card-text display-4">5</p> {/* Replace with actual department count */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="mb-4">
                <h2>Actions</h2>
                <button className="btn btn-primary me-2" onClick={handleViewEmployeeList}>
                    View Employee List
                </button>
                <button className="btn btn-secondary me-2" onClick={handleManageLeaveRequests}>
                    Manage Leave Requests
                </button>
                <button className="btn btn-success" onClick={handleAddNewEmployee}>
                    Add New Employee
                </button>
            </div>

            {/* Recent Activities Section */}
            <div className="mb-4">
                <h2>Recent Activities</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentActivities.map((activity, index) => (
                            <tr key={index}>
                                <td>{activity.action}</td>
                                <td>{activity.type}</td>
                                <td>{activity.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Leave Requests Summary Section */}
            <div className="mb-4">
                <h2>Leave Requests Summary</h2>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Approved Requests</h5>
                                <p className="card-text display-4">{leaveRequests.filter(req => req.status === 'Approved').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Rejected Requests</h5>
                                <p className="card-text display-4">{leaveRequests.filter(req => req.status === 'Rejected').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Pending Approvals</h5>
                                <p className="card-text display-4">{pendingLeaveRequests}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
