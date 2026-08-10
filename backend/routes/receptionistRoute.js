import express from 'express';
import {
    loginReceptionist,
    getReceptionistDashboard,
    bookWalkInAppointment,
    getAppointmentsList,
    getPatientsList,
    getQueueList,
    markQueueServed
} from '../controllers/receptionistController.js';
import authReceptionist from '../middleware/authReceptionist.js';

const receptionistRouter = express.Router();

receptionistRouter.post('/login', loginReceptionist);
receptionistRouter.get('/dashboard', authReceptionist, getReceptionistDashboard);
receptionistRouter.post('/book-walkin', authReceptionist, bookWalkInAppointment);
receptionistRouter.get('/appointments', authReceptionist, getAppointmentsList);
receptionistRouter.get('/patients', authReceptionist, getPatientsList);
receptionistRouter.get('/queue', authReceptionist, getQueueList);
receptionistRouter.post('/mark-served', authReceptionist, markQueueServed);

export default receptionistRouter;
