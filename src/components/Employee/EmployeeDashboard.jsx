import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context

const EmployeeDashboard = () => {
    const { leaveRequests, addLeaveRequest } = useAppContext(); // Destructure context values
    const [newLeaveRequest, setNewLeaveRequest] = useState({
        date: '',
        reason: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeaveRequest({ ...newLeaveRequest, [name]: value });
    };

    const handleLeaveRequestSubmit = (e) => {
        e.preventDefault();
        const request = {
            id: leaveRequests.length + 1,
            date: newLeaveRequest.date,
            reason: newLeaveRequest.reason,
            status: 'Pending',
        };
        addLeaveRequest(request); // Use context method to add leave request
        setNewLeaveRequest({ date: '', reason: '' }); // Clear the form
    };

    return (
        <div className="container mt-4">
            <h2>Employee Dashboard</h2>

            <h3 className="mt-4">Leave Requests</h3>
            <ul className="list-group">
                {leaveRequests.map((request) => (
                    <li key={request.id} className="list-group-item">
                        Date: {request.date}, Reason: {request.reason}, Status: {request.status}
                    </li>
                ))}
            </ul>

            <h3 className="mt-4">Submit Leave Request</h3>
            <form onSubmit={handleLeaveRequestSubmit} className="mt-3">
                <div className="mb-3">
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
                    <input
                        type="text"
                        name="reason"
                        placeholder="Reason for leave"
                        value={newLeaveRequest.reason}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Leave Request</button>
            </form>
        </div>
    );
};

export default EmployeeDashboard;
