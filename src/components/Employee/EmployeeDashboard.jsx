import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context
import { FaUser, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa'; // Add some icons

const EmployeeDashboard = () => {
    const { leaveRequests, addLeaveRequest } = useAppContext(); // Destructure context values
    const [newLeaveRequest, setNewLeaveRequest] = useState({
        employeeName: '',  // Add employee name to the state
        date: '',
        reason: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeaveRequest({ ...newLeaveRequest, [name]: value });
    };

    const handleLeaveRequestSubmit = (e) => {
        e.preventDefault();
        const request = {
            id: leaveRequests.length + 1,
            employeeName: newLeaveRequest.employeeName,  // Include employee name in the request
            date: newLeaveRequest.date,
            reason: newLeaveRequest.reason,
            status: 'Pending',
        };
        addLeaveRequest(request); // Use context method to add leave request
        setNewLeaveRequest({ employeeName: '', date: '', reason: '' }); // Clear the form
        setSuccessMessage('Leave request submitted successfully!'); // Show success message
        setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee Dashboard</h2>

            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success text-center" role="alert">
                    {successMessage}
                </div>
            )}

            {/* Leave Requests Section */}
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h3 className="mb-0">
                        <FaCalendarAlt className="me-2" /> Leave Requests
                    </h3>
                </div>
                <div className="card-body">
                    {leaveRequests.length > 0 ? (
                        <ul className="list-group">
                            {leaveRequests.map((request) => (
                                <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{request.employeeName}</strong> - Date: {request.date}
                                        <br />
                                        <span className="text-muted">Reason: {request.reason}</span>
                                    </div>
                                    <span className={`badge ${request.status === 'Pending' ? 'bg-warning' : 'bg-success'} p-2`}>
                                        {request.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-muted">No leave requests submitted yet.</p>
                    )}
                </div>
            </div>

            {/* Submit Leave Request Section */}
            <div className="card shadow-sm">
                <div className="card-header">
                    <h3 className="mb-0">
                        <FaExclamationCircle className="me-2" /> Submit Leave Request
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleLeaveRequestSubmit} className="mt-3">
                        <div className="mb-3">
                            <label htmlFor="employeeName" className="form-label">
                                <FaUser className="me-2" /> Employee Name
                            </label>
                            <input
                                type="text"
                                name="employeeName"
                                value={newLeaveRequest.employeeName}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">
                                <FaCalendarAlt className="me-2" /> Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={newLeaveRequest.date}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reason" className="form-label">
                                <FaExclamationCircle className="me-2" /> Reason for Leave
                            </label>
                            <input
                                type="text"
                                name="reason"
                                value={newLeaveRequest.reason}
                                onChange={handleInputChange}
                                required
                                className="form-control"
                                placeholder="Enter reason for leave"
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Submit Leave Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
