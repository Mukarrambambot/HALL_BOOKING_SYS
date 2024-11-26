import { useEffect, useState } from "react";
import React from 'react';


function AdminPendingRequests(props) {
  const [bookingData, setBookingData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalBookingId, setModalBookingId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("authToken"));
  const bookingDate = new Date();
  bookingDate.setDate(bookingDate.getDate() - 1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://au-hallbooking-backend.onrender.com/api/booking/adminBookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        if (response.ok) {
          const hallData = await response.json();
          setBookingData(hallData);
        } else {
          console.error("Failed to fetch booking data");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const filteredBookings =
    selectedStatus === "all"
      ? bookingData
      : bookingData.filter((booking) => booking.Status === selectedStatus);

  const getStatusClassName = (status) => {
    switch (status) {
      case "rejected":
        return "block w-full p-4 bg-[#fe3233] rounded-lg shadow-lg hover:bg-[#f0292a] hover:cursor-default";
      case "approved":
        return "block w-full p-4 bg-[#37b317] rounded-lg shadow-lg hover:bg-[#31a314] hover:cursor-default";
      case "pending":
        return "block w-full p-4 bg-[#c9c9c9] rounded-lg shadow-lg hover:bg-[#c0c0c0] hover:cursor-pointer";
      default:
        return "bg-white cursor-default";
    }
  };

  const handleDivClick = (status, id) => {
    if (status === "pending") {
      setModalBookingId(id);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalBookingId(null);
  };

  const handleReject = async (bookingId) => {
    try {
      const response = await fetch(
        "https://au-hallbooking-backend.onrender.com/api/booking/updateBooking",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify({
            _id: bookingId,
            Status: "rejected",
          }),
        }
      );

      if (response.ok) {
        console.log("Booking rejected successfully");
        setRefresh(!refresh);
      } else {
        console.error("Failed to reject booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      const response = await fetch(
        "https://au-hallbooking-backend.onrender.com/api/booking/updateBooking",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify({
            _id: bookingId,
            Status: "approved",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Booking approved successfully", data);
        setRefresh(!refresh);
      } else {
        console.error("Failed to approve booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions = { hour: "numeric", minute: "numeric" };

  return (
    <div className="bg-neutral-100 w-full">
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center flex-wrap">
            <span className="self-center mr-4 text-md md:text-2xl font-bold whitespace-nowrap">
              REQUESTS :{" "}
            </span>
            <ul className="font-medium mt-2 sm:mt-0 flex flex-wrap rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
              <li className="flex items-center mr-2 text-sm sm:text-md">
                <div className="h-4 w-6 bg-[#fe3233] mr-2"></div>
                <div>Rejected</div>
              </li>
              <li className="flex items-center mr-2 text-sm sm:text-md">
                <div className="h-4 w-6 bg-[#37b317] mr-2"></div>
                <div>Approved</div>
              </li>
              <li className="flex items-center mr-2 text-sm sm:text-md">
                <div className="h-4 w-6 bg-[#c9c9c9] mr-2"></div>
                <div>Pending</div>
              </li>
            </ul>
          </div>

          <div className="mt-2 lg:mt-0 w-full md:block md:w-auto" id="navbar-default">
            <select
              id="email"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
              required
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </nav>

      {isLoading ? (
        <div className="p-4 sm:p-10 text-center">Loading...</div>
      ) : (
        <div className="p-4 sm:p-10 max-h-[550px] overflow-y-auto">
          <ul>
            {filteredBookings.map((booking) => (
              <li key={booking._id} className="p-2">
                <div
                  className={`${getStatusClassName(booking.Status)}`}
                  onClick={() => handleDivClick(booking.Status, booking._id)}
                >
                  <h5 className="mb-2 text-xl font-bold tracking-tight">
                    {booking.Hall_Name} |{" "}
                    {new Date(booking.Date).toLocaleDateString("en-US", options)} |{" "}
                    {new Date(booking.Time_From).toLocaleTimeString("en-US", timeOptions)} TO{" "}
                    {new Date(booking.Time_To).toLocaleTimeString("en-US", timeOptions)}{" "}
                  </h5>
                  <div className="flex justify-between items-end">
                    <div className="font-normal text-black text-sm">
                      <div>Affiliated Department/Club: {booking.Affiliated}</div>
                      <div>Reason : {booking.Reason}</div>
                    </div>
                    <div className="text-sm">
                      <div>Submitted On :</div>
                      <div>{new Date(booking.createdAt).toLocaleString()}</div>
                    </div>
                  </div>

                  {booking.Status === "pending" && (
                    <div className="flex justify-end mt-2">
                      <button
                        className="bg-green-500 text-white hover:bg-green-600 font-semibold text-md px-4 py-2 rounded shadow hover:shadow-lg mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(booking._id);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white hover:bg-red-600 font-semibold text-md px-4 py-2 rounded shadow hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(booking._id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            {/* Additional details about the booking can go here */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPendingRequests;
