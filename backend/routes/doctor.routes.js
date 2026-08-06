import express from 'express';
import { 
    getAllDoctors, 
    getDoctorById, 
    addDoctor,
    loginDoctor,
    getDoctorDashboard,
    updateDoctorSchedule,
    getDoctorPatients,
    saveConsultation,
    getDoctorEarnings,
    updateDoctorProfile
} from '../controllers/doctor.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);
router.post('/login', loginDoctor);

// Protected Doctor Portal routes
router.get('/portal/dashboard', getDoctorDashboard);
router.put('/portal/schedule', updateDoctorSchedule);
router.get('/portal/patients', getDoctorPatients);
router.post('/portal/consultation', saveConsultation);
router.get('/portal/earnings', getDoctorEarnings);
router.put('/portal/profile', updateDoctorProfile);

// Admin route
router.post('/add', protect, adminOnly, addDoctor);

export default router;

