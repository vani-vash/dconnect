import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  EyeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const MentorDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalMentees: 0,
    activeMentees: 0,
    completedSessions: 0,
    averageRating: 0,
    totalHours: 0,
    impactScore: 0
  });
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentMentees, setRecentMentees] = useState([]);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch slots
      const slotsResponse = await axios.get(`http://localhost:3000/api/slots/${user.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Fetch feedback
      const feedbackResponse = await axios.get(`http://localhost:3000/api/feedback/${user.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setRecentFeedback(feedbackResponse.data.slice(0, 3));
      
      // Mock data for now
      setStats({
        totalMentees: 12,
        activeMentees: 5,
        completedSessions: 28,
        averageRating: 4.9,
        totalHours: 45,
        impactScore: 92
      });
      
      // Mock upcoming sessions
      setUpcomingSessions([
        {
          id: 1,
          mentee_name: 'Alice Johnson',
          topic: 'React Hooks Deep Dive',
          start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          duration: 60,
          mentee_id: 1
        },
        {
          id: 2,
          mentee_name: 'Bob Smith',
          topic: 'Node.js Best Practices',
          start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          duration: 90,
          mentee_id: 2
        }
      ]);
      
      // Mock recent mentees
      setRecentMentees([
        {
          user_id: 1,
          full_name: 'Alice Johnson',
          goals: ['React', 'Frontend Development'],
          last_session: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          progress: 75
        },
        {
          user_id: 2,
          full_name: 'Bob Smith',
          goals: ['Node.js', 'Backend Development'],
          last_session: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          progress: 60
        }
      ]);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mentor Dashboard, {user?.full_name}! 🎯
        </h1>
        <p className="text-gray-600">
          Track your mentorship impact and manage your mentees effectively.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMentees}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Mentees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeMentees}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Impact Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.impactScore}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedSessions}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
            <Link to="/schedule" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Manage Schedule
            </Link>
          </div>
          
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {session.mentee_name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{session.topic}</h3>
                    <p className="text-sm text-gray-600">with {session.mentee_name}</p>
                    <p className="text-xs text-gray-500">
                      {format(session.start_time, 'MMM dd, yyyy')} at {format(session.start_time, 'h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.duration}min</p>
                    <button className="text-primary-600 hover:text-primary-700 text-xs">
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No upcoming sessions</p>
              <Link to="/schedule" className="btn-primary">
                Create Availability
              </Link>
            </div>
          )}
        </div>

        {/* Recent Mentees */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Mentees</h2>
            <Link to="/mentees" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          {recentMentees.length > 0 ? (
            <div className="space-y-4">
              {recentMentees.map((mentee) => (
                <div key={mentee.user_id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {mentee.full_name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{mentee.full_name}</h3>
                    <p className="text-sm text-gray-600">
                      {mentee.goals?.join(', ')} • {mentee.progress}% complete
                    </p>
                    <p className="text-xs text-gray-500">
                      Last session: {format(mentee.last_session, 'MMM dd')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No mentees yet</p>
              <Link to="/schedule" className="btn-primary">
                Set Availability
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="mt-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Feedback</h2>
            <Link to="/analytics" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Analytics
            </Link>
          </div>
          
          {recentFeedback.length > 0 ? (
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div key={feedback.feedback_id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {feedback.mentee_name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{feedback.mentee_name}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{feedback.comments}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(feedback.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No feedback yet</p>
              <p className="text-sm text-gray-400">Complete sessions to receive feedback</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/schedule" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <CalendarIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Manage Schedule</h3>
              <p className="text-sm text-gray-600">Set availability</p>
            </div>
          </Link>
          
          <Link to="/mentees" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <UserGroupIcon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">My Mentees</h3>
              <p className="text-sm text-gray-600">View mentees</p>
            </div>
          </Link>
          
          <Link to="/chat" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600">Chat with mentees</p>
            </div>
          </Link>
          
          <Link to="/analytics" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <ChartBarIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">View insights</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
