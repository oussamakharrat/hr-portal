import React from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context

const EmployeeList = () => {
    const { employees } = useAppContext(); // Destructure context values

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Employee List</h2>
            <div className="list-group">
                {employees.map((employee) => (
                    <div className="list-group-item" key={employee.id}>
                        <h5 className="mb-1">{employee.name}</h5>
                        <p className="mb-1">Email: {employee.email}</p>
                        <small>Role: {employee.role}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
