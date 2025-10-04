import { db } from "../config/db.js";

/**
 * @desc Sync Firebase user to MySQL users table
 * @route POST /api/users/sync
 * @access Private
 */
export const syncUser = (req, res) => {
  const { uid, email, name } = req.user;
  const { role } = req.body; // mentor or mentee

  const checkQuery = "SELECT * FROM users WHERE firebase_uid = ?";

  db.query(checkQuery, [uid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // If user exists → return existing
    if (results.length > 0) {
      return res.json({ message: "User already exists", user: results[0] });
    }

    // Create new user
    const insertQuery = `
      INSERT INTO users (firebase_uid, role, full_name, email)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [uid, role || "mentee", name || "", email], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({
        message: "User synced successfully",
        user: {
          user_id: result.insertId,
          firebase_uid: uid,
          email,
          full_name: name,
          role,
        },
      });
    });
  });
};

/**
 * @desc Get current user's profile
 */
export const getProfile = (req, res) => {
  const { uid } = req.user;
  const query = "SELECT * FROM users WHERE firebase_uid = ?";
  db.query(query, [uid], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
};

