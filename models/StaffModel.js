import mongoose from "mongoose";

// Define the schema for Staff
const staffSchema = new mongoose.Schema(
  {
    staffId: { // Changed from Student_ID to staffId for consistency
      type: Number,
      required: true,
      unique: true,
    },
    staffName: { // Changed from Student_Name to staffName for consistency
      type: String,
      required: true,
    },
    department: { // Changed to lowercase "department" for consistency
      type: String,
      required: true,
    },
    email: { // Changed to lowercase "email" for consistency
      type: String,
      required: true,
      unique: true,
    },
    password: { // Changed to lowercase "password" for consistency
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Staff model
export default mongoose.model("Staff", staffSchema);
