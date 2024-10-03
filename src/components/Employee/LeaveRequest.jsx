import React from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context
import { useAuth } from '../../context/AuthContext'; // Import the auth context
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importing icons for approve/reject actions
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveRequest = () => {
    const { leaveRequests, approveLeaveRequest, rejectLeaveRequest } = useAppContext(); // Destructure context values
    const { role } = useAuth(); // Get the role from Auth context

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Leave Requests</h2>

            {/* Existing Leave Requests */}
            <h3 className="mb-4">Existing Leave Requests</h3>
            <div className="row">
                {leaveRequests.length === 0 ? (
                    <p className="text-muted">No leave requests found.</p>
                ) : (
                    leaveRequests.map((request) => (
                        <div key={request.id} className="col-md-6 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <strong>Employee:</strong> {request.employee}
                                    </h5>
                                    <p className="card-text">
                                        <strong>Date:</strong> {request.date} <br />
                                        <strong>Reason:</strong> {request.reason} <br />
                                        <strong>Status:</strong> 
                                        <span 
                                            className={`badge ms-2 ${
                                                request.status === 'Pending' ? 'bg-warning' :
                                                request.status === 'Approved' ? 'bg-success' : 'bg-danger'
                                            }`}
                                        >
                                            {request.status}
                                        </span>
                                    </p>

                                    {/* Only admins can approve/reject leave requests */}
                                    {role === 'admin' && request.status === 'Pending' && (
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn btn-success btn-sm me-2 d-flex align-items-center"
                                                onClick={() => approveLeaveRequest(request.id)}
                                            >
                                                <FaCheck className="me-1" /> Approve
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm d-flex align-items-center"
                                                onClick={() => rejectLeaveRequest(request.id)}
                                            >
                                                <FaTimes className="me-1" /> Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LeaveRequest;
