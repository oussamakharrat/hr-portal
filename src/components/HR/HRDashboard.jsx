import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FaUser, FaClipboardList, FaBuilding, FaUserPlus, FaTasks } from 'react-icons/fa'; // Icons for visual enhancement

const HRDashboard = () => {
    const navigate = useNavigate();
    const { employees, leaveRequests } = useAppContext();

    const totalEmployees = employees.length;
    const pendingLeaveRequests = leaveRequests.filter(request => request.status === 'Pending').length;
    const recentLeaveRequests = leaveRequests.slice(0, 5); // Show only the last 5 leave requests for quick overview
    const departments = 5; // Example static data, could be dynamic

    // Handlers for navigation
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

            {/* Overview Cards */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center shadow-sm bg-light">
                        <div className="card-body">
                            <FaUser className="display-4 mb-3 text-primary" />
                            <h5 className="card-title">Total Employees</h5>
                            <p className="card-text display-6">{totalEmployees}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-sm bg-light">
                        <div className="card-body">
                            <FaClipboardList className="display-4 mb-3 text-warning" />
                            <h5 className="card-title">Pending Leave Requests</h5>
                            <p className="card-text display-6">{pendingLeaveRequests}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-sm bg-light">
                        <div className="card-body">
                            <FaBuilding className="display-4 mb-3 text-info" />
                            <h5 className="card-title">Total Departments</h5>
                            <p className="card-text display-6">{departments}</p> {/* Static value, replace with dynamic */}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center shadow-sm bg-light">
                        <div className="card-body">
                            <FaTasks className="display-4 mb-3 text-success" />
                            <h5 className="card-title">Average Leave Days/Employee</h5>
                            <p className="card-text display-6">3.4</p> {/* Example static data */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-4">
                <h2>Quick Actions</h2>
                <button className="btn btn-primary me-2" onClick={handleViewEmployeeList}>
                    <FaUser className="me-2" /> View Employee List
                </button>
                <button className="btn btn-secondary me-2" onClick={handleManageLeaveRequests}>
                    <FaClipboardList className="me-2" /> Manage Leave Requests
                </button>
                <button className="btn btn-success" onClick={handleAddNewEmployee}>
                    <FaUserPlus className="me-2" /> Add New Employee
                </button>
            </div>

            {/* Recent Leave Requests */}
            <div className="mb-4">
                <h2>Recent Leave Requests</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentLeaveRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.employee}</td>
                                <td>{request.date}</td>
                                <td>{request.reason}</td>
                                <td>
                                    <span className={`badge ${
                                        request.status === 'Pending' ? 'bg-warning' :
                                        request.status === 'Approved' ? 'bg-success' : 'bg-danger'
                                    }`}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Additional Insights and Admin Tools */}

        </div>
    );
};

export default HRDashboard;
