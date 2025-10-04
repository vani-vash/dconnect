// routes/userRoutes.js
import express from 'express';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
import { syncUser, getProfile } from '../controllers/userController.js';

const router = express.Router(); // ✅ You were missing this line!

// ✅ User sync route
router.post('/sync', verifyFirebaseToken, syncUser);

// ✅ Get user profile route
router.get('/profile', verifyFirebaseToken, getProfile);

// (You can add more routes later, e.g. getAllMentors, verifyMentor, etc.)

export default router; // ✅ Proper default export


