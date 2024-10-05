// src/components/HR/EmployeeList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const EmployeeList = () => {
    const { employees } = useAppContext();

    return (
        <div className="container mt-4">
            <h1>Employee List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/modify-employee/${employee.id}`} className="btn btn-warning me-2">
                                    Modify
                                </Link>
                                <Link to={`/delete-employee/${employee.id}`} className="btn btn-danger">
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
