import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import axios from 'axios';

function CalendarCom() {
  const [events, setEvents] = useState([]);

  // Fetch booking data from the backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Make an API request to get booking data
        const response = await axios.get(
          'https://au-hallbooking-backend.onrender.com/api/booking/allBookings'
        );

        // Map the booking data to FullCalendar event format
        const extractedEvents = response.data.map((booking) => ({
          start: booking.Time_From,  // Replace with the actual property names in your API response
          end: booking.Time_To,
          color: getEventColor(booking.Status),  // Set color based on booking status
          title: booking.Hall_Name,  // Use the hall name as the event title
        }));

        // Set the fetched events to the state
        setEvents(extractedEvents);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    // Call the fetch function on component mount
    fetchBookings();
  }, []);  // Empty dependency array ensures this runs only once after the component mounts

  // Function to determine event color based on booking status
  const getEventColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';  // Green for approved bookings
      case 'pending':
        return 'orange';  // Orange for pending bookings
      case 'rejected':
        return 'red';  // Red for rejected bookings
      default:
        return 'blue';  // Default color for unknown statuses
    }
  };

  return (
    <div className="w-full p-2 md:p-8 bg-zinc-100">
      <div className="bg-white p-5">
        <FullCalendar
          plugins={[dayGridPlugin]}  // Add day grid plugin for month view
          initialView="dayGridMonth"  // Set the initial view to month
          events={events}  // Pass the events array to FullCalendar
          displayEventEnd={true}  // Display the event end time
          eventMinHeight={30}  // Set minimum height for events
          eventDisplay="block"  // Set the event display to block
          eventColor="#434343"  // Default color for event text
          dayMaxEventRows={2}  // Limit the number of events displayed per day
          moreLinkClick="popover"  // Display a popover for events with more than the max row limit
        />
      </div>
    </div>
  );
}

export default CalendarCom;
