import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            Hall Booking System
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            {user ? (
              <>
                <Link to="/dashboard" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Dashboard
                </Link>
                <Link to="/halls" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Halls
                </Link>
                <Link to="/book" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Book a Hall
                </Link>
                <Link to="/calendar" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Calendar
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block mt-4 md:inline-block md:mt-0 mr-6">
                    Admin
                  </Link>
                )}
                <Button onClick={logout} variant="outline" className="mt-4 md:mt-0">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Login
                </Link>
                <Link to="/register" className="block mt-4 md:inline-block md:mt-0 mr-6">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

