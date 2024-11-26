import mongoose from "mongoose";

// Define the schema for Booking
const bookingSchema = new mongoose.Schema(
  {
    bookingId: { // Changed to camelCase for consistency
      type: Number,
      required: true,
      unique: true, // Ensure Booking_ID is unique
    },
    facultyId: { // Changed to camelCase for consistency
      type: Number,
      required: true,
    },
    hallName: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    staffId: { // Changed field name from 'Student_ID' to 'Staff_ID'
      type: String,
      required: true,
    },
    department: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    affiliated: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["rejected", "approved", "pending"],
      default: "pending",
    },
    date: { // Changed to camelCase for consistency
      type: Date,
      required: true,
    },
    timeFrom: { // Changed to camelCase for consistency
      type: Date,
      required: false,
    },
    timeTo: { // Changed to camelCase for consistency
      type: Date,
      required: false,
    },
    reason: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    remark: { // Changed to camelCase for consistency
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the model and export it
export default mongoose.model("Booking", bookingSchema);

