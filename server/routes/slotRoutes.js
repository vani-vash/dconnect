// routes/slotRoutes.js
import express from 'express';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
import { createSlot, listOpenSlots, closeSlot } from '../controllers/slotController.js';


const router = express.Router();

router.post('/create', verifyFirebaseToken, createSlot);
router.get('/get', verifyFirebaseToken, listOpenSlots);
router.post('/close/:slot_id', verifyFirebaseToken, closeSlot);

export default router;

