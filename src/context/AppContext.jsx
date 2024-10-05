import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [employees, setEmployees] = useState(() => {
        try {
            const savedEmployees = localStorage.getItem('employees');
            return savedEmployees ? JSON.parse(savedEmployees) : [];
        } catch (error) {
            console.error("Failed to parse employees from localStorage", error);
            return [];
        }
    });

    const [leaveRequests, setLeaveRequests] = useState(() => {
        try {
            const savedRequests = localStorage.getItem('leaveRequests');
            return savedRequests ? JSON.parse(savedRequests) : [];
        } catch (error) {
            console.error("Failed to parse leaveRequests from localStorage", error);
            return [];
        }
    });

    const [recentActivities, setRecentActivities] = useState(() => {
        try {
            const savedActivities = localStorage.getItem('recentActivities');
            return savedActivities ? JSON.parse(savedActivities) : [];
        } catch (error) {
            console.error("Failed to parse recentActivities from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    }, [leaveRequests]);

    useEffect(() => {
        localStorage.setItem('recentActivities', JSON.stringify(recentActivities));
    }, [recentActivities]);

    // Add Employee
    const addEmployee = (employee) => {
        const newEmployee = { id: uuidv4(), ...employee };
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        addRecentActivity(`${employee.name}`, 'added employee');
    };

    // Update Employee
    const updateEmployee = (id, updatedEmployee) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
                employee.id === id ? { ...employee, ...updatedEmployee } : employee
            )
        );
        addRecentActivity(`${updatedEmployee.name}`, 'updated employee details');
    };

    // Delete Employee
    const deleteEmployee = (id) => {
        const employeeToDelete = employees.find((employee) => employee.id === id);
        if (employeeToDelete) {
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee.id !== id)
            );
            addRecentActivity(`${employeeToDelete.name}`, 'deleted employee');
        }
    };

    // Add Leave Request
    const addLeaveRequest = (request) => {
        const newRequest = { id: uuidv4(), ...request };
        setLeaveRequests((prevRequests) => [...prevRequests, newRequest]);
        addRecentActivity(`${request.employee}`, 'requested leave');
    };

    // Approve Leave Request
    const approveLeaveRequest = (id) => {
        setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Approved' } : request
            )
        );
        const approvedRequest = leaveRequests.find((req) => req.id === id);
        addRecentActivity(`${approvedRequest.employee}`, 'leave approved');
    };

    // Reject Leave Request
    const rejectLeaveRequest = (id) => {
        setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Rejected' } : request
            )
        );
        const rejectedRequest = leaveRequests.find((req) => req.id === id);
        addRecentActivity(`${rejectedRequest.employee}`, 'leave rejected');
    };

    // Add Recent Activity
    const addRecentActivity = (action, type) => {
        const newActivity = {
            action,
            type,
            date: new Date().toISOString().split('T')[0], // format date as YYYY-MM-DD
        };
        setRecentActivities((prevActivities) => [newActivity, ...prevActivities].slice(0, 10)); // Keep only the 10 most recent activities
    };

    return (
        <AppContext.Provider
            value={{
                employees,
                addEmployee,
                updateEmployee, // Provide updateEmployee function to context
                deleteEmployee, // Provide deleteEmployee function to context
                leaveRequests,
                addLeaveRequest,
                approveLeaveRequest,
                rejectLeaveRequest,
                recentActivities,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
