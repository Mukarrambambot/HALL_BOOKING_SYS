import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import App from './App.js';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);  // Create root using the new API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
