import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 1️⃣ Trigger Google login popup
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Firebase user:", result.user);

      // 2️⃣ Get the Firebase ID token (proof of login)
      const token = await result.user.getIdToken();
      console.log("🪪 Firebase Token:", token);

      // Store token for future API calls
      localStorage.setItem('token', token);

      // 3️⃣ Send token to backend for verification
      try {
        const res = await axios.get('http://localhost:3000/api/test-auth', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("🎉 Backend Response:", res.data);
      } catch (backendError) {
        console.log("Backend not available, continuing with mock data");
      }

      // Create user object with mock data for demo
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: 'mentee', // Default role, can be changed in profile
        verified: false
      };

      onLogin(userData);
    } catch (error) {
      console.error("❌ Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl">
        <div className="bg-dark-800/50 backdrop-blur-xl border border-dark-700 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/20 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent"></div>
              <div className="relative z-10">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
                  Welcome to <span className="text-gradient">DConnect</span>
                </h1>
                <p className="text-xl text-dark-300 mb-8 animate-slide-up animation-delay-200">
                  Connect with experienced mentors and accelerate your learning journey
                </p>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-primary-500/20 rounded-full animate-float"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-primary-400/20 rounded-full animate-float animation-delay-1000"></div>
            </div>
            
            {/* Features Section */}
            <div className="p-8 lg:p-12 bg-dark-900/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="group">
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-4xl mb-4 animate-bounce-gentle">🎯</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Smart Matching</h3>
                    <p className="text-dark-400 text-sm">AI-powered mentor matching based on your skills and goals</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-4xl mb-4 animate-bounce-gentle animation-delay-200">💬</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Real-time Chat</h3>
                    <p className="text-dark-400 text-sm">Connect and communicate with your mentors instantly</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-4xl mb-4 animate-bounce-gentle animation-delay-400">📅</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Flexible Scheduling</h3>
                    <p className="text-dark-400 text-sm">Book sessions that fit your schedule and timezone</p>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="text-4xl mb-4 animate-bounce-gentle animation-delay-600">📹</div>
                    <h3 className="text-lg font-semibold text-white mb-2">Video Sessions</h3>
                    <p className="text-dark-400 text-sm">Interactive video calls with screen sharing capabilities</p>
                  </div>
                </div>
              </div>
              
              {/* Login Form */}
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/20 rounded-2xl p-8 border border-primary-500/20">
                <h2 className="text-2xl font-bold text-white mb-4 animate-slide-up">Get Started</h2>
                <p className="text-dark-300 mb-8 animate-slide-up animation-delay-200">
                  Sign in with your Google account to begin your mentorship journey
                </p>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 animate-slide-down">
                    {error}
                  </div>
                )}
                
                <button 
                  onClick={handleLogin} 
                  disabled={loading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" className="animate-scale-in">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>
                
                <div className="mt-6 text-center">
                  <p className="text-dark-400 text-sm">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
