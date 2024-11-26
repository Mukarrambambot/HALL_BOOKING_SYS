import express from "express";
import { generateToken } from "../config/generateToken.js"; // Adjust path if necessary
import { authAdmin, registerAdmin } from "../controllers/admin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", authAdmin);

export default router;
