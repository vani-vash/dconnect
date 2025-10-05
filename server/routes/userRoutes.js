// Add this after other imports
import express from 'express';
import { db } from '../config/db.js';
const router = express.Router();

// ✅ Get all mentors (for Dashboard.jsx)
router.get('/mentors', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE role = "mentor"');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching mentors:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
