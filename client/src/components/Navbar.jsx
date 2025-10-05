import React from 'react';
import './Navbar.css';

function Navbar({ user, onLogout, currentView, onViewChange }) {
  const handleNavClick = (view) => {
    onViewChange(view);
  };

  return (
    <nav className="bg-dark-800/90 backdrop-blur-xl border-b border-primary-500/20 sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-gradient animate-fade-in">
              DConnect
            </h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentView === 'dashboard' 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => handleNavClick('dashboard')}
              >
                Dashboard
              </button>
              
              {user?.role === 'mentee' && (
                <button 
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentView === 'find-mentor' 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                  onClick={() => handleNavClick('find-mentor')}
                >
                  Find Mentor
                </button>
              )}
              
              <button 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentView === 'chat' 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => handleNavClick('chat')}
              >
                Messages
              </button>
              
              <button 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentView === 'schedule' 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => handleNavClick('schedule')}
              >
                Schedule
              </button>
              
              <button 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentView === 'profile' 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => handleNavClick('profile')}
              >
                Profile
              </button>
            </div>
          </div>
          
          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <img 
                src={user?.photoURL || '/default-avatar.png'} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-primary-500/30" 
              />
              <div className="text-right">
                <div className="text-sm font-medium text-white">{user?.displayName || 'User'}</div>
                <div className="text-xs text-primary-400 capitalize">{user?.role || 'mentee'}</div>
              </div>
            </div>
            
            <button 
              onClick={onLogout} 
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-800/50 backdrop-blur-sm">
          <button 
            className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 w-full text-left ${
              currentView === 'dashboard' 
                ? 'bg-primary-500 text-white' 
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
            onClick={() => handleNavClick('dashboard')}
          >
            Dashboard
          </button>
          
          {user?.role === 'mentee' && (
            <button 
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 w-full text-left ${
                currentView === 'find-mentor' 
                  ? 'bg-primary-500 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
              }`}
              onClick={() => handleNavClick('find-mentor')}
            >
              Find Mentor
            </button>
          )}
          
          <button 
            className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 w-full text-left ${
              currentView === 'chat' 
                ? 'bg-primary-500 text-white' 
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
            onClick={() => handleNavClick('chat')}
          >
            Messages
          </button>
          
          <button 
            className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 w-full text-left ${
              currentView === 'schedule' 
                ? 'bg-primary-500 text-white' 
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
            onClick={() => handleNavClick('schedule')}
          >
            Schedule
          </button>
          
          <button 
            className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 w-full text-left ${
              currentView === 'profile' 
                ? 'bg-primary-500 text-white' 
                : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
            }`}
            onClick={() => handleNavClick('profile')}
          >
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
