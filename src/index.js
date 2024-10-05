// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>  {/* Ensure that AuthProvider wraps the entire app */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
