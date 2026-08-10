import express from 'express';
import {
    loginReceptionist,
    getReceptionistDashboard,
    bookWalkInAppointment
} from '../controllers/receptionistController.js';
import authReceptionist from '../middleware/authReceptionist.js';

const receptionistRouter = express.Router();

receptionistRouter.post('/login', loginReceptionist);
receptionistRouter.get('/dashboard', authReceptionist, getReceptionistDashboard);
receptionistRouter.post('/book-walkin', authReceptionist, bookWalkInAppointment);

export default receptionistRouter;
