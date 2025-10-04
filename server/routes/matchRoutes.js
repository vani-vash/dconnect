import express from 'express';
import { getMatches } from '../controllers/matchController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
const router = express.Router();
router.post('/', verifyFirebaseToken, getMatches);
export default router;
