import { db } from '../config/db.js';

export const addFeedback = (req, res) => {
  const { session_id, mentee_id, mentor_id, rating, comments } = req.body;
  db.query('INSERT INTO feedback (session_id, mentee_id, mentor_id, rating, comments) VALUES (?, ?, ?, ?, ?)', [session_id, mentee_id, mentor_id, rating, comments], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Feedback submitted!' });
  });
};

export const getFeedbackByMentor = (req, res) => {
  const { mentor_id } = req.params;
  const q = `
    SELECT f.*, u.full_name AS mentee_name
    FROM feedback f
    JOIN users u ON f.mentee_id = u.user_id
    WHERE f.mentor_id = ?
  `;
  db.query(q, [mentor_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};
