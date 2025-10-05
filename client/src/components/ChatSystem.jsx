import React, { useState, useEffect, useRef } from 'react';
import './ChatSystem.css';

function ChatSystem({ currentUser, selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mock chat data
    setChats([
      {
        id: 1,
        name: 'Sarah Johnson',
        lastMessage: 'Great work on the React component!',
        timestamp: '2 min ago',
        unread: 2,
        avatar: '/default-avatar.png',
        online: true
      },
      {
        id: 2,
        name: 'Mike Chen',
        lastMessage: 'Let\'s schedule a session for next week',
        timestamp: '1 hour ago',
        unread: 0,
        avatar: '/default-avatar.png',
        online: false
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        lastMessage: 'The deployment looks good!',
        timestamp: '3 hours ago',
        unread: 1,
        avatar: '/default-avatar.png',
        online: true
      }
    ]);

    // Mock messages for selected chat
    if (selectedChat) {
      setMessages([
        {
          id: 1,
          sender: 'Sarah Johnson',
          message: 'Hi! I saw your request for mentorship. I\'d love to help you with React development.',
          timestamp: '10:30 AM',
          isOwn: false
        },
        {
          id: 2,
          sender: 'You',
          message: 'Thank you so much! I\'m really excited to learn from you.',
          timestamp: '10:32 AM',
          isOwn: true
        },
        {
          id: 3,
          sender: 'Sarah Johnson',
          message: 'Perfect! What specific areas of React would you like to focus on?',
          timestamp: '10:35 AM',
          isOwn: false
        },
        {
          id: 4,
          sender: 'You',
          message: 'I\'m particularly interested in hooks and state management. I\'ve been struggling with useEffect.',
          timestamp: '10:37 AM',
          isOwn: true
        },
        {
          id: 5,
          sender: 'Sarah Johnson',
          message: 'useEffect can be tricky at first! I\'ll create a learning plan for you. Would you like to schedule a session this weekend?',
          timestamp: '10:40 AM',
          isOwn: false
        }
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response
        const response = {
          id: messages.length + 2,
          sender: selectedChat?.name || 'Mentor',
          message: 'Thanks for your message! I\'ll get back to you soon.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const startVideoCall = () => {
    // This would integrate with video calling service
    alert('Starting video call... (Demo mode)');
  };

  const startScreenShare = () => {
    alert('Starting screen share... (Demo mode)');
  };

  const sendFile = () => {
    alert('File sharing feature coming soon!');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Sidebar */}
      <div className="w-full sm:w-80 bg-dark-800/50 backdrop-blur-xl border-r border-primary-500/20 flex flex-col animate-slide-left">
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gradient">Messages</h2>
            <button className="btn-primary text-sm py-2 px-4 animate-pulse-glow">
              + New Chat
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="input-field w-full pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400">
              🔍
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-dark-700/50 animate-slide-up ${
                selectedChat?.id === chat.id 
                  ? 'bg-primary-500/20 border border-primary-500/50' 
                  : 'bg-dark-700/30 border border-transparent'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name} 
                    className="w-12 h-12 rounded-full border-2 border-primary-500/30" 
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-dark-800 ${
                    chat.online ? 'bg-green-500 animate-pulse' : 'bg-dark-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium truncate">{chat.name}</h4>
                    <span className="text-xs text-dark-400">{chat.timestamp}</span>
                  </div>
                  <p className="text-dark-400 text-sm truncate mt-1">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <div className="flex justify-end mt-2">
                      <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full animate-bounce-gentle">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-dark-800/50 backdrop-blur-xl border-b border-primary-500/20 p-6 animate-slide-down">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={selectedChat.avatar} 
                      alt={selectedChat.name} 
                      className="w-12 h-12 rounded-full border-2 border-primary-500/30" 
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-dark-800 ${
                      selectedChat.online ? 'bg-green-500 animate-pulse' : 'bg-dark-500'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedChat.name}</h3>
                    <span className={`text-sm ${
                      selectedChat.online ? 'text-green-400' : 'text-dark-400'
                    }`}>
                      {selectedChat.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-xl transition-all duration-300 hover:scale-105"
                    onClick={startVideoCall} 
                    title="Video Call"
                  >
                    📹
                  </button>
                  <button 
                    className="p-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-xl transition-all duration-300 hover:scale-105"
                    onClick={startScreenShare} 
                    title="Screen Share"
                  >
                    🖥️
                  </button>
                  <button 
                    className="p-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-xl transition-all duration-300 hover:scale-105"
                    onClick={sendFile} 
                    title="Send File"
                  >
                    📎
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-dark-900/50 to-dark-800/50">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isOwn 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-dark-700/50 text-white border border-dark-600'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-100' : 'text-dark-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-slide-up">
                  <div className="bg-dark-700/50 border border-dark-600 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-dark-800/50 backdrop-blur-xl border-t border-primary-500/20 p-6 animate-slide-up">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input-field w-full pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-primary-400 transition-colors"
                    onClick={sendFile}
                  >
                    📎
                  </button>
                </div>
                <button 
                  type="submit" 
                  disabled={!newMessage.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-dark-900/50 to-dark-800/50">
            <div className="text-center animate-fade-in">
              <div className="text-6xl mb-4 animate-bounce-gentle">💬</div>
              <h3 className="text-2xl font-bold text-white mb-2">Select a conversation</h3>
              <p className="text-dark-400">Choose a chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSystem;
