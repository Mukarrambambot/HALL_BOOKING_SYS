import booking from "../models/BookingModel.js";
import halls from "../models/HallsModel.js";
import { autoInc } from "../utils/AutoIncrement.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  const { Hall_Name, Date, Time_From, Time_To, Faculty_ID, Student_ID, Status } = req.body;

  // Validate required fields
  if (!Hall_Name || !Date || !Time_From || !Time_To || !Student_ID) {
    return res.status(400).json({ status: "Failed", message: "Missing required fields." });
  }

  try {
    // Fetch hall details
    const hallData = await halls.findOne({ Hall_Name });
    if (!hallData) {
      return res.status(404).json({ status: "Failed", message: "Hall not found." });
    }

    // Assign Faculty_ID from the hall
    req.body.Faculty_ID = hallData.Faculty_ID;

    // Generate booking ID using autoIncrement
    const bookingId = await autoInc();
    req.body.Booking_ID = bookingId;

    // Create a new booking entry
    const newBooking = new booking(req.body);
    const savedBooking = await newBooking.save();
    
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error creating booking."
    });
  }
};

// DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ status: "Failed", message: "Booking not found." });
    }
    res.status(200).json({ status: "Success", message: "Booking has been deleted" });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error deleting booking."
    });
  }
};

// GET BOOKING
export const getBooking = async (req, res) => {
  try {
    const bookingDetails = await booking.findById(req.params.id);
    if (!bookingDetails) {
      return res.status(404).json({ status: "Failed", message: "Booking not found." });
    }
    res.status(200).json(bookingDetails);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error retrieving booking."
    });
  }
};

// GET USER'S BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user;
    const userBookings = await booking.find({ Student_ID: user.Student_ID });
    res.status(200).json(userBookings);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error retrieving user's bookings."
    });
  }
};

// GET ADMIN'S BOOKINGS
export const getAdminBookings = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    const adminBookings = await booking.find({ Faculty_ID: adminId });
    res.status(200).json(adminBookings);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error retrieving admin's bookings."
    });
  }
};

// UPDATE BOOKING STATUS
export const updateBooking = async (req, res) => {
  const { _id, Status } = req.body;

  if (!Status) {
    return res.status(400).json({ status: "Failed", message: "Status is required." });
  }

  try {
    const updatedBooking = await booking.findByIdAndUpdate(
      _id,
      { Status },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ status: "Failed", message: "Booking not found." });
    }
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error updating booking."
    });
  }
};

// GET ALL BOOKINGS (APPROVED OR PENDING)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await booking.find({
      Status: { $in: ["approved", "pending"] },
    });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error retrieving all bookings."
    });
  }
};

// GET AVAILABLE TIMESLOTS
export const getAvailableTimes = async (req, res) => {
  try {
    const hallName = req.query.hallname;
    const date = req.query.date;

    if (!hallName || !date) {
      return res.status(400).json({ status: "Failed", message: "Hall name and date are required." });
    }

    // Fetch approved bookings for the given hall and date
    const bookedSlots = await booking.find({
      Status: "approved",
      Hall_Name: hallName,
      Date: date,
    });

    // Define opening and closing time for the hall
    const openingTime = new Date(date);
    openingTime.setHours(6, 0, 0, 0);

    const closingTime = new Date(date);
    closingTime.setHours(20, 30, 0, 0);

    // Generate time slots from opening time to closing time
    const timeSlots = [];
    const currentTime = new Date(openingTime);
    
    while (currentTime <= closingTime) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30); // 30-minute intervals
    }

    // Filter out booked slots
    const availableTimeSlots = timeSlots.filter((timeSlot) => {
      return !bookedSlots.some((booking) => {
        return timeSlot >= booking.Time_From && timeSlot < booking.Time_To;
      });
    });

    res.status(200).json({ availableTimeSlots });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message || "Error retrieving available time slots."
    });
  }
};
