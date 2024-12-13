import express from 'express';
import Booking from '../models/Booking.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { sendBookingConfirmation, sendAdminNotification } from '../utils/emailService.js';

const router = express.Router();

// ... (previous code)

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.userId,
    });
    await booking.save();
    await sendAdminNotification(booking);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user').populate('hall');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (status === 'approved') {
      await sendBookingConfirmation(booking);
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

