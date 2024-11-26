import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Import global styles if necessary
import App from './App'; // Import the App component
import reportWebVitals from './reportWebVitals';

// Create the root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
