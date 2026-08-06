import express from 'express';
import { 
    loginReceptionist, 
    getReceptionistDashboard, 
    getQueueList, 
    markQueueServed, 
    addWalkInAppointment, 
    updateReceptionistProfile 
} from '../controllers/receptionist.controller.js';

const router = express.Router();

router.post('/login', loginReceptionist);
router.get('/dashboard', getReceptionistDashboard);
router.get('/queue', getQueueList);
router.put('/queue/:id/served', markQueueServed);
router.post('/appointments/add', addWalkInAppointment);
router.put('/profile', updateReceptionistProfile);

export default router;
