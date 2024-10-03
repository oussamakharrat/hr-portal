// src/context/AppContext.jsx

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

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    useEffect(() => {
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    }, [leaveRequests]);

    const addEmployee = (employee) => {
        setEmployees((prevEmployees) => [
            ...prevEmployees,
            { id: uuidv4(), ...employee },
        ]);
    };

    const addLeaveRequest = (request) => {
        setLeaveRequests((prevRequests) => [
            ...prevRequests,
            { id: uuidv4(), ...request },
        ]);
    };

    const approveLeaveRequest = (id) => {
        setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Approved' } : request
            )
        );
    };

    const rejectLeaveRequest = (id) => {
        setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: 'Rejected' } : request
            )
        );
    };

    return (
        <AppContext.Provider value={{ employees, addEmployee, leaveRequests, addLeaveRequest, approveLeaveRequest, rejectLeaveRequest }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
