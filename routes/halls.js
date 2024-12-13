import express from 'express';
import Hall from '../models/Hall.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all halls
router.get('/', async (req, res) => {
  try {
    const halls = await Hall.find();
    res.json(halls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new hall (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const hall = new Hall(req.body);
    await hall.save();
    res.status(201).json(hall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a hall (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json(hall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a hall (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) return res.status(404).json({ error: 'Hall not found' });
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

