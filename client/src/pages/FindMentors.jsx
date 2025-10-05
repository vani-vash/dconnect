import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  UserGroupIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const FindMentors = ({ user }) => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const skills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 
    'Machine Learning', 'Data Science', 'Web Development', 'Mobile Development',
    'DevOps', 'Cloud Computing', 'UI/UX Design', 'Backend Development'
  ];

  useEffect(() => {
    fetchMentors();
  }, []);

  useEffect(() => {
    filterMentors();
  }, [mentors, searchTerm, selectedSkills, selectedAvailability, sortBy]);

  const fetchMentors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users/mentors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Add mock data for demonstration
      const mentorsWithMockData = response.data.map(mentor => ({
        ...mentor,
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
        totalSessions: Math.floor(Math.random() * 50) + 10,
        responseTime: Math.floor(Math.random() * 24) + 1,
        skills: skills.slice(0, Math.floor(Math.random() * 5) + 2),
        bio: `Experienced ${mentor.skills?.[0] || 'software'} developer with ${Math.floor(Math.random() * 10) + 3} years of experience. Passionate about mentoring and helping others grow in their careers.`,
        availability: ['Monday', 'Wednesday', 'Friday'][Math.floor(Math.random() * 3)],
        timezone: 'UTC-5',
        verified: Math.random() > 0.3
      }));
      
      setMentors(mentorsWithMockData);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMentors = () => {
    let filtered = [...mentors];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(mentor =>
        selectedSkills.some(skill => mentor.skills?.includes(skill))
      );
    }

    // Availability filter
    if (selectedAvailability) {
      filtered = filtered.filter(mentor =>
        mentor.availability === selectedAvailability
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'sessions':
          return b.totalSessions - a.totalSessions;
        case 'response':
          return a.responseTime - b.responseTime;
        case 'name':
          return a.full_name?.localeCompare(b.full_name);
        default:
          return 0;
      }
    });

    setFilteredMentors(filtered);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleConnect = async (mentorId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/connections', {
        mentor_id: mentorId,
        mentee_id: user.user_id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update mentor's open slots
      setMentors(prev => prev.map(mentor => 
        mentor.user_id === mentorId 
          ? { ...mentor, open_slots: Math.max(0, mentor.open_slots - 1) }
          : mentor
      ));
      
      alert('Connection request sent successfully!');
    } catch (error) {
      console.error('Error connecting to mentor:', error);
      alert('Failed to send connection request');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Perfect Mentor
        </h1>
        <p className="text-gray-600">
          Discover experienced mentors who can help you achieve your goals.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Mentors
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Any Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="rating">Rating</option>
              <option value="sessions">Total Sessions</option>
              <option value="response">Response Time</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Skills Filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedSkills.includes(skill)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.user_id} className="card hover:shadow-lg transition-shadow">
            {/* Mentor Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-lg">
                    {mentor.full_name?.charAt(0) || 'M'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{mentor.full_name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{mentor.rating}</span>
                    </div>
                    {mentor.verified && (
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {mentor.bio}
            </p>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {mentor.skills?.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.skills?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{mentor.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900">{mentor.totalSessions}</p>
                <p className="text-xs text-gray-600">Sessions</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{mentor.responseTime}h</p>
                <p className="text-xs text-gray-600">Response</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{mentor.open_slots || 0}</p>
                <p className="text-xs text-gray-600">Available</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>{mentor.availability}</span>
              <MapPinIcon className="w-4 h-4 ml-3 mr-1" />
              <span>{mentor.timezone}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleConnect(mentor.user_id)}
                disabled={!mentor.open_slots}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mentor.open_slots ? 'Connect' : 'No Slots'}
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <CalendarIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSkills([]);
              setSelectedAvailability('');
              setSortBy('rating');
            }}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FindMentors;
