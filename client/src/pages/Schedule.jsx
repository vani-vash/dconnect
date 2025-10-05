import React, { useEffect, useState } from 'react';
import { CalendarIcon, ClockIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const Schedule = ({ user }) => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    start_time: '',
    end_time: '',
    max_mentees: 1,
    topic: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
    fetchBookings();
  }, [user, selectedDate]);

  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/slots/${user.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSlots(data);
      } else {
        // Mock slots for demonstration
        const mockSlots = [
          {
            slot_id: 1,
            start_time: new Date(selectedDate.getTime() + 9 * 60 * 60 * 1000), // 9 AM
            end_time: new Date(selectedDate.getTime() + 10 * 60 * 60 * 1000), // 10 AM
            max_mentees: 1,
            topic: 'React Best Practices',
            description: 'Deep dive into React patterns and best practices',
            booked_count: 0
          },
          {
            slot_id: 2,
            start_time: new Date(selectedDate.getTime() + 14 * 60 * 60 * 1000), // 2 PM
            end_time: new Date(selectedDate.getTime() + 15 * 60 * 60 * 1000), // 3 PM
            max_mentees: 2,
            topic: 'Node.js Architecture',
            description: 'Understanding Node.js backend architecture',
            booked_count: 1
          }
        ];
        setSlots(mockSlots);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/bookings/${user.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        // Mock bookings for demonstration
        const mockBookings = [
          {
            booking_id: 1,
            slot_id: 2,
            mentee_name: 'Alice Johnson',
            topic: 'Node.js Architecture',
            start_time: new Date(selectedDate.getTime() + 14 * 60 * 60 * 1000),
            end_time: new Date(selectedDate.getTime() + 15 * 60 * 60 * 1000),
            status: 'confirmed'
          }
        ];
        setBookings(mockBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const createSlot = async () => {
    try {
      const token = localStorage.getItem('token');
      const slotData = {
        ...newSlot,
        start_time: new Date(`${selectedDate.toDateString()} ${newSlot.start_time}`),
        end_time: new Date(`${selectedDate.toDateString()} ${newSlot.end_time}`)
      };

      const response = await fetch('http://localhost:3000/api/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(slotData)
      });

      if (response.ok) {
        const newSlotData = await response.json();
        setSlots(prev => [...prev, newSlotData]);
        setShowSlotForm(false);
        setNewSlot({
          start_time: '',
          end_time: '',
          max_mentees: 1,
          topic: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };

  const deleteSlot = async (slotId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/slots/${slotId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setSlots(prev => prev.filter(slot => slot.slot_id !== slotId));
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    return eachDayOfInterval({ start, end });
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Management</h1>
          <p className="text-gray-600">
            {user.role === 'mentor' ? 'Manage your availability and sessions' : 'Book sessions with your mentors'}
          </p>
        </div>
        {user.role === 'mentor' && (
          <button
            onClick={() => setShowSlotForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Slot</span>
          </button>
        )}
      </div>

      {/* Calendar Navigation */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -7))}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 7))}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              →
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {getWeekDays().map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(day)}
              className={`p-3 text-center rounded-lg transition-colors ${
                format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-sm font-medium">{format(day, 'EEE')}</div>
              <div className="text-lg">{format(day, 'd')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Date Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Slots */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Available Slots - {format(selectedDate, 'MMM dd, yyyy')}
          </h2>
          
          {slots.length > 0 ? (
            <div className="space-y-4">
              {slots.map((slot) => (
                <div key={slot.slot_id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {format(slot.start_time, 'h:mm a')} - {format(slot.end_time, 'h:mm a')}
                      </span>
                    </div>
                    {user.role === 'mentor' && (
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteSlot(slot.slot_id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{slot.topic}</h3>
                  <p className="text-sm text-gray-600 mb-2">{slot.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {slot.booked_count}/{slot.max_mentees} booked
                    </span>
                    {user.role === 'mentee' && slot.booked_count < slot.max_mentees && (
                      <button className="btn-primary text-sm">
                        Book Session
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No slots available for this date</p>
              {user.role === 'mentor' && (
                <button
                  onClick={() => setShowSlotForm(true)}
                  className="btn-primary"
                >
                  Add Availability
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bookings */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Booked Sessions - {format(selectedDate, 'MMM dd, yyyy')}
          </h2>
          
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.booking_id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {format(booking.start_time, 'h:mm a')} - {format(booking.end_time, 'h:mm a')}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{booking.topic}</h3>
                  <p className="text-sm text-gray-600">
                    {user.role === 'mentor' ? `with ${booking.mentee_name}` : `with mentor`}
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="btn-primary text-sm">
                      Join Session
                    </button>
                    <button className="btn-secondary text-sm">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No bookings for this date</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Slot Modal */}
      {showSlotForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Slot</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newSlot.start_time}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, start_time: e.target.value }))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={newSlot.end_time}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, end_time: e.target.value }))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  value={newSlot.topic}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="e.g., React Best Practices"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newSlot.description}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of what will be covered"
                  rows={3}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Mentees
                </label>
                <select
                  value={newSlot.max_mentees}
                  onChange={(e) => setNewSlot(prev => ({ ...prev, max_mentees: parseInt(e.target.value) }))}
                  className="input-field"
                >
                  <option value={1}>1 (1-on-1)</option>
                  <option value={2}>2 (Small Group)</option>
                  <option value={3}>3 (Group)</option>
                  <option value={5}>5 (Large Group)</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSlotForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={createSlot}
                className="btn-primary"
              >
                Create Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
