import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddEmployee = () => {
    const { addEmployee } = useAppContext(); // Destructure addEmployee from context
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        position: '' // Add position field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEmployee(formData); // Call addEmployee to add the new employee
        navigate('/employee-list'); // Navigate back to employee list after submission
    };

    return (
        <div className="container mt-4">
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Role"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="position" // Change name to position
                        value={formData.position} // Bind to position in state
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Position" // Change placeholder to Position
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
