import React, { useState, useRef, useEffect } from 'react';
import {
  VideoCameraIcon,
  VideoCameraSlashIcon,
  MicrophoneIcon,
  PhoneIcon,
  PhoneXMarkIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const VideoCall = ({ isOpen, onClose, participant }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const callStartTime = useRef(null);

  useEffect(() => {
    if (isOpen) {
      initializeCall();
      callStartTime.current = Date.now();
      
      // Update call duration every second
      const interval = setInterval(() => {
        if (callStartTime.current) {
          setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const initializeCall = async () => {
    try {
      setIsConnecting(true);
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      localStream.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simulate connection establishment
      setTimeout(() => {
        setIsConnecting(false);
        // In a real implementation, you would establish WebRTC connection here
        simulateRemoteStream();
      }, 2000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setIsConnecting(false);
    }
  };

  const simulateRemoteStream = () => {
    // Simulate remote video stream
    if (remoteVideoRef.current) {
      // Create a placeholder video element for demonstration
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      // Draw a simple pattern to simulate remote video
      const drawPattern = () => {
        ctx.fillStyle = '#4F46E5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(participant || 'Remote Participant', canvas.width / 2, canvas.height / 2);
        
        requestAnimationFrame(drawPattern);
      };
      drawPattern();
      
      const stream = canvas.captureStream(30);
      remoteVideoRef.current.srcObject = stream;
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        // Replace video track with screen share
        const videoTrack = screenStream.getVideoTracks()[0];
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          const sender = localVideoRef.current.srcObject.getVideoTracks()[0];
          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        }
        
        setIsScreenSharing(true);
        
        // Handle screen share end
        videoTrack.onended = () => {
          setIsScreenSharing(false);
        };
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-11/12 max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">D</span>
            </div>
            <div>
              <h3 className="text-white font-medium">
                {participant ? `Call with ${participant}` : 'Video Call'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isConnecting ? 'Connecting...' : formatDuration(callDuration)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <PhoneXMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {isConnecting ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-white text-lg">Connecting...</p>
                <p className="text-gray-400 text-sm">Please wait while we establish the connection</p>
              </div>
            </div>
          ) : (
            <>
              {/* Remote Video */}
              <div className="absolute inset-0">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Local Video */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <VideoCameraSlashIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Call Info Overlay */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3">
                <p className="text-white text-sm">
                  {participant || 'Remote Participant'}
                </p>
                <p className="text-gray-400 text-xs">
                  {isAudioOn ? 'Audio On' : 'Audio Off'} • {isVideoOn ? 'Video On' : 'Video Off'}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 p-4 bg-gray-900 rounded-b-lg">
          <button
            onClick={toggleAudio}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isAudioOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            <MicrophoneIcon className="w-6 h-6" />
          </button>

          <button
            onClick={toggleVideo}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isVideoOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            {isVideoOn ? (
              <VideoCameraIcon className="w-6 h-6" />
            ) : (
              <VideoCameraSlashIcon className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={toggleScreenShare}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
            } text-white`}
          >
            <ComputerDesktopIcon className="w-6 h-6" />
          </button>

          <button
            onClick={endCall}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white"
          >
            <PhoneXMarkIcon className="w-6 h-6" />
          </button>

          <button className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center text-white">
            <EllipsisVerticalIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
