import { db } from '../config/db.js';

function calculateScore(mentor, menteeGoals) {
  let score = 0;
  const mentorSkills = mentor.skills.map(s => s.skill_name.toLowerCase());
  for (const goal of menteeGoals) {
    if (mentorSkills.includes(goal.toLowerCase())) score += 50;
  }
  if (mentor.open_slots > 0) score += 30;
  if (mentor.active_sessions < mentor.capacity_limit) score += 10;
  if (mentor.verified) score += 10;
  if (mentor.avg_rating && mentor.avg_rating >= 4) score += 20;
  return score;
}

export const getMatches = (req, res) => {
  const { mentee_id } = req.body;
  db.query('SELECT goal FROM mentee_goals WHERE mentee_id = ?', [mentee_id], (err, goals) => {
    if (err) return res.status(500).json({ error: err });
    const menteeGoals = goals.map(g => g.goal.toLowerCase());
    const mentorsQuery = `
      SELECT u.user_id, u.full_name, u.verified, u.capacity_limit, u.active_sessions,
             (SELECT COUNT(*) FROM mentor_slots s WHERE s.mentor_id = u.user_id AND s.is_open = TRUE) AS open_slots,
             (SELECT AVG(rating) FROM feedback f WHERE f.mentor_id = u.user_id) AS avg_rating
      FROM users u WHERE u.role = 'mentor'
    `;
    db.query(mentorsQuery, (err, mentors) => {
      if (err) return res.status(500).json({ error: err });
      const mentorIds = mentors.map(m => m.user_id);
      db.query('SELECT user_id, skill_name FROM skills WHERE user_id IN (?)', [mentorIds], (err, skillsData) => {
        if (err) return res.status(500).json({ error: err });
        mentors.forEach(m => {
          m.skills = skillsData.filter(s => s.user_id === m.user_id);
          m.match_score = calculateScore(m, menteeGoals);
        });
        const sorted = mentors.sort((a, b) => b.match_score - a.match_score);
        res.json(sorted);
      });
    });
  });
};
