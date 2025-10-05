import React, { useState, useEffect } from 'react';
import './MentorMatching.css';

function MentorMatching({ menteeId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    timezone: '',
    experience: '',
    availability: ''
  });
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      // This would be an API call to your backend
      const response = await fetch('http://localhost:3000/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          mentee_id: menteeId,
          filters: filters
        })
      });
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Mock data for demonstration
      setMatches([
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Senior Software Engineer',
          company: 'Google',
          skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
          rating: 4.8,
          experience: '5 years',
          timezone: 'UTC-8',
          availability: 'Weekends',
          bio: 'Passionate about helping newcomers in open source. I specialize in React and Python development.',
          verified: true,
          matchScore: 95,
          image: '/default-avatar.png'
        },
        {
          id: 2,
          name: 'Mike Chen',
          role: 'Full Stack Developer',
          company: 'Microsoft',
          skills: ['JavaScript', 'React', 'Vue.js', 'Node.js'],
          rating: 4.6,
          experience: '3 years',
          timezone: 'UTC-5',
          availability: 'Evenings',
          bio: 'Open source contributor with expertise in modern JavaScript frameworks.',
          verified: true,
          matchScore: 88,
          image: '/default-avatar.png'
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          role: 'DevOps Engineer',
          company: 'Amazon',
          skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
          rating: 4.9,
          experience: '4 years',
          timezone: 'UTC-7',
          availability: 'Weekdays',
          bio: 'DevOps expert helping students understand cloud technologies and deployment.',
          verified: true,
          matchScore: 82,
          image: '/default-avatar.png'
        }
      ]);
    }
    setLoading(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const requestMentorship = async (mentorId) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/request-mentorship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          mentor_id: mentorId,
          mentee_id: menteeId
        })
      });
      
      if (response.ok) {
        alert('Mentorship request sent successfully!');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Mentorship request sent! (Demo mode)');
    }
  };

  const startChat = (mentorId) => {
    // This would open the chat interface
    console.log('Starting chat with mentor:', mentorId);
  };

  return (
    <div className="mentor-matching">
      <div className="matching-header">
        <h2>Find Your Perfect Mentor</h2>
        <p>Our AI-powered matching system connects you with experienced mentors</p>
      </div>

      <div className="filters-section">
        <h3>Filter Your Matches</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Skills</label>
            <input
              type="text"
              placeholder="e.g., React, Python, Machine Learning"
              value={filters.skills.join(', ')}
              onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()))}
            />
          </div>
          <div className="filter-group">
            <label>Timezone</label>
            <select
              value={filters.timezone}
              onChange={(e) => handleFilterChange('timezone', e.target.value)}
            >
              <option value="">Any Timezone</option>
              <option value="UTC-8">UTC-8 (PST)</option>
              <option value="UTC-5">UTC-5 (EST)</option>
              <option value="UTC+0">UTC+0 (GMT)</option>
              <option value="UTC+5">UTC+5 (IST)</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Experience Level</label>
            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
            >
              <option value="">Any Experience</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
            >
              <option value="">Any Time</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
            </select>
          </div>
        </div>
      </div>

      <div className="matches-section">
        <h3>Your Matches</h3>
        {loading ? (
          <div className="loading">Finding your perfect matches...</div>
        ) : (
          <div className="matches-grid">
            {matches.map((mentor) => (
              <div key={mentor.id} className="mentor-card">
                <div className="mentor-header">
                  <img src={mentor.image} alt={mentor.name} className="mentor-avatar" />
                  <div className="mentor-info">
                    <h4>{mentor.name}</h4>
                    <p className="mentor-role">{mentor.role} at {mentor.company}</p>
                    <div className="mentor-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-value">{mentor.rating}</span>
                    </div>
                  </div>
                  <div className="match-score">
                    <div className="score-circle">
                      <span>{mentor.matchScore}%</span>
                    </div>
                    <p>Match</p>
                  </div>
                </div>

                <div className="mentor-details">
                  <p className="mentor-bio">{mentor.bio}</p>
                  
                  <div className="mentor-skills">
                    <h5>Skills:</h5>
                    <div className="skills-list">
                      {mentor.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mentor-meta">
                    <div className="meta-item">
                      <strong>Experience:</strong> {mentor.experience}
                    </div>
                    <div className="meta-item">
                      <strong>Timezone:</strong> {mentor.timezone}
                    </div>
                    <div className="meta-item">
                      <strong>Available:</strong> {mentor.availability}
                    </div>
                    <div className="meta-item">
                      <strong>Verified:</strong> {mentor.verified ? '✓ Yes' : '○ No'}
                    </div>
                  </div>
                </div>

                <div className="mentor-actions">
                  <button 
                    className="request-btn"
                    onClick={() => requestMentorship(mentor.id)}
                  >
                    Request Mentorship
                  </button>
                  <button 
                    className="chat-btn"
                    onClick={() => startChat(mentor.id)}
                  >
                    Start Chat
                  </button>
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMentor && (
        <div className="mentor-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedMentor.name}'s Profile</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedMentor(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-avatar">
                <img src={selectedMentor.image} alt={selectedMentor.name} />
              </div>
              <div className="modal-info">
                <h4>{selectedMentor.name}</h4>
                <p>{selectedMentor.role} at {selectedMentor.company}</p>
                <p className="modal-bio">{selectedMentor.bio}</p>
                <div className="modal-skills">
                  <h5>Skills:</h5>
                  <div className="skills-list">
                    {selectedMentor.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="request-btn"
                onClick={() => {
                  requestMentorship(selectedMentor.id);
                  setSelectedMentor(null);
                }}
              >
                Request Mentorship
              </button>
              <button 
                className="chat-btn"
                onClick={() => {
                  startChat(selectedMentor.id);
                  setSelectedMentor(null);
                }}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentorMatching;

