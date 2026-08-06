import express from 'express';
import { 
    loginReceptionist, 
    getReceptionistDashboard, 
    getQueueList, 
    markQueueServed, 
    addWalkInAppointment,
    getReceptionistAppointments,
    getReceptionistPatients,
    getReceptionistSchedule,
    updateReceptionistSchedule,
    updateReceptionistProfile 
} from '../controllers/receptionist.controller.js';

const router = express.Router();

router.post('/login', loginReceptionist);
router.get('/dashboard', getReceptionistDashboard);
router.get('/queue', getQueueList);
router.put('/queue/:id/served', markQueueServed);
router.post('/appointments/add', addWalkInAppointment);
router.get('/appointments', getReceptionistAppointments);
router.get('/patients', getReceptionistPatients);
router.get('/schedule', getReceptionistSchedule);
router.put('/schedule', updateReceptionistSchedule);
router.put('/profile', updateReceptionistProfile);

export default router;
