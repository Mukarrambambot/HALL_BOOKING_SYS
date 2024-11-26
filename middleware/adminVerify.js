import jwt from "jsonwebtoken";
import User from "../models/AdminModel.js"; // Ensure that you have the correct model path

// Middleware to protect admin routes by checking JWT
export const protectAdminRoutes = async (req, res, next) => {
  let token;
  
  // Check if the Authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from Authorization header
      token = req.headers.authorization.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ msg: "No token provided" });
      }

      // Decode and verify the token using the JWT secret from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the decoded ID (this is assuming you're storing the user info like admin ID in the token)
      req.user = await User.findById(decoded.id);

      // If no user is found
      if (!req.user) {
        return res.status(401).json({ msg: "User not found or unauthorized" });
      }

      // If everything is fine, allow the request to continue
      next();
      
    } catch (error) {
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
