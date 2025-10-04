import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({ user }) {
  const [slots, setSlots] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [mentors, setMentors] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user) return;
    if (user.role === 'mentor') {
      axios.get(`http://localhost:3000/api/slots/${user.user_id}`).then(res => setSlots(res.data));
      axios.get(`http://localhost:3000/api/feedback/${user.user_id}`).then(res => setFeedbacks(res.data));
    } else {
      axios.get(`http://localhost:3000/api/users/mentors`).then(res => setMentors(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>{user?.role === 'mentor' ? 'Mentor Dashboard' : 'Mentee Dashboard'}</h2>
      {user?.role === 'mentor' ? (
        <>
          <h3>Your Slots</h3>
          <ul>{slots.map(s => <li key={s.slot_id}>{new Date(s.start_time).toLocaleString()}</li>)}</ul>
          <h3>Feedback</h3>
          <ul>{feedbacks.map(f => <li key={f.feedback_id}>{f.mentee_name}: {f.rating}⭐ - {f.comments}</li>)}</ul>
        </>
      ) : (
        <>
          <h3>Available Mentors</h3>
          <ul>{mentors.map(m => <li key={m.user_id}>{m.full_name} {m.verified && '✅'}</li>)}</ul>
        </>
      )}
    </div>
  );
}
export default Dashboard;
