import { db } from '../config/db.js';

export const reportUser = (req, res) => {
  const { reporter_id, reported_user_id, reason } = req.body;
  db.query('INSERT INTO reports (reporter_id, reported_user_id, reason) VALUES (?, ?, ?)', [reporter_id, reported_user_id, reason], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Report submitted!' });
  });
};

export const getReports = (req, res) => {
  db.query(
    `SELECT r.*, u1.full_name AS reporter_name, u2.full_name AS reported_name
     FROM reports r
     JOIN users u1 ON r.reporter_id = u1.user_id
     JOIN users u2 ON r.reported_user_id = u2.user_id
     ORDER BY r.created_at DESC`,
    (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.json(data);
    }
  );
};
