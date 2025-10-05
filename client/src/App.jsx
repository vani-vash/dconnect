import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import MentorMatching from './components/MentorMatching';
import ChatSystem from './components/ChatSystem';
import VideoCall from './components/VideoCall';
import MentorDashboard from './components/MentorDashboard';
import MenteeDashboard from './components/MenteeDashboard';
import SchedulingSystem from './components/SchedulingSystem';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [videoCallMentor, setVideoCallMentor] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedChat(null);
    setShowVideoCall(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  const startVideoCall = (mentorName) => {
    setVideoCallMentor(mentorName);
    setShowVideoCall(true);
  };

  const renderCurrentView = () => {
    if (!user) return null;

    switch (currentView) {
      case 'dashboard':
        return user.role === 'mentor' ? 
          <MentorDashboard user={user} /> : 
          <MenteeDashboard user={user} />;
      
      case 'profile':
        return <UserProfile user={user} onUpdate={handleProfileUpdate} />;
      
      case 'find-mentor':
        return <MentorMatching menteeId={user.uid} />;
      
      case 'chat':
        return <ChatSystem currentUser={user} selectedChat={selectedChat} />;
      
      case 'schedule':
        return <SchedulingSystem user={user} userRole={user.role} />;
      
      default:
        return user.role === 'mentor' ? 
          <MentorDashboard user={user} /> : 
          <MenteeDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {!user ? (
        <div className="animate-fade-in">
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div className="animate-fade-in">
          <Navbar 
            user={user} 
            onLogout={handleLogout}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="animate-slide-up">
              {renderCurrentView()}
            </div>
          </main>
          {showVideoCall && (
            <div className="animate-scale-in">
              <VideoCall 
                isOpen={showVideoCall}
                onClose={() => setShowVideoCall(false)}
                mentorName={videoCallMentor}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
