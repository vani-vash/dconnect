import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import { verifyFirebaseToken } from './middleware/firebaseAuth.js'; // ✅ added
import { syncUser } from './controllers/userController.js';

dotenv.config();
const app = express();

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API routes
app.get('/api/syncUser', syncUser);
app.use('/api/users', userRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/match', matchRoutes);

// Health check
app.get('/', (req, res) => res.send('Mentorship API running ✅'));

// ✅ Firebase token verification test route
app.get('/api/test-auth', verifyFirebaseToken, (req, res) => {
    console.log("✅ Route hit")
    res.json({
    message: '🔥 Firebase connected successfully!',
    user: req.user
  });
});

// Server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);


