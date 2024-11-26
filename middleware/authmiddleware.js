import jwt from "jsonwebtoken";
import User from "../models/StaffModel.js"; // Adjust the path to your Staff model

// Middleware to protect user routes by checking JWT
export const protectUserRoutes = async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // If token is missing
      if (!token) {
        return res.status(401).json({ msg: "Token is missing" });
      }

      // Decode and verify the token using the JWT secret from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Look up the user in the database using the decoded ID
      req.user = await User.findById(decoded.id);

      // If no user is found or the user is unauthorized
      if (!req.user) {
        return res.status(401).json({ msg: "User not found or unauthorized" });
      }

      // If everything is fine, allow the request to continue
      next();

    } catch (error) {
      // Handle different error scenarios with appropriate responses
      console.error(error);
      return res.status(401).json({
        msg: "Token is invalid or expired",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({
      msg: "Authorization token is missing or malformed",
    });
  }
};
