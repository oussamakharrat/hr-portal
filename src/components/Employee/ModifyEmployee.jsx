// src/components/Employee/ModifyEmployee.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ModifyEmployee = () => {
    const { employees, updateEmployee } = useAppContext(); // Assume updateEmployee is defined in context
    const { id } = useParams(); // Get employee ID from URL params
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        department: '',
        email: '',
    });

    useEffect(() => {
        const emp = employees.find((e) => e.id === id);
        if (emp) {
            setEmployee(emp);
        }
    }, [id, employees]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, employee);
        navigate('/employee-list'); // Redirect after saving
    };

    return (
        <div className="container mt-4">
            <h1>Modify Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={employee.department}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={employee.email}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ModifyEmployee;
