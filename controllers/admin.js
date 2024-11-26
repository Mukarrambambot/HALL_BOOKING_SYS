import asyncHandler from "express-async-handler";
import User from "../models/AdminModel.js";
import { generateToken } from "../config/generateToken.js"; // Adjust path if necessary
import bcrypt from "bcryptjs";

// Register a new admin
export const registerAdmin = asyncHandler(async (req, res) => {
  const { adminId, adminName, department, password, email } = req.body;

  // Check for missing fields
  if (!adminId || !adminName || !password || !department || !email) {
    return res.status(400).json({ msg: "Please fill all required fields" });
  }

  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json({ msg: "User with this email already exists." });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    adminId,
    email,
    adminName,
    password: secpass,
    department,
  });

  // Check if user creation was successful
  if (user) {
    res.status(201).json({
      _id: user._id,
      adminId: user.adminId,
      adminName: user.adminName,
      department: user.department,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ msg: "Failed to create user." });
  }
});

// Authenticate an admin
export const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user existence
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Invalid credentials." });
  }

  // Compare password
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (passwordCompare) {
    res.status(200).json({
      _id: user._id,
      adminId: user.adminId,
      adminName: user.adminName,
      department: user.department,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({ msg: "Invalid credentials." });
  }
});

// Restrict access (placeholder for future implementation)
export const restrictTo = () => {
  // Implementation to restrict access based on roles can be added here
};
