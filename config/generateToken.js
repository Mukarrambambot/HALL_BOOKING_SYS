import jwt from "jsonwebtoken";

/**
 * Generates a JWT token.
 *
 * @param {string} id - The user ID to be included in the token payload.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Adjust expiration time as needed
    });
    return token;
  } catch (error) {
    console.error("Failed to generate token", error);
    throw new Error("Token generation failed");
  }
};
