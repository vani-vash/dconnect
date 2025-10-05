import React, { useEffect, useState, useRef } from 'react';
import {
  PaperAirplaneIcon,
  VideoCameraIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import VideoCall from '../components/VideoCall';

const Chat = ({ user }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.connection_id);
    }
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/connections', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const connections = await response.json();
        
        // Mock conversations for demonstration
        const mockConversations = connections.map(conn => ({
          connection_id: conn.connection_id,
          participant: conn.mentor_id === user.user_id ? conn.mentee_name : conn.mentor_name,
          participant_id: conn.mentor_id === user.user_id ? conn.mentee_id : conn.mentor_id,
          lastMessage: 'Hey! How are you doing with the React project?',
          lastMessageTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          unreadCount: Math.floor(Math.random() * 5),
          isOnline: Math.random() > 0.5,
          avatar: null
        }));
        
        setConversations(mockConversations);
        
        if (mockConversations.length > 0) {
          setActiveConversation(mockConversations[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/messages/${connectionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
      } else {
        // Mock messages for demonstration
        const mockMessages = [
          {
            message_id: 1,
            sender_id: activeConversation?.participant_id,
            content: 'Hi! Thanks for connecting with me.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            sender_name: activeConversation?.participant
          },
          {
            message_id: 2,
            sender_id: user.user_id,
            content: 'Hello! I\'m excited to learn from you.',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            sender_name: user.full_name
          },
          {
            message_id: 3,
            sender_id: activeConversation?.participant_id,
            content: 'What would you like to work on first?',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            sender_name: activeConversation?.participant
          },
          {
            message_id: 4,
            sender_id: user.user_id,
            content: 'I\'d love to learn about React best practices.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            sender_name: user.full_name
          },
          {
            message_id: 5,
            sender_id: activeConversation?.participant_id,
            content: 'Great! Let\'s schedule a session for this week.',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            sender_name: activeConversation?.participant
          }
        ];
        setMessages(mockMessages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    const message = {
      connection_id: activeConversation.connection_id,
      content: newMessage.trim(),
      sender_id: user.user_id
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message)
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
      } else {
        // Mock sending for demonstration
        const mockMessage = {
          message_id: Date.now(),
          sender_id: user.user_id,
          content: newMessage.trim(),
          timestamp: new Date(),
          sender_name: user.full_name
        };
        setMessages(prev => [...prev, mockMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startVideoCall = () => {
    setIsVideoCallOpen(true);
  };

  const startVoiceCall = () => {
    // Implement voice call functionality
    console.log('Starting voice call...');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            <div className="p-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.connection_id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConversation?.connection_id === conversation.connection_id
                      ? 'bg-primary-50 border border-primary-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {conversation.participant?.charAt(0) || 'U'}
                        </span>
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.participant}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(conversation.lastMessageTime, 'h:mm a')}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <UserCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-600 mb-4">Start by connecting with a mentor</p>
                <button className="btn-primary">
                  Find Mentors
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {activeConversation.participant?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{activeConversation.participant}</h3>
                    <p className="text-sm text-gray-500">
                      {activeConversation.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={startVoiceCall}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={startVideoCall}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <VideoCameraIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.message_id}
                  className={`flex ${
                    message.sender_id === user.user_id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender_id === user.user_id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender_id === user.user_id
                          ? 'text-primary-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {format(message.timestamp, 'h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <PlusIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Call Component */}
      <VideoCall
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        participant={activeConversation?.participant}
      />
    </div>
  );
};

export default Chat;
