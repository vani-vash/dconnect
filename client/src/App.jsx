import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';
import FindMentors from './pages/FindMentors';
import Chat from './pages/Chat';
import Schedule from './pages/Schedule';
import Progress from './pages/Progress';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      fetch('http://localhost:3000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user_id) {
          setUser(data);
        }
      })
      .catch(err => {
        console.error('Token verification failed:', err);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            user.role === 'mentor' ? <MentorDashboard user={user} /> : <Dashboard user={user} />
          } />
          <Route path="/mentors" element={<FindMentors user={user} />} />
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="/schedule" element={<Schedule user={user} />} />
          <Route path="/progress" element={<Progress user={user} />} />
          <Route path="/community" element={<Community user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard user={user} />} />
          <Route path="/mentees" element={<FindMentors user={user} />} />
          <Route path="/analytics" element={<Progress user={user} />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
