import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  CodeBracketIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      setUserInfo({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      });
      setShowRoleSelection(true);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      
      const response = await fetch('http://localhost:3000/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: selectedRole })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', token);
        onLogin(data.user);
      } else {
        console.error('Sync error:', data.error);
      }
    } catch (error) {
      console.error('Role selection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img 
                  src={userInfo?.photoURL} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome, {userInfo?.name}!
              </h2>
              <p className="text-gray-600">
                Choose your role to get started with DCONNECT
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setSelectedRole('mentee')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === 'mentee'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <AcademicCapIcon className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">I'm a Mentee</h3>
                <p className="text-sm text-gray-600">
                  Looking for guidance and mentorship to grow my skills
                </p>
                {selectedRole === 'mentee' && (
                  <CheckCircleIcon className="w-6 h-6 text-primary-600 mx-auto mt-3" />
                )}
              </button>

              <button
                onClick={() => setSelectedRole('mentor')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === 'mentor'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <UserGroupIcon className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">I'm a Mentor</h3>
                <p className="text-sm text-gray-600">
                  Ready to share knowledge and guide aspiring developers
                </p>
                {selectedRole === 'mentor' && (
                  <CheckCircleIcon className="w-6 h-6 text-primary-600 mx-auto mt-3" />
                )}
              </button>
            </div>

            <button
              onClick={handleRoleSelection}
              disabled={!selectedRole || isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Setting up...' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-primary-600">DCONNECT</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with experienced mentors and accelerate your journey in open source development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              AI-powered algorithm matches you with the perfect mentor based on your goals and skills
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CodeBracketIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
            <p className="text-gray-600">
              Chat, video calls, and collaborative coding sessions with your mentor
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed progress tracking and skill visualization
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Get Started with Google'}
          </button>
          <p className="text-sm text-gray-500 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
