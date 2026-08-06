import express from 'express';
import { getUserProfile, updateUserProfile, getAllUsers } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/all-users', getAllUsers);

export default router;
