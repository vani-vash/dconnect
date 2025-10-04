import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ session_id, mentee_id, mentor_id }) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/feedback', { session_id, mentee_id, mentor_id, rating, comments }, { headers: { Authorization: `Bearer ${token}` } });
    alert('Feedback submitted!');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(e.target.value)} />
      <textarea placeholder="Comment" value={comments} onChange={(e) => setComments(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default FeedbackForm;
