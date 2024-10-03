import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context

const LeaveRequest = () => {
    const { leaveRequests, addLeaveRequest, approveLeaveRequest, rejectLeaveRequest } = useAppContext(); // Destructure context values
    const [newRequest, setNewRequest] = useState({
        employee: '',
        date: '',
        reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRequest({ ...newRequest, [name]: value });
    };

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        addLeaveRequest({
            ...newRequest,
            status: 'Pending' // Set the initial status as 'Pending'
        });
        setNewRequest({ employee: '', date: '', reason: '' }); // Clear the form
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Leave Requests</h2>

            <div className="mb-4">
                <h3>Submit New Leave Request</h3>
                <form onSubmit={handleRequestSubmit} className="mt-3">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="employee"
                            value={newRequest.employee}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Employee Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="date"
                            name="date"
                            value={newRequest.date}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="reason"
                            value={newRequest.reason}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Reason for Leave"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Leave Request</button>
                </form>
            </div>

            <h3 className="mb-4">Existing Leave Requests</h3>
            <ul className="list-group">
                {leaveRequests.map((request) => (
                    <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Employee:</strong> {request.employee} <br />
                            <strong>Date:</strong> {request.date} <br />
                            <strong>Reason:</strong> {request.reason} <br />
                            <strong>Status:</strong> {request.status}
                        </div>
                        {request.status === 'Pending' && (
                            <div>
                                <button className="btn btn-success btn-sm me-2" onClick={() => approveLeaveRequest(request.id)}>Approve</button>
                                <button className="btn btn-danger btn-sm" onClick={() => rejectLeaveRequest(request.id)}>Reject</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveRequest;
