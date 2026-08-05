import express from 'express';
import { 
    bookAppointment, 
    getUserAppointments, 
    cancelAppointment, 
    rescheduleAppointment 
} from '../controllers/appointment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/book', protect, bookAppointment);
router.get('/my-appointments', protect, getUserAppointments);
router.put('/:id/cancel', protect, cancelAppointment);
router.put('/:id/reschedule', protect, rescheduleAppointment);

export default router;
