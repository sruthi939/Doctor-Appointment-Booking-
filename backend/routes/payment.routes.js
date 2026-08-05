import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/process', protect, processPayment);

export default router;
