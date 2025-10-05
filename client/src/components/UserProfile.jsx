import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    role: user?.role || 'mentee',
    skills: user?.skills || [],
    goals: user?.goals || [],
    experience: user?.experience || '',
    availability: user?.availability || {},
    bio: user?.bio || '',
    timezone: user?.timezone || '',
    github: user?.github || '',
    linkedin: user?.linkedin || ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setFormData(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (index) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user?.photoURL || '/default-avatar.png'} alt="Profile" />
          <div className="verification-badge">
            {user?.verified ? '✓' : '○'}
          </div>
        </div>
        <div className="profile-info">
          <h2>{formData.fullName}</h2>
          <p className="role-badge">{formData.role}</p>
          <p className="email">{formData.email}</p>
          <div className="social-links">
            {formData.github && (
              <a href={formData.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {formData.linkedin && (
              <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
              >
                <option value="">Select Timezone</option>
                <option value="UTC-12">UTC-12</option>
                <option value="UTC-11">UTC-11</option>
                <option value="UTC-10">UTC-10</option>
                <option value="UTC-9">UTC-9</option>
                <option value="UTC-8">UTC-8</option>
                <option value="UTC-7">UTC-7</option>
                <option value="UTC-6">UTC-6</option>
                <option value="UTC-5">UTC-5</option>
                <option value="UTC-4">UTC-4</option>
                <option value="UTC-3">UTC-3</option>
                <option value="UTC-2">UTC-2</option>
                <option value="UTC-1">UTC-1</option>
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+1">UTC+1</option>
                <option value="UTC+2">UTC+2</option>
                <option value="UTC+3">UTC+3</option>
                <option value="UTC+4">UTC+4</option>
                <option value="UTC+5">UTC+5</option>
                <option value="UTC+6">UTC+6</option>
                <option value="UTC+7">UTC+7</option>
                <option value="UTC+8">UTC+8</option>
                <option value="UTC+9">UTC+9</option>
                <option value="UTC+10">UTC+10</option>
                <option value="UTC+11">UTC+11</option>
                <option value="UTC+12">UTC+12</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(index)}>×</button>
                </span>
              ))}
              <div className="add-skill">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button type="button" onClick={addSkill}>Add</button>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Goals</h3>
            <div className="goals-container">
              {formData.goals.map((goal, index) => (
                <span key={index} className="goal-tag">
                  {goal}
                  <button type="button" onClick={() => removeGoal(index)}>×</button>
                </span>
              ))}
              <div className="add-goal">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add goal..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                />
                <button type="button" onClick={addGoal}>Add</button>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Social Links</h3>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-content">
          <div className="profile-section">
            <h3>About</h3>
            <p>{formData.bio || 'No bio provided'}</p>
          </div>

          <div className="profile-section">
            <h3>Skills</h3>
            <div className="skills-display">
              {formData.skills.length > 0 ? (
                formData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))
              ) : (
                <p>No skills added yet</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Goals</h3>
            <div className="goals-display">
              {formData.goals.length > 0 ? (
                formData.goals.map((goal, index) => (
                  <span key={index} className="goal-tag">{goal}</span>
                ))
              ) : (
                <p>No goals set yet</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Experience</h3>
            <p>{formData.experience || 'No experience information provided'}</p>
          </div>

          <div className="profile-section">
            <h3>Availability</h3>
            <p>Timezone: {formData.timezone || 'Not specified'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

