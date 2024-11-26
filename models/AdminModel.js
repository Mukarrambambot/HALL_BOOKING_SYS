import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // To hash the password before saving

// Define the schema for Admin
const adminSchema = new mongoose.Schema(
  {
    adminId: {
      type: Number,
      required: true,
      unique: true, // Ensure unique adminId
    },
    adminName: {
      type: String,
      required: true, // Name is mandatory
    },
    department: {
      type: String,
      required: true, // Department is mandatory
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true, // Ensure email is unique
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'], // Regex to validate email format
    },
    password: {
      type: String,
      required: true, // Password is mandatory
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Pre-save middleware to hash the password before saving to the database
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If password is not modified, proceed
  try {
    // Hash the password with 10 rounds of salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error); // Pass error to the next middleware if hashing fails
  }
});

// Method to compare password entered with hashed password in the database
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model and export it
export default mongoose.model('Admin', adminSchema);
