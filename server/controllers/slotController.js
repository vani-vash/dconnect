import { db } from "../config/db.js";

/**
 * Mentor creates available slot
 */
export const createSlot = (req, res) => {
  const { start_time, end_time } = req.body;
  const { uid } = req.user;

  const findMentor = "SELECT user_id FROM users WHERE firebase_uid = ? AND role = 'mentor'";
  db.query(findMentor, [uid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(403).json({ error: "Mentor not found" });

    const mentorId = results[0].user_id;
    const insertSlot = `
      INSERT INTO mentor_slots (mentor_id, start_time, end_time)
      VALUES (?, ?, ?)
    `;
    db.query(insertSlot, [mentorId, start_time, end_time], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: "Slot created", slot_id: result.insertId });
    });
  });
};

/**
 * Mentor closes a slot
 */
export const closeSlot = (req, res) => {
  const { slot_id } = req.params;
  const query = "UPDATE mentor_slots SET is_open = FALSE WHERE slot_id = ?";
  db.query(query, [slot_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Slot closed successfully" });
  });
};

/**
 * List available slots (for mentees)
 */
export const listOpenSlots = (req, res) => {
  const query = `
    SELECT s.slot_id, s.start_time, s.end_time, u.full_name, u.expertise
    FROM mentor_slots s
    JOIN users u ON s.mentor_id = u.user_id
    WHERE s.is_open = TRUE
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

