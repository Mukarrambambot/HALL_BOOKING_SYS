import mongoose from "mongoose";

// Define the schema for Halls
const hallsSchema = new mongoose.Schema(
  {
    facultyId: { // Changed to camelCase and more descriptive
      type: Number,
      required: true,
    },
    hallId: { // Changed to camelCase for consistency and more clear naming
      type: String,
      required: true,
      unique: true,
    },
    hallName: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    department: { // Changed to camelCase for consistency
      type: String,
      required: true,
    },
    description: { // Changed to camelCase for consistency
      type: String,
    },
    capacity: { // Changed to camelCase for consistency
      type: Number,
      required: false,
    },
    image1: { // Changed to camelCase for consistency
      type: String,
      required: false,
    },
    image2: { // Changed to camelCase for consistency
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Halls model
export default mongoose.model("Hall", hallsSchema);
