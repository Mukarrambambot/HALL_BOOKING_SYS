import express from "express";
import { createHall, getAllHalls, getHall } from "../controllers/halls.js"; // Assuming controllers are already implemented
import { protectUserRoutes } from "../middleware/authmiddleware.js"; // Protect routes for regular users (optional)
import { protectAdminRoutes } from "../middleware/adminVerify.js"; // Protect routes for admins

const router = express.Router();

// CREATE Hall - Accessible only by Admins
router.post("/", protectAdminRoutes, createHall);

// GET specific Hall - Accessible by both Admins and Users
router.get("/:hallId", protectUserRoutes, getHall); // This is updated to fetch a specific hall by ID

// GET ALL Halls - Accessible by both Admins and Users
router.get("/getAllHalls", protectUserRoutes, getAllHalls); // Ensuring it's available to both admin and users

export default router;
