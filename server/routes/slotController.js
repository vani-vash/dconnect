// controllers/slotController.js
import { db } from '../config/db.js';

// ✅ 1. Mentor creates a slot
export const createSlot = (req, res) => {
  const { start_time, end_time } = req.body;
  const firebase_uid = req.user.uid;

  const findMentor = 'SELECT user_id FROM users WHERE firebase_uid = ? AND role = "mentor"';
  db.query(findMentor, [firebase_uid], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(403).json({ error: 'Mentor not found' });

    const mentor_id = result[0].user_id;
    const insertSlot = `
      INSERT INTO mentor_slots (mentor_id, start_time, end_time)
      VALUES (?, ?, ?)
    `;
    db.query(insertSlot, [mentor_id, start_time, end_time], (err2, result2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ message: 'Slot created successfully', slot_id: result2.insertId });
    });
  });
};

// ✅ 2. List all open slots (for mentees)
export const getSlots = (req, res) => {
  const q = `
    SELECT s.slot_id, s.start_time, s.end_time, u.full_name, u.expertise
    FROM mentor_slots s
    JOIN users u ON s.mentor_id = u.user_id
    WHERE s.is_open = TRUE
    ORDER BY s.start_time ASC
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// ✅ 3. Close a slot
export const closeSlot = (req, res) => {
  const { slot_id } = req.params;
  const firebase_uid = req.user.uid;

  const q = `
    UPDATE mentor_slots 
    SET is_open = FALSE 
    WHERE slot_id = ? 
    AND mentor_id = (SELECT user_id FROM users WHERE firebase_uid = ?)
  `;
  db.query(q, [slot_id, firebase_uid], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Slot not found or not owned by you' });
    res.status(200).json({ message: 'Slot closed successfully' });
  });
};

