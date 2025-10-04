import React, { useState } from 'react';
import axios from 'axios';

function FindMentor({ mentee_id }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatches = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:3000/api/match', { mentee_id }, { headers: { Authorization: `Bearer ${token}` } });
    setMatches(res.data);
    setLoading(false);
  };

  return (
    <div>
      <h2>🎯 Find Your Mentor Matches</h2>
      <button onClick={findMatches}>{loading ? 'Finding...' : 'Find Matches'}</button>
      <ul>
        {matches.map(m => <li key={m.user_id}>{m.full_name} ({m.match_score}) {m.verified && '✅'}</li>)}
      </ul>
    </div>
  );
}
export default FindMentor;
