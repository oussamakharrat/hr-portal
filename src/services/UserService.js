// src/services/UserService.js

let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

// Register a new user
export const registerUser = async (user) => {
    const existingUser = registeredUsers.find((u) => u.email === user.email);
    if (existingUser) {
        throw new Error('User already exists with this email.');
    }

    // Store the new user without hashing for simplicity
    registeredUsers.push(user);
    
    // Save updated users to localStorage
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
};

// Login user
export const loginUser = async (email, password) => {
    const user = registeredUsers.find((u) => u.email === email);
    if (!user) {
        throw new Error('Invalid email or password.');
    }

    // Compare the password (assuming plain text for this example)
    if (user.password !== password) {
        throw new Error('Invalid email or password.');
    }

    return user; // Return the logged-in user
};

// Get all registered users
export const getRegisteredUsers = () => {
    return registeredUsers;
};

// Additional user management functions
export const registerUserWithRole = async (user) => {
    await registerUser(user); // Reuse registerUser
};

// Other utility functions...
