# DCONNECT Frontend

A modern, responsive React frontend for the DCONNECT mentorship platform that connects aspiring developers with experienced mentors.

## 🚀 Features

### Core Platform Features
- **User Profiles**: Comprehensive mentor and mentee profiles with skills, goals, and experience
- **Smart Matching**: AI-powered algorithm to match mentees with suitable mentors
- **Mentorship Modes**: Support for 1-to-1 and group mentorship sessions
- **Real-time Chat**: In-app messaging with video calling capabilities
- **Scheduling System**: Advanced scheduling with availability management
- **Progress Tracking**: Goal-based learning plans and skill visualization

### Mentor Productivity Tools
- **Mentor Dashboard**: Overview of mentees, sessions, and impact metrics
- **Session Management**: Easy scheduling and session tracking
- **Quick Reply Templates**: Reusable resources for common queries
- **Analytics**: Detailed insights into mentorship effectiveness

### Mentee Growth Features
- **Learning Goals**: Set and track personalized learning objectives
- **Progress Visualization**: Skill graphs and achievement tracking
- **Session History**: Complete record of learning sessions
- **Community Access**: Connect with peers and share experiences

### Engagement & Community
- **Discussion Forums**: Topic-based community discussions
- **Project Showcase**: Share and discover projects
- **Achievement System**: Badges and recognition for milestones
- **Peer Mentorship**: Advanced mentees can become junior mentors

### Advanced Features
- **Video Calling**: Integrated WebRTC video calling
- **Real-time Notifications**: Instant updates and reminders
- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Theme**: Customizable appearance
- **Multi-language Support**: Internationalization ready

## 🛠️ Tech Stack

- **React 19**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router**: Client-side routing and navigation
- **Firebase**: Authentication and real-time features
- **WebRTC**: Video calling functionality
- **Axios**: HTTP client for API communication
- **Heroicons**: Beautiful SVG icons
- **Date-fns**: Date manipulation and formatting
- **React Hot Toast**: Elegant notifications
- **Vite**: Fast build tool and development server

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dconnect/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Google Authentication
   - Update `src/firebase.js` with your Firebase config

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Login.jsx       # Authentication component
│   └── VideoCall.jsx   # Video calling modal
├── pages/              # Page components
│   ├── Dashboard.jsx   # Mentee dashboard
│   ├── MentorDashboard.jsx # Mentor dashboard
│   ├── FindMentors.jsx # Mentor discovery
│   ├── Chat.jsx        # Messaging interface
│   ├── Schedule.jsx    # Scheduling system
│   ├── Progress.jsx    # Progress tracking
│   ├── Community.jsx   # Community features
│   ├── Profile.jsx     # User profile
│   └── Settings.jsx    # User settings
├── firebase.js         # Firebase configuration
├── App.jsx            # Main application component
└── index.css          # Global styles and Tailwind
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Gray tones (#64748b, #475569, #334155)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Consistent spacing and shadows
- **Forms**: Accessible input fields and labels
- **Navigation**: Responsive header with mobile menu

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Form and typography plugins
- Responsive breakpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Mobile-first navigation
- Collapsible sidebar
- Touch-friendly interactions
- Optimized video calling for mobile

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🔌 API Integration

The frontend integrates with the DCONNECT backend API:

### Authentication Endpoints
- `POST /api/users/sync` - Sync user with backend
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Core Features
- `GET /api/users/mentors` - Fetch available mentors
- `POST /api/connections` - Create mentor-mentee connection
- `GET /api/messages/:connectionId` - Fetch messages
- `POST /api/messages` - Send message
- `GET /api/slots/:userId` - Get user's availability
- `POST /api/slots` - Create availability slot

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

## 🔮 Roadmap

### Upcoming Features
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered mentor recommendations
- [ ] Integration with GitHub
- [ ] Calendar synchronization
- [ ] Multi-language support
- [ ] Advanced video calling features
- [ ] Gamification system

---

Built with ❤️ for the developer community
