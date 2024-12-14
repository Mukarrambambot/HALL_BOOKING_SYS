import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import Button from './ui/button.js';
import Card from './ui/card.js';
import Input from './ui/input.js';
import Select from './ui/select.js';
import useToast from './ui/use-toast.js';
import Badge from './ui/badge.js';


function BookingForm() {
  const [halls, setHalls] = useState([]);
  const [booking, setBooking] = useState({
    hall: '',
    startTime: '',
    endTime: '',
    purpose: '',
  });
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const { toast } = useToast();

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
      toast({
        title: 'Error',
        description: 'Failed to fetch halls. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!booking.hall) newErrors.hall = 'Please select a hall';
    if (!booking.startTime) newErrors.startTime = 'Please select a start time';
    if (!booking.endTime) newErrors.endTime = 'Please select an end time';
    if (!booking.purpose) newErrors.purpose = 'Please enter a purpose for booking';
    if (new Date(booking.startTime) >= new Date(booking.endTime)) {
      newErrors.endTime = 'End time must be after start time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(booking),
      });
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Booking submitted successfully!',
        });
        setBooking({ hall: '', startTime: '', endTime: '', purpose: '' });
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Failed to submit booking. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Book a Hall</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Select
                value={booking.hall}
                onValueChange={(value) => setBooking({ ...booking, hall: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a hall" />
                </SelectTrigger>
                <SelectContent>
                  {halls.map((hall) => (
                    <SelectItem key={hall._id} value={hall._id}>
                      <div>
                        <div>{hall.name}</div>
                        <div className="text-sm text-gray-500">
                          Capacity: {hall.capacity}, Location: {hall.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hall.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.hall && <p className="text-red-500 text-sm mt-1">{errors.hall}</p>}
            </div>
            <div>
              <Input
                type="datetime-local"
                value={booking.startTime}
                onChange={(e) => setBooking({ ...booking, startTime: e.target.value })}
              />
              {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
            </div>
            <div>
              <Input
                type="datetime-local"
                value={booking.endTime}
                onChange={(e) => setBooking({ ...booking, endTime: e.target.value })}
              />
              {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
            </div>
            <div>
              <Input
                placeholder="Purpose of booking"
                value={booking.purpose}
                onChange={(e) => setBooking({ ...booking, purpose: e.target.value })}
              />
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>
            <Button type="submit">Submit Booking</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingForm;

