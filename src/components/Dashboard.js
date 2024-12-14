import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Card from './ui/card.js';
import Table from './ui/table.js';


function Dashboard() {
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch('/api/bookings/user', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await response.json();
      setUserBookings(data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hall</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.hall.name}</TableCell>
                  <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
                  <TableCell>{booking.purpose}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

