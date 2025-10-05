import React, { useEffect, useState } from 'react';
import { ChartBarIcon, TrophyIcon, FireIcon, AcademicCapIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const Progress = ({ user }) => {
  const [progressData, setProgressData] = useState({
    totalSessions: 0,
    completedGoals: 0,
    totalGoals: 0,
    streak: 0,
    skillsLearned: 0,
    averageRating: 0
  });
  const [recentGoals, setRecentGoals] = useState([]);
  const [skillProgress, setSkillProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, [user]);

  const fetchProgressData = async () => {
    try {
      // Mock data for demonstration
      setProgressData({
        totalSessions: 15,
        completedGoals: 8,
        totalGoals: 12,
        streak: 7,
        skillsLearned: 5,
        averageRating: 4.8
      });

      setRecentGoals([
        {
          id: 1,
          title: 'Master React Hooks',
          description: 'Learn and implement React hooks effectively',
          progress: 85,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: 'in_progress'
        },
        {
          id: 2,
          title: 'Build a Full-Stack App',
          description: 'Create a complete web application with frontend and backend',
          progress: 60,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: 'in_progress'
        },
        {
          id: 3,
          title: 'Learn TypeScript',
          description: 'Understand TypeScript fundamentals and advanced features',
          progress: 100,
          deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: 'completed'
        }
      ]);

      setSkillProgress([
        { skill: 'React', level: 85, color: 'bg-blue-500' },
        { skill: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { skill: 'Node.js', level: 70, color: 'bg-green-500' },
        { skill: 'TypeScript', level: 60, color: 'bg-blue-600' },
        { skill: 'CSS', level: 80, color: 'bg-pink-500' },
        { skill: 'Git', level: 75, color: 'bg-orange-500' }
      ]);

    } catch (error) {
      console.error('Error fetching progress data:', error);
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{progressData.totalSessions}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Goals Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressData.completedGoals}/{progressData.totalGoals}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">{progressData.streak} days</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Skills Learned</p>
              <p className="text-2xl font-bold text-gray-900">{progressData.skillsLearned}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{progressData.averageRating}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">45h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Goals</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Add Goal
            </button>
          </div>
          
          <div className="space-y-4">
            {recentGoals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    goal.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'completed' ? 'bg-green-500' : 'bg-primary-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Deadline: {goal.deadline.toLocaleDateString()}</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    Update Progress
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Progress</h2>
          
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{skill.skill}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-2">Next Steps</h3>
            <p className="text-sm text-primary-700">
              Focus on improving your TypeScript skills. Consider taking advanced courses or working on projects that use TypeScript extensively.
            </p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <TrophyIcon className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-900">First Session</h3>
                  <p className="text-sm text-yellow-700">Completed your first mentorship session</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <FireIcon className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">7-Day Streak</h3>
                  <p className="text-sm text-green-700">Maintained learning streak for 7 days</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <StarIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Top Performer</h3>
                  <p className="text-sm text-blue-700">Rated highly by your mentor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
