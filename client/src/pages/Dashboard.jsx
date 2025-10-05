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
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalMentors: 0,
    activeSessions: 0,
    completedSessions: 0,
    averageRating: 0,
    streak: 0,
    achievements: 0
  });
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentMentors, setRecentMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch mentors
      const mentorsResponse = await axios.get('http://localhost:3000/api/users/mentors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setRecentMentors(mentorsResponse.data.slice(0, 3));
      setStats(prev => ({
        ...prev,
        totalMentors: mentorsResponse.data.length,
        activeSessions: 2, // Mock data
        completedSessions: 5, // Mock data
        averageRating: 4.8, // Mock data
        streak: 7, // Mock data
        achievements: 3 // Mock data
      }));
      
      // Mock upcoming sessions
      setUpcomingSessions([
        {
          id: 1,
          mentor_name: 'John Doe',
          topic: 'React Best Practices',
          start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          duration: 60
        },
        {
          id: 2,
          mentor_name: 'Jane Smith',
          topic: 'Node.js Architecture',
          start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          duration: 90
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
          Welcome back, {user?.full_name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey? Let's make today productive.
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
              <p className="text-sm font-medium text-gray-600">Total Mentors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMentors}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeSessions}</p>
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
              <FireIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Learning Streak</p>
              <p className="text-2xl font-bold text-gray-900">{stats.streak} days</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{stats.achievements}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
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
              View All
            </Link>
          </div>
          
          {upcomingSessions.length > 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{session.topic}</h3>
                    <p className="text-sm text-gray-600">with {session.mentor_name}</p>
                    <p className="text-xs text-gray-500">
                      {format(session.start_time, 'MMM dd, yyyy')} at {format(session.start_time, 'h:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.duration}min</p>
                    <button className="text-primary-600 hover:text-primary-700 text-xs">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No upcoming sessions</p>
              <Link to="/mentors" className="btn-primary">
                Find a Mentor
              </Link>
            </div>
          )}
        </div>

        {/* Recent Mentors */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Mentors</h2>
            <Link to="/mentors" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          
          {recentMentors.length > 0 ? (
            <div className="space-y-4">
              {recentMentors.map((mentor) => (
                <div key={mentor.user_id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {mentor.full_name?.charAt(0) || 'M'}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{mentor.full_name}</h3>
                    <p className="text-sm text-gray-600">
                      {mentor.verified && '✅ Verified'} • {mentor.open_slots || 0} slots available
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No mentors yet</p>
              <Link to="/mentors" className="btn-primary">
                Find Mentors
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/mentors" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <UserGroupIcon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Find Mentors</h3>
              <p className="text-sm text-gray-600">Discover new mentors</p>
            </div>
          </Link>
          
          <Link to="/schedule" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <CalendarIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Schedule Session</h3>
              <p className="text-sm text-gray-600">Book a meeting</p>
            </div>
          </Link>
          
          <Link to="/chat" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Start Chat</h3>
              <p className="text-sm text-gray-600">Message your mentors</p>
            </div>
          </Link>
          
          <Link to="/progress" className="card hover:shadow-md transition-shadow">
            <div className="text-center">
              <ChartBarIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900">Track Progress</h3>
              <p className="text-sm text-gray-600">View your growth</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
