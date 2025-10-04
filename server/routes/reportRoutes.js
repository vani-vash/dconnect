import express from 'express';
import { reportUser, getReports } from '../controllers/reportController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
const router = express.Router();
router.post('/', verifyFirebaseToken, reportUser);
router.get('/', verifyFirebaseToken, getReports);
export default router;
