import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function MenteeDashboard({ user }) {
  const [stats, setStats] = useState({
    mentorsMatched: 2,
    sessionsCompleted: 8,
    skillsLearned: 5,
    goalsAchieved: 3,
    currentStreak: 7
  });

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      expertise: 'React & Frontend',
      rating: 4.9,
      experience: '5 years',
      company: 'Google',
      nextSession: 'Tomorrow',
      avatar: '/default-avatar.png',
      isActive: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      expertise: 'Python & ML',
      rating: 4.7,
      experience: '3 years',
      company: 'Microsoft',
      nextSession: 'Next Week',
      avatar: '/default-avatar.png',
      isActive: false
    }
  ]);

  const [learningProgress, setLearningProgress] = useState([
    {
      skill: 'React Hooks',
      progress: 85,
      level: 'Intermediate',
      nextMilestone: 'Advanced Patterns'
    },
    {
      skill: 'JavaScript ES6+',
      progress: 70,
      level: 'Intermediate',
      nextMilestone: 'Async Programming'
    },
    {
      skill: 'Git & GitHub',
      progress: 60,
      level: 'Beginner',
      nextMilestone: 'Collaborative Workflows'
    },
    {
      skill: 'Node.js',
      progress: 40,
      level: 'Beginner',
      nextMilestone: 'Express Framework'
    }
  ]);

  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      mentor: 'Sarah Johnson',
      topic: 'React Hooks Deep Dive',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      type: '1-on-1'
    },
    {
      id: 2,
      mentor: 'Group Session',
      topic: 'Open Source Best Practices',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'Group'
    }
  ]);

  const [recentAchievements, setRecentAchievements] = useState([
    {
      id: 1,
      title: 'First Pull Request',
      description: 'Successfully contributed to an open source project',
      date: '2 days ago',
      badge: '🏆'
    },
    {
      id: 2,
      title: 'React Fundamentals',
      description: 'Completed React basics course',
      date: '1 week ago',
      badge: '🎓'
    },
    {
      id: 3,
      title: 'Git Master',
      description: 'Learned advanced Git workflows',
      date: '2 weeks ago',
      badge: '⚡'
    }
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Build a React Portfolio',
      description: 'Create a personal portfolio website using React',
      deadline: '2024-02-01',
      progress: 60,
      priority: 'High'
    },
    {
      id: 2,
      title: 'Contribute to Open Source',
      description: 'Make 5 meaningful contributions to open source projects',
      deadline: '2024-03-01',
      progress: 40,
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Learn Node.js',
      description: 'Master backend development with Node.js',
      deadline: '2024-04-01',
      progress: 20,
      priority: 'Low'
    }
  ]);

  return (
    <div className="mentee-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.displayName || 'Mentee'}!</h1>
        <p>Track your learning journey and connect with mentors</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>{stats.mentorsMatched}</h3>
            <p>Mentors Matched</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.sessionsCompleted}</h3>
            <p>Sessions Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.skillsLearned}</h3>
            <p>Skills Learned</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{stats.goalsAchieved}</h3>
            <p>Goals Achieved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{stats.currentStreak}</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <div className="learning-progress">
            <h2>Learning Progress</h2>
            <div className="progress-list">
              {learningProgress.map((skill, index) => (
                <div key={index} className="progress-card">
                  <div className="progress-header">
                    <h4>{skill.skill}</h4>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{skill.progress}%</span>
                  </div>
                  <p className="next-milestone">Next: {skill.nextMilestone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="goals-section">
            <h2>Your Goals</h2>
            <div className="goals-list">
              {goals.map((goal) => (
                <div key={goal.id} className="goal-card">
                  <div className="goal-header">
                    <h4>{goal.title}</h4>
                    <span className={`priority-badge ${goal.priority.toLowerCase()}`}>
                      {goal.priority}
                    </span>
                  </div>
                  <p className="goal-description">{goal.description}</p>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{goal.progress}%</span>
                  </div>
                  <div className="goal-meta">
                    <span className="deadline">📅 {goal.deadline}</span>
                    <button className="goal-btn">Update Progress</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="mentors-section">
            <h2>Your Mentors</h2>
            <div className="mentors-list">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="mentor-card">
                  <div className="mentor-avatar">
                    <img src={mentor.avatar} alt={mentor.name} />
                    <div className={`status-indicator ${mentor.isActive ? 'active' : 'inactive'}`}></div>
                  </div>
                  <div className="mentor-info">
                    <h4>{mentor.name}</h4>
                    <p className="mentor-expertise">{mentor.expertise}</p>
                    <div className="mentor-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-value">{mentor.rating}</span>
                    </div>
                    <div className="mentor-meta">
                      <span>{mentor.experience} experience</span>
                      <span>at {mentor.company}</span>
                    </div>
                    <p className="next-session">Next: {mentor.nextSession}</p>
                  </div>
                  <div className="mentor-actions">
                    <button className="action-btn primary">Message</button>
                    <button className="action-btn secondary">Schedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sessions-section">
            <h2>Upcoming Sessions</h2>
            <div className="sessions-list">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="session-card">
                  <div className="session-type">
                    <span className={`type-badge ${session.type.toLowerCase()}`}>
                      {session.type}
                    </span>
                  </div>
                  <div className="session-info">
                    <h4>{session.topic}</h4>
                    <p className="session-mentor">with {session.mentor}</p>
                    <div className="session-details">
                      <span className="session-date">📅 {session.date}</span>
                      <span className="session-time">🕐 {session.time}</span>
                      <span className="session-duration">⏱️ {session.duration}</span>
                    </div>
                  </div>
                  <div className="session-actions">
                    <button className="session-btn">Join</button>
                    <button className="session-btn secondary">Prepare</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="achievements-section">
            <h2>Recent Achievements</h2>
            <div className="achievements-list">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-badge">{achievement.badge}</div>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">{achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboard;

