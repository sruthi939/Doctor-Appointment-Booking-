import express from 'express';
import { getAllDoctors, getDoctorById, addDoctor } from '../controllers/doctor.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/add', protect, adminOnly, addDoctor);

export default router;
