import staff from "../models/StaffModel.js";  // Assuming you're using a Staff model
import bcrypt from "bcryptjs";  // To hash passwords, if needed
import jwt from "jsonwebtoken";  // For token generation (if using JWT authentication)

// CREATE STAFF (Only Admin or HOD can create staff accounts)
export const createStaff = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Check if staff already exists
        const existingStaff = await staff.findOne({ username });
        if (existingStaff) {
            return res.status(400).json({
                status: "Failed",
                message: "Staff already exists"
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new staff
        const newStaff = new staff({
            username,
            password: hashedPassword,
            role  // e.g., "Class Incharge", "HOD"
        });

        const savedStaff = await newStaff.save();
        res.status(200).json(savedStaff);
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || err
        });
    }
};

// STAFF LOGIN
export const staffLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find staff by username
        const staffMember = await staff.findOne({ username });
        if (!staffMember) {
            return res.status(400).json({
                status: "Failed",
                message: "Staff not found"
            });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, staffMember.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: staffMember._id, role: staffMember.role },
            process.env.JWT_SECRET, // Ensure you have a secret key for JWT
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: "Success",
            message: "Login successful",
            token
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || err
        });
    }
};

// GET STAFF PROFILE
export const getStaffProfile = async (req, res) => {
    try {
        const staffMember = await staff.findById(req.params.id);
        if (!staffMember) {
            return res.status(404).json({
                status: "Not Found",
                message: "Staff not found"
            });
        }
        res.status(200).json(staffMember);
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || err
        });
    }
};

// UPDATE STAFF INFORMATION (for admins, class incharge, or HOD)
export const updateStaff = async (req, res) => {
    try {
        const updatedStaff = await staff.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedStaff) {
            return res.status(404).json({
                status: "Not Found",
                message: "Staff not found"
            });
        }
        res.status(200).json(updatedStaff);
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || err
        });
    }
};

// DELETE STAFF (For admin use)
export const deleteStaff = async (req, res) => {
    try {
        const deletedStaff = await staff.findByIdAndDelete(req.params.id);
        if (!deletedStaff) {
            return res.status(404).json({
                status: "Not Found",
                message: "Staff not found"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Staff member deleted"
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message || err
        });
    }
};
