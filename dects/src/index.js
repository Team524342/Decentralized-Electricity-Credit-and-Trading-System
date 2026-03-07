import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';

/**
 * Application Entry Point
 * Initializes React application with root component
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

// Enable strict mode for development to catch potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Log when app is mounted
if (process.env.NODE_ENV === 'development') {
  console.log('RTDECTS Application initialized');
}

