// src/components/Employee/DeleteEmployee.jsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const DeleteEmployee = () => {
    const { deleteEmployee } = useAppContext(); // Assume deleteEmployee is defined in context
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteEmployee(id);
        navigate('/employee-list'); // Redirect after deletion
    };

    return (
        <div className="container mt-4">
            <h1>Delete Employee</h1>
            <p>Are you sure you want to delete this employee?</p>
            <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/employee-list')}>
                No, Cancel
            </button>
        </div>
    );
};

export default DeleteEmployee;
