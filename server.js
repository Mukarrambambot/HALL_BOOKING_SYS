import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import hallRoutes from './routes/halls.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/bookings', bookingRoutes);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', e);
    }
  });
};

const PORT = process.env.PORT || 5000;
startServer(PORT);