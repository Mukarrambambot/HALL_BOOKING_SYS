import asyncHandler from "express-async-handler";
import User from "../models/StaffModel.js";  // Assuming this is the model you're using
import { generateToken } from "../config/generateToken.js";  // Assuming this is where the token is generated
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { Student_ID, Student_Name, Department, Password, Email } = req.body;

  // Check if all required fields are provided
  if (!Student_ID || !Student_Name || !Password || !Department || !Email) {
    return res.status(400).json({ msg: "Please fill all required fields." });
  }

  // Check if the user with the provided email already exists
  const userExist = await User.findOne({ Email });
  if (userExist) {
    return res.status(400).json({ msg: "User with this email already exists." });
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  // Create a new user in the database
  const newUser = await User.create({
    Student_ID,
    Email,
    Student_Name,
    Password: hashedPassword,
    Department,
  });

  if (newUser) {
    // Send success response with user details and token
    res.status(201).json({
      _id: newUser._id,
      Student_ID: newUser.Student_ID,
      Student_Name: newUser.Student_Name,
      Department: newUser.Department,
      Email: newUser.Email,
      token: generateToken(newUser._id),  // Generating JWT token
    });
  } else {
    // Send error response if user creation fails
    res.status(400).json({ msg: "Failed to create user." });
  }
});

// Authenticate a user (login)
export const authUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  // Validate input fields
  if (!Email || !Password) {
    return res.status(400).json({ msg: "Please provide both email and password." });
  }

  // Find the user by email
  const user = await User.findOne({ Email });
  
  // If user doesn't exist, send error response
  if (!user) {
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  // Compare the provided password with the stored password
  const passwordMatch = await bcrypt.compare(Password, user.Password);
  
  // If passwords match, send success response with user details and token
  if (passwordMatch) {
    res.status(200).json({
      _id: user._id,
      Student_ID: user.Student_ID,
      Student_Name: user.Student_Name,
      Department: user.Department,
      Email: user.Email,
      token: generateToken(user._id),  // Generate JWT token
    });
  } else {
    // If passwords do not match, send error response
    return res.status(401).json({ msg: "Invalid credentials." });
  }
});
