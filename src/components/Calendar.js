import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../contexts/AuthContext';

function Calendar() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const bookings = await response.json();
      const formattedEvents = bookings.map(booking => ({
        id: booking._id,
        title: `${booking.hall.name} - ${booking.user.name}`,
        start: booking.startTime,
        end: booking.endTime,
        color: getStatusColor(booking.status),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'rejected':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        height="auto"
      />
    </div>
  );
}

export default Calendar;

