import React, { useState, useRef, useEffect } from 'react';
import './VideoCall.css';

function VideoCall({ isOpen, onClose, mentorName }) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [participants, setParticipants] = useState([
    { id: 1, name: mentorName || 'Mentor', isVideoOn: true, isAudioOn: true, isMain: true },
    { id: 2, name: 'You', isVideoOn: true, isAudioOn: true, isMain: false }
  ]);

  const videoRef = useRef(null);
  const localVideoRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startCall();
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      endCall();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen]);

  const startCall = () => {
    // Mock video call setup
    console.log('Starting video call...');
    // In a real implementation, this would set up WebRTC connections
  };

  const endCall = () => {
    console.log('Ending video call...');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCallDuration(0);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In real implementation, this would toggle the video stream
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In real implementation, this would toggle the audio stream
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In real implementation, this would start/stop screen sharing
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real implementation, this would start/stop recording
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const inviteParticipant = () => {
    alert('Invite participant feature coming soon!');
  };

  const openChat = () => {
    alert('Opening chat...');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-dark-800/95 backdrop-blur-xl border border-primary-500/20 rounded-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-dark-800/50 backdrop-blur-xl border-b border-primary-500/20 p-6 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center animate-pulse-glow">
                📹
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Video Call with {mentorName || 'Mentor'}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-primary-400 font-mono text-lg">{formatTime(callDuration)}</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-red-400 text-sm">Live</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="p-3 bg-dark-700/50 hover:bg-dark-700/70 text-white rounded-xl transition-all duration-300 hover:scale-105"
                onClick={openChat} 
                title="Chat"
              >
                💬
              </button>
              <button 
                className="p-3 bg-dark-700/50 hover:bg-dark-700/70 text-white rounded-xl transition-all duration-300 hover:scale-105"
                onClick={inviteParticipant} 
                title="Invite"
              >
                👥
              </button>
              <button 
                className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={onClose} 
                title="End Call"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-6 bg-gradient-to-br from-dark-900/50 to-dark-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {participants.map((participant, index) => (
              <div 
                key={participant.id} 
                className={`relative bg-dark-700/50 rounded-xl overflow-hidden animate-slide-up ${
                  participant.isMain ? 'lg:col-span-1' : 'lg:col-span-1'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-full flex items-center justify-center">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                      <div className="w-24 h-24 bg-primary-500/30 rounded-full flex items-center justify-center text-4xl font-bold text-white animate-pulse-glow">
                        {participant.name.charAt(0)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-dark-600/50 flex flex-col items-center justify-center">
                      <div className="text-6xl text-dark-400 mb-4">📹</div>
                      <p className="text-dark-400">Camera Off</p>
                    </div>
                  )}
                </div>
                
                {/* Participant Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-dark-800/80 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{participant.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${participant.isAudioOn ? 'text-green-400' : 'text-red-400'}`}>
                        {participant.isAudioOn ? '🔊' : '🔇'}
                      </span>
                      <span className={`text-sm ${participant.isVideoOn ? 'text-green-400' : 'text-red-400'}`}>
                        {participant.isVideoOn ? '📹' : '📹'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Controls */}
        <div className="bg-dark-800/50 backdrop-blur-xl border-t border-primary-500/20 p-6 animate-slide-up">
          <div className="flex items-center justify-center space-x-4">
            {/* Audio Control */}
            <button 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                isAudioOn 
                  ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50' 
                  : 'bg-red-500/20 text-red-400 border-2 border-red-500/50'
              }`}
              onClick={toggleAudio}
              title={isAudioOn ? 'Mute' : 'Unmute'}
            >
              {isAudioOn ? '🔊' : '🔇'}
            </button>
            
            {/* Video Control */}
            <button 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                isVideoOn 
                  ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50' 
                  : 'bg-red-500/20 text-red-400 border-2 border-red-500/50'
              }`}
              onClick={toggleVideo}
              title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
            >
              📹
            </button>
            
            {/* Screen Share */}
            <button 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                isScreenSharing 
                  ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/50' 
                  : 'bg-dark-700/50 text-white border-2 border-dark-600'
              }`}
              onClick={toggleScreenShare}
              title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
            >
              🖥️
            </button>
            
            {/* Recording */}
            <button 
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                isRecording 
                  ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50 animate-pulse' 
                  : 'bg-dark-700/50 text-white border-2 border-dark-600'
              }`}
              onClick={toggleRecording}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? '⏹️' : '⏺️'}
            </button>
            
            {/* Settings */}
            <button 
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-dark-700/50 text-white border-2 border-dark-600 transition-all duration-300 hover:scale-110"
              title="Settings"
            >
              ⚙️
            </button>
            
            {/* End Call */}
            <button 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-red-500/20 text-red-400 border-2 border-red-500/50 transition-all duration-300 hover:scale-110 hover:bg-red-500/30"
              onClick={onClose} 
              title="End Call"
            >
              📞
            </button>
          </div>
        </div>

        {/* Screen Share Overlay */}
        {isScreenSharing && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
            <div className="bg-dark-800/90 backdrop-blur-xl border border-primary-500/20 rounded-2xl p-8 text-center animate-scale-in">
              <div className="text-6xl mb-4 animate-bounce-gentle">🖥️</div>
              <h4 className="text-2xl font-bold text-white mb-4">Screen Sharing Active</h4>
              <p className="text-dark-300 mb-6">You are sharing your screen with the participants</p>
              <button 
                className="btn-primary"
                onClick={toggleScreenShare}
              >
                Stop Sharing
              </button>
            </div>
          </div>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2 flex items-center space-x-2 animate-pulse-glow">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">Recording</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCall;
