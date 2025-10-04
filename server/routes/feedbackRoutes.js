import express from 'express';
import { addFeedback, getFeedbackByMentor } from '../controllers/feedbackController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
const router = express.Router();
router.post('/', verifyFirebaseToken, addFeedback);
router.get('/:mentor_id', getFeedbackByMentor);
export default router;
