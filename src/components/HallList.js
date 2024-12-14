import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Button from './ui/button.js';
import Card from './ui/card.js';
import Dialog from './ui/dialog.js';
import Input from './ui/input.js';
import Badge from './ui/badge.js';

function HallList() {
  const [halls, setHalls] = useState([]);
  const [newHall, setNewHall] = useState({ name: '', location: '', capacity: '', amenities: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await fetch('/api/halls');
      const data = await response.json();
      setHalls(data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/halls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...newHall,
          amenities: newHall.amenities.split(',').map(item => item.trim()),
        }),
      });
      if (response.ok) {
        fetchHalls();
        setNewHall({ name: '', location: '', capacity: '', amenities: '' });
      } else {
        console.error('Error adding hall');
      }
    } catch (error) {
      console.error('Error adding hall:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Halls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {halls.map((hall) => (
          <Card key={hall._id} className="overflow-hidden">
            <CardHeader className="bg-gray-100">
              <CardTitle>{hall.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-2">Location: {hall.location}</p>
              <p className="text-sm text-gray-600 mb-2">Capacity: {hall.capacity}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {hall.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">{amenity}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {user.role === 'admin' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Add New Hall</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hall</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddHall} className="space-y-4">
              <Input
                placeholder="Name"
                value={newHall.name}
                onChange={(e) => setNewHall({ ...newHall, name: e.target.value })}
                required
              />
              <Input
                placeholder="Location"
                value={newHall.location}
                onChange={(e) => setNewHall({ ...newHall, location: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Capacity"
                value={newHall.capacity}
                onChange={(e) => setNewHall({ ...newHall, capacity: e.target.value })}
                required
              />
              <Input
                placeholder="Amenities (comma-separated)"
                value={newHall.amenities}
                onChange={(e) => setNewHall({ ...newHall, amenities: e.target.value })}
                required
              />
              <Button type="submit">Add Hall</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default HallList;

