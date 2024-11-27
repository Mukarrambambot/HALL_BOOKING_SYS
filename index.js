import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; // Auth route for login, registration
import adminRoute from "./routes/admin.js"; // Admin specific routes
import bookingRoute from "./routes/booking.js"; // Booking route (probably for venue bookings)
import hallsRoute from "./routes/halls.js"; // Halls route (for hall management)
import staffRoute from "./routes/staff.js"; // Staff specific route (changed from studentRoute)

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json()); // This will allow you to parse incoming JSON requests

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    process.exit(1); // Exit process if MongoDB connection fails
  }
};

// MongoDB connection event listeners
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Root route to test if the API is running
app.get("/", (req, res) => {
  res.send("Hello World from Backend");
});

// Define API routes
app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/admin", adminRoute); // Admin routes
app.use("/api/booking", bookingRoute); // Booking routes
app.use("/api/halls", hallsRoute); // Halls management routes
app.use("/api/staff", staffRoute); // Staff route (was previously studentRoute)

// Start the server and connect to MongoDB
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connectDB();
  console.log(`Backend server started on port ${PORT}`);
});
