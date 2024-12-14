import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import PrivateRoute from './components/PrivateRoute.js';
import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import HallList from './components/HallList.js';
import BookingForm from './components/BookingForm.js';
import AdminDashboard from './components/AdminDashboard.js';
import Calendar from './components/Calendar.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/halls" element={<PrivateRoute><HallList /></PrivateRoute>} />
                <Route path="/book" element={<PrivateRoute><BookingForm /></PrivateRoute>} />
                <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
                <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
              </Routes>
            </div>
          </main>
          <footer className="bg-gray-100 py-4">
            <div className="container mx-auto px-4 text-center text-gray-600">
              &copy; 2023 Patrician College Hall Booking System
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

