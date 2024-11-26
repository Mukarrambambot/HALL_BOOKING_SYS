import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import PopupModal from "./popup_modal";

function StaffDashboardHallBookingBookingForm({ selectedHall }) {
  const [halls, setHalls] = useState([]);
  const [affiliatedDept, setAffiliatedDept] = useState("");
  const [Time_From, setTimeFrom] = useState("");
  const [Time_To, setTimeTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    setUserData(data);
  }, []);

  useEffect(() => {
    axios
      .get("https://au-hallbooking-backend.onrender.com/api/halls")
      .then((response) => {
        setHalls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hall data:", error);
      });
  }, []);

  const handleBooking = async (event) => {
    event.preventDefault();
    try {
      const data = {
        Student_ID: userData.Student_ID,
        Hall_Name: selectedHall.Hall_Name,
        Department: userData.Department,
        Affiliated: affiliatedDept,
        Date: selectedDate,
        Time_From: Time_From,
        Time_To: Time_To,
        Reason: reason,
      };

      const hallBooked = await fetch(
        "https://au-hallbooking-backend.onrender.com/api/booking/createBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (hallBooked.status === 200) {
        console.log("Booking created successfully");
        setShowSuccessMessage(true); //SUCCESS MESSAGE
        setShowErrorMessage(false);

        event.target.reset();

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Failed to create booking");
        setShowErrorMessage(true); //ERROR MESSAGE
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };

  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      console.log("Fetching available time slots...");
      fetch(
        `https://au-hallbooking-backend.onrender.com/api/booking/availableslots?hallname=${selectedHall.Hall_Name}&date=${selectedDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          const availableTimeSlots = data.availableTimeSlots.map(
            (timeStr) => new Date(timeStr)
          );
          setAvailableTimes(availableTimeSlots);
        });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (availableTimes.length > 0) {
      setTimeFrom(availableTimes[0]);
      setTimeTo(availableTimes[0]);
    }
  }, [availableTimes]);

  const [timeToOptions, setTimeToOptions] = useState([]);
  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value);
  };

  useEffect(() => {
    const index = availableTimes.findIndex(
      (time) =>
        time.toLocaleTimeString() === new Date(Time_From).toLocaleTimeString()
    );
    const timeToOptions = availableTimes.slice(index + 1).map((time, index) => (
      <option key={index} value={time}>
        {time.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </option>
    ));
    setTimeToOptions(timeToOptions);
  }, [Time_From]);

  const handleTimeToChange = (event) => {
    setTimeTo(event.target.value);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  return (
    <div className="sm:p-14 p-3 bg-zinc-100">
      <div className="text-sm sm:text-lg">
        Fill the following details and click submit to book the hall
      </div>
      {showSuccessMessage && (
        <PopupModal
          setShowModal={setShowSuccessMessage}
          message={
            "Your request has been successfully sent to the hall in charge."
          }
        />
      )}

      {showErrorMessage && (
        <PopupModal
          setShowModal={setShowErrorMessage}
          message={"There occurred an error, please try again."}
        />
      )}

      <form className="py-10 sm:pr-20" onSubmit={handleBooking}>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  DEPARTMENT
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={userData.Department}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  HALL FOR BOOKING
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={selectedHall.Hall_Name}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  AFFILIATED DEPARTMENT/ CLUB
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    setAffiliatedDept(e.target.value);
                  }}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  DATE
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="date"
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME FROM
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  id="TimeFrom"
                  value={Time_From}
                  onChange={handleTimeFromChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  required
                >
                  <option disabled value="">
                    Select a time
                  </option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time.toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME TO
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  value={Time_To}
                  onChange={handleTimeToChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  required
                >
                  <option disabled value="">
                    Select a time
                  </option>
                  {timeToOptions}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  REASON FOR BOOKING
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4" />
              <td>
                <button
                  type="submit"
                  className="sm:w-2/12 w-1/3 border border-blue-500 text-white font-semibold bg-blue-500 rounded-md px-6 py-2"
                >
                  BOOK NOW
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default StaffDashboardHallBookingBookingForm;
