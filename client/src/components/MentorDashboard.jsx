import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function MentorDashboard({ user }) {
  const [stats, setStats] = useState({
    totalMentees: 12,
    activeSessions: 3,
    completedSessions: 45,
    averageRating: 4.8,
    impactScore: 92
  });

  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      skill: 'React Development',
      progress: 75,
      lastSession: '2 days ago',
      nextSession: 'Tomorrow',
      rating: 4.9,
      avatar: '/default-avatar.png'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      skill: 'Python & ML',
      progress: 60,
      lastSession: '1 week ago',
      nextSession: 'Next Monday',
      rating: 4.7,
      avatar: '/default-avatar.png'
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      skill: 'JavaScript',
      progress: 40,
      lastSession: '3 days ago',
      nextSession: 'This Friday',
      rating: 4.8,
      avatar: '/default-avatar.png'
    }
  ]);

  const [upcomingSessions, setUpcomingSessions] = useState([
    {
      id: 1,
      mentee: 'Alex Johnson',
      topic: 'React Hooks Deep Dive',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      type: '1-on-1'
    },
    {
      id: 2,
      mentee: 'Group Session',
      topic: 'Open Source Best Practices',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'Group'
    }
  ]);

  const [recentFeedback, setRecentFeedback] = useState([
    {
      id: 1,
      mentee: 'Alex Johnson',
      rating: 5,
      comment: 'Sarah is an amazing mentor! She helped me understand React hooks in a way that finally clicked.',
      date: '2 days ago'
    },
    {
      id: 2,
      mentee: 'Sarah Chen',
      rating: 4,
      comment: 'Very knowledgeable and patient. Great at explaining complex concepts.',
      date: '1 week ago'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Welcome back, <span className="text-gradient">{user?.displayName || 'Mentor'}</span>!
          </h1>
          <p className="text-xl text-dark-300">Here's your mentoring overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-500">{stats.totalMentees}</div>
                <div className="text-dark-400">Total Mentees</div>
              </div>
              <div className="text-4xl animate-bounce-gentle">👥</div>
            </div>
          </div>
          
          <div className="card animate-scale-in animation-delay-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-500">{stats.activeSessions}</div>
                <div className="text-dark-400">Active Sessions</div>
              </div>
              <div className="text-4xl animate-bounce-gentle animation-delay-200">📅</div>
            </div>
          </div>
          
          <div className="card animate-scale-in animation-delay-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-500">{stats.completedSessions}</div>
                <div className="text-dark-400">Completed Sessions</div>
              </div>
              <div className="text-4xl animate-bounce-gentle animation-delay-400">✅</div>
            </div>
          </div>
          
          <div className="card animate-scale-in animation-delay-600">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-500">{stats.averageRating}</div>
                <div className="text-dark-400">Average Rating</div>
              </div>
              <div className="text-4xl animate-bounce-gentle animation-delay-600">⭐</div>
            </div>
          </div>
          
          <div className="card animate-scale-in animation-delay-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary-500">{stats.impactScore}%</div>
                <div className="text-dark-400">Impact Score</div>
              </div>
              <div className="text-4xl animate-bounce-gentle animation-delay-800">🎯</div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mentees Section */}
          <div className="lg:col-span-2">
            <div className="card animate-slide-up">
              <h2 className="text-2xl font-bold text-white mb-6">Your Mentees</h2>
              <div className="space-y-6">
                {mentees.map((mentee, index) => (
                  <div key={mentee.id} className="bg-dark-700/50 rounded-xl p-6 hover:bg-dark-700/70 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start space-x-4">
                      <img src={mentee.avatar} alt={mentee.name} className="w-16 h-16 rounded-full border-2 border-primary-500/30" />
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2">{mentee.name}</h4>
                        <p className="text-primary-400 mb-4">{mentee.skill}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-dark-400 text-sm">Progress</span>
                            <span className="text-primary-500 font-medium">{mentee.progress}%</span>
                          </div>
                          <div className="w-full bg-dark-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${mentee.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-sm">
                            <span className="text-dark-400">Last: </span>
                            <span className="text-white">{mentee.lastSession}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-dark-400">Next: </span>
                            <span className="text-primary-400">{mentee.nextSession}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="btn-primary text-sm py-2 px-4">Message</button>
                          <button className="btn-secondary text-sm py-2 px-4">Schedule</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="card animate-slide-up animation-delay-200">
              <h2 className="text-xl font-bold text-white mb-6">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={session.id} className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-xl p-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        session.type === 'Group' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2">{session.topic}</h4>
                    <p className="text-dark-400 text-sm mb-3">with {session.mentee}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs text-dark-400 mb-4">
                      <div>📅 {session.date}</div>
                      <div>🕐 {session.time}</div>
                      <div>⏱️ {session.duration}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-primary text-xs py-1 px-3">Join</button>
                      <button className="btn-secondary text-xs py-1 px-3">Reschedule</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="card animate-slide-up animation-delay-400">
              <h2 className="text-xl font-bold text-white mb-6">Recent Feedback</h2>
              <div className="space-y-4">
                {recentFeedback.map((feedback, index) => (
                  <div key={feedback.id} className="bg-dark-700/50 rounded-xl p-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{feedback.mentee}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-dark-500'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-dark-300 text-sm mb-2">"{feedback.comment}"</p>
                    <span className="text-primary-400 text-xs">{feedback.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card animate-slide-up animation-delay-600">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-dark-700/50 hover:bg-dark-700/70 p-4 rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-white text-sm">Create Session</div>
                </button>
                <button className="bg-dark-700/50 hover:bg-dark-700/70 p-4 rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-white text-sm">Add Notes</div>
                </button>
                <button className="bg-dark-700/50 hover:bg-dark-700/70 p-4 rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-white text-sm">View Analytics</div>
                </button>
                <button className="bg-dark-700/50 hover:bg-dark-700/70 p-4 rounded-xl transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-white text-sm">Set Goals</div>
                </button>
              </div>
            </div>

            {/* Mentor Resources */}
            <div className="card animate-slide-up animation-delay-800">
              <h2 className="text-xl font-bold text-white mb-6">Mentor Resources</h2>
              <div className="space-y-4">
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300">
                  <h4 className="text-white font-medium mb-2">Mentoring Best Practices</h4>
                  <p className="text-dark-400 text-sm mb-3">Guide to effective mentoring techniques</p>
                  <button className="btn-primary text-xs py-1 px-3">Read More</button>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300">
                  <h4 className="text-white font-medium mb-2">Session Templates</h4>
                  <p className="text-dark-400 text-sm mb-3">Pre-built session structures</p>
                  <button className="btn-primary text-xs py-1 px-3">View Templates</button>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 hover:bg-dark-700/70 transition-all duration-300">
                  <h4 className="text-white font-medium mb-2">Community Guidelines</h4>
                  <p className="text-dark-400 text-sm mb-3">Platform rules and expectations</p>
                  <button className="btn-primary text-xs py-1 px-3">Read Guidelines</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
