import React, { useEffect, useState } from 'react';
import { 
  UserCircleIcon, 
  PencilIcon, 
  CameraIcon, 
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  AcademicCapIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    bio: '',
    skills: [],
    goals: [],
    experience_level: 'beginner',
    github_url: '',
    linkedin_url: '',
    portfolio_url: '',
    timezone: 'UTC-5',
    availability: 'weekdays',
    verified: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'advanced', label: 'Advanced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  const skillOptions = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++',
    'Machine Learning', 'Data Science', 'Web Development', 'Mobile Development',
    'DevOps', 'Cloud Computing', 'UI/UX Design', 'Backend Development', 'Frontend Development'
  ];

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({
          ...prev,
          ...data,
          bio: data.bio || '',
          skills: data.skills || [],
          goals: data.goals || [],
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          portfolio_url: data.portfolio_url || ''
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setIsEditing(false);
        // Show success message
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSkillToggle = (skill) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const addGoal = () => {
    const goal = prompt('Enter a new goal:');
    if (goal && goal.trim()) {
      setProfile(prev => ({
        ...prev,
        goals: [...prev.goals, goal.trim()]
      }));
    }
  };

  const removeGoal = (index) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium text-2xl">
                  {profile.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700">
                  <CameraIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500 capitalize">{profile.role}</span>
                {profile.verified && (
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-outline flex items-center space-x-2"
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
              className="input-field"
            />
          ) : (
            <p className="text-gray-600">
              {profile.bio || 'No bio provided yet.'}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          {isEditing ? (
            <select
              value={profile.experience_level}
              onChange={(e) => setProfile(prev => ({ ...prev, experience_level: e.target.value }))}
              className="input-field"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-600 capitalize">
              {experienceLevels.find(l => l.value === profile.experience_level)?.label}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            {isEditing && (
              <button className="text-primary-600 hover:text-primary-700 text-sm">
                Add Skill
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      profile.skills.includes(skill)
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet</p>
              )}
            </div>
          )}
        </div>

        {/* Goals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Goals</h2>
            {isEditing && (
              <button
                onClick={addGoal}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Add Goal
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {profile.goals.length > 0 ? (
              profile.goals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{goal}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeGoal(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No goals set yet</p>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.github_url}
                  onChange={(e) => setProfile(prev => ({ ...prev, github_url: e.target.value }))}
                  placeholder="https://github.com/username"
                  className="input-field"
                />
              ) : (
                <p className="text-gray-600">
                  {profile.github_url || 'Not provided'}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.linkedin_url}
                  onChange={(e) => setProfile(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                  className="input-field"
                />
              ) : (
                <p className="text-gray-600">
                  {profile.linkedin_url || 'Not provided'}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.portfolio_url}
                  onChange={(e) => setProfile(prev => ({ ...prev, portfolio_url: e.target.value }))}
                  placeholder="https://yourportfolio.com"
                  className="input-field"
                />
              ) : (
                <p className="text-gray-600">
                  {profile.portfolio_url || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistics</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">Average Rating</span>
              </div>
              <span className="font-semibold text-gray-900">4.8</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700">Sessions Completed</span>
              </div>
              <span className="font-semibold text-gray-900">15</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AcademicCapIcon className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Goals Achieved</span>
              </div>
              <span className="font-semibold text-gray-900">8/12</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CodeBracketIcon className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Skills Learned</span>
              </div>
              <span className="font-semibold text-gray-900">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={updateProfile}
            className="btn-primary"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
