import React, { useState, useEffect } from 'react';
import './SchedulingSystem.css';

function SchedulingSystem({ user, userRole }) {
  const [currentView, setCurrentView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [showCreateSlot, setShowCreateSlot] = useState(false);
  const [showBookSession, setShowBookSession] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchTimeSlots();
    fetchSessions();
  }, [selectedDate]);

  const fetchTimeSlots = async () => {
    // Mock data for demonstration
    const mockSlots = [
      {
        id: 1,
        mentor: 'Sarah Johnson',
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '10:00',
        type: '1-on-1',
        topic: 'React Hooks',
        isBooked: false,
        mentee: null
      },
      {
        id: 2,
        mentor: 'Mike Chen',
        date: '2024-01-15',
        startTime: '14:00',
        endTime: '15:00',
        type: '1-on-1',
        topic: 'Python Basics',
        isBooked: true,
        mentee: 'Alex Johnson'
      },
      {
        id: 3,
        mentor: 'Emily Rodriguez',
        date: '2024-01-16',
        startTime: '10:00',
        endTime: '12:00',
        type: 'Group',
        topic: 'Open Source Best Practices',
        isBooked: false,
        mentee: null,
        maxParticipants: 10,
        currentParticipants: 3
      }
    ];
    setTimeSlots(mockSlots);
  };

  const fetchSessions = async () => {
    // Mock data for demonstration
    const mockSessions = [
      {
        id: 1,
        title: 'React Hooks Deep Dive',
        mentor: 'Sarah Johnson',
        mentee: 'Alex Johnson',
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '11:00',
        type: '1-on-1',
        status: 'scheduled',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: 2,
        title: 'Python Fundamentals',
        mentor: 'Mike Chen',
        mentee: 'Sarah Chen',
        date: '2024-01-16',
        startTime: '14:00',
        endTime: '15:00',
        type: '1-on-1',
        status: 'completed',
        meetingLink: null
      }
    ];
    setSessions(mockSessions);
  };

  const handleCreateSlot = (slotData) => {
    // This would make an API call to create a new slot
    console.log('Creating slot:', slotData);
    setShowCreateSlot(false);
    fetchTimeSlots();
  };

  const handleBookSession = (slotId) => {
    // This would make an API call to book a session
    console.log('Booking session for slot:', slotId);
    setShowBookSession(false);
    fetchTimeSlots();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeSlotsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return timeSlots.filter(slot => slot.date === dateStr);
  };

  const getSessionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  return (
    <div className="scheduling-system">
      <div className="scheduling-header">
        <h2>Schedule & Sessions</h2>
        <div className="view-toggles">
          <button 
            className={`toggle-btn ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`toggle-btn ${currentView === 'sessions' ? 'active' : ''}`}
            onClick={() => setCurrentView('sessions')}
          >
            📋 Sessions
          </button>
          <button 
            className={`toggle-btn ${currentView === 'slots' ? 'active' : ''}`}
            onClick={() => setCurrentView('slots')}
          >
            ⏰ Time Slots
          </button>
        </div>
      </div>

      {currentView === 'calendar' && (
        <div className="calendar-view">
          <div className="calendar-header">
            <h3>{formatDate(selectedDate)}</h3>
            <div className="date-navigation">
              <button onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}>
                ← Previous
              </button>
              <button onClick={() => setSelectedDate(new Date())}>
                Today
              </button>
              <button onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}>
                Next →
              </button>
            </div>
          </div>

          <div className="calendar-content">
            <div className="time-slots-section">
              <h4>Available Time Slots</h4>
              <div className="slots-grid">
                {getTimeSlotsForDate(selectedDate).map((slot) => (
                  <div key={slot.id} className={`slot-card ${slot.isBooked ? 'booked' : 'available'}`}>
                    <div className="slot-time">
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <div className="slot-details">
                      <h5>{slot.topic}</h5>
                      <p>with {slot.mentor}</p>
                      <span className={`slot-type ${slot.type}`}>{slot.type}</span>
                    </div>
                    {!slot.isBooked && userRole === 'mentee' && (
                      <button 
                        className="book-btn"
                        onClick={() => {
                          setSelectedSlot(slot);
                          setShowBookSession(true);
                        }}
                      >
                        Book Now
                      </button>
                    )}
                    {slot.isBooked && (
                      <div className="booked-status">
                        Booked by {slot.mentee}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="sessions-section">
              <h4>Scheduled Sessions</h4>
              <div className="sessions-grid">
                {getSessionsForDate(selectedDate).map((session) => (
                  <div key={session.id} className={`session-card ${session.status}`}>
                    <div className="session-time">
                      {session.startTime} - {session.endTime}
                    </div>
                    <div className="session-details">
                      <h5>{session.title}</h5>
                      <p>{session.mentor} → {session.mentee}</p>
                      <span className={`session-type ${session.type}`}>{session.type}</span>
                    </div>
                    <div className="session-actions">
                      {session.status === 'scheduled' && (
                        <button className="join-btn">
                          Join Session
                        </button>
                      )}
                      {session.status === 'completed' && (
                        <button className="review-btn">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'sessions' && (
        <div className="sessions-view">
          <div className="sessions-header">
            <h3>All Sessions</h3>
            <div className="session-filters">
              <select>
                <option value="all">All Sessions</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="sessions-list">
            {sessions.map((session) => (
              <div key={session.id} className={`session-item ${session.status}`}>
                <div className="session-info">
                  <h4>{session.title}</h4>
                  <p className="session-participants">
                    {session.mentor} → {session.mentee}
                  </p>
                  <div className="session-meta">
                    <span className="session-date">📅 {session.date}</span>
                    <span className="session-time">🕐 {session.startTime} - {session.endTime}</span>
                    <span className={`session-type ${session.type}`}>{session.type}</span>
                  </div>
                </div>
                <div className="session-status">
                  <span className={`status-badge ${session.status}`}>
                    {session.status}
                  </span>
                </div>
                <div className="session-actions">
                  {session.status === 'scheduled' && (
                    <>
                      <button className="action-btn primary">Join</button>
                      <button className="action-btn secondary">Reschedule</button>
                    </>
                  )}
                  {session.status === 'completed' && (
                    <button className="action-btn">Review</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'slots' && (
        <div className="slots-view">
          <div className="slots-header">
            <h3>Time Slots</h3>
            {userRole === 'mentor' && (
              <button 
                className="create-slot-btn"
                onClick={() => setShowCreateSlot(true)}
              >
                + Create New Slot
              </button>
            )}
          </div>

          <div className="slots-list">
            {timeSlots.map((slot) => (
              <div key={slot.id} className={`slot-item ${slot.isBooked ? 'booked' : 'available'}`}>
                <div className="slot-info">
                  <h4>{slot.topic}</h4>
                  <p className="slot-mentor">with {slot.mentor}</p>
                  <div className="slot-meta">
                    <span className="slot-date">📅 {slot.date}</span>
                    <span className="slot-time">🕐 {slot.startTime} - {slot.endTime}</span>
                    <span className={`slot-type ${slot.type}`}>{slot.type}</span>
                  </div>
                  {slot.type === 'Group' && (
                    <div className="group-info">
                      <span>Participants: {slot.currentParticipants}/{slot.maxParticipants}</span>
                    </div>
                  )}
                </div>
                <div className="slot-status">
                  <span className={`status-badge ${slot.isBooked ? 'booked' : 'available'}`}>
                    {slot.isBooked ? 'Booked' : 'Available'}
                  </span>
                </div>
                <div className="slot-actions">
                  {!slot.isBooked && userRole === 'mentee' && (
                    <button 
                      className="action-btn primary"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setShowBookSession(true);
                      }}
                    >
                      Book
                    </button>
                  )}
                  {slot.isBooked && (
                    <span className="booked-by">Booked by {slot.mentee}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCreateSlot && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create New Time Slot</h3>
              <button className="close-btn" onClick={() => setShowCreateSlot(false)}>×</button>
            </div>
            <CreateSlotForm onSubmit={handleCreateSlot} onCancel={() => setShowCreateSlot(false)} />
          </div>
        </div>
      )}

      {showBookSession && selectedSlot && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Book Session</h3>
              <button className="close-btn" onClick={() => setShowBookSession(false)}>×</button>
            </div>
            <BookSessionForm 
              slot={selectedSlot} 
              onSubmit={handleBookSession} 
              onCancel={() => setShowBookSession(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CreateSlotForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '1-on-1',
    maxParticipants: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Topic</label>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Session Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="1-on-1">1-on-1</option>
          <option value="Group">Group</option>
        </select>
      </div>
      {formData.type === 'Group' && (
        <div className="form-group">
          <label>Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="2"
            max="20"
          />
        </div>
      )}
      <div className="form-actions">
        <button type="submit" className="submit-btn">Create Slot</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
}

function BookSessionForm({ slot, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    goals: '',
    questions: '',
    preparation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(slot.id);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="slot-summary">
        <h4>{slot.topic}</h4>
        <p>with {slot.mentor}</p>
        <p>{slot.date} at {slot.startTime} - {slot.endTime}</p>
      </div>
      <div className="form-group">
        <label>What do you want to learn/achieve?</label>
        <textarea
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          rows="3"
          placeholder="Describe your learning goals..."
        />
      </div>
      <div className="form-group">
        <label>Any specific questions?</label>
        <textarea
          name="questions"
          value={formData.questions}
          onChange={handleChange}
          rows="2"
          placeholder="What would you like to ask your mentor?"
        />
      </div>
      <div className="form-group">
        <label>How are you preparing?</label>
        <textarea
          name="preparation"
          value={formData.preparation}
          onChange={handleChange}
          rows="2"
          placeholder="What have you done to prepare for this session?"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Book Session</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
}

export default SchedulingSystem;

