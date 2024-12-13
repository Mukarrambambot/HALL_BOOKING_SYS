import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import HallList from './components/HallList';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Calendar from './components/Calendar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/halls" component={HallList} />
                <PrivateRoute path="/book" component={BookingForm} />
                <PrivateRoute path="/admin" component={AdminDashboard} roles={['admin']} />
                <PrivateRoute path="/calendar" component={Calendar} />
              </Switch>
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

