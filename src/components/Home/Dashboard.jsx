import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Import the context

const Dashboard = () => {
    const navigate = useNavigate();
    const { employees, leaveRequests, recentActivities, deleteEmployee } = useAppContext(); // Bring in deleteEmployee function

    const totalEmployees = employees.length;
    const pendingLeaveRequests = leaveRequests.filter(request => request.status === 'Pending').length;
    const approvedLeaveRequests = leaveRequests.filter(req => req.status === 'Approved').length;
    const rejectedLeaveRequests = leaveRequests.filter(req => req.status === 'Rejected').length;

    const handleViewEmployeeList = () => {
        navigate('/employee-list');
    };

    const handleManageLeaveRequests = () => {
        navigate('/leave-requests');
    };

    const handleAddNewEmployee = () => {
        navigate('/add-employee');
    };

    const handleModifyEmployee = (id) => {
        navigate(`/modify-employee/${id}`); // Navigate to modify employee route
    };

    const handleDeleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            deleteEmployee(id); // Trigger deleteEmployee action
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">HR Dashboard</h1>

            {/* Employee and Leave Statistics Section */}
            <div className="row mb-4">
                <div className="col-12 col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Total Employees</h2>
                            <p className="card-text display-4">{totalEmployees}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Pending Leave Requests</h2>
                            <p className="card-text display-4">{pendingLeaveRequests}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
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
                <div className="d-flex flex-column flex-sm-row">
                    <button className="btn btn-primary me-2 mb-2 mb-sm-0" onClick={handleViewEmployeeList}>
                        View Employee List
                    </button>
                    <button className="btn btn-secondary me-2 mb-2 mb-sm-0" onClick={handleManageLeaveRequests}>
                        Manage Leave Requests
                    </button>
                    <button className="btn btn-success" onClick={handleAddNewEmployee}>
                        Add New Employee
                    </button>
                </div>
            </div>

            {/* Employee List Section */}
            <div className="mb-4">
                <h2>Employee List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalEmployees === 0 ? (
                            <tr>
                                <td colSpan="3">No employees found</td>
                            </tr>
                        ) : (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleModifyEmployee(employee.id)}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteEmployee(employee.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
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
                        {recentActivities.length === 0 ? (
                            <tr>
                                <td colSpan="3">No recent activities</td>
                            </tr>
                        ) : (
                            recentActivities.map((activity, index) => (
                                <tr key={index}>
                                    <td>{activity.action}</td>
                                    <td>{activity.type}</td>
                                    <td>{activity.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Leave Requests Summary Section */}
            <div className="mb-4">
                <h2>Leave Requests Summary</h2>
                <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Approved Requests</h5>
                                <p className="card-text display-4">{approvedLeaveRequests}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className="card text-center shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Rejected Requests</h5>
                                <p className="card-text display-4">{rejectedLeaveRequests}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
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
