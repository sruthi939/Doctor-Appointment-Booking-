import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import doctorRoutes from './routes/doctor.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import reviewRoutes from './routes/review.routes.js';
import receptionistRoutes from './routes/receptionist.routes.js';
import accountantRoutes from './routes/accountant.routes.js';
import adminRoutes from './routes/admin.routes.js';

import { notFound, errorHandler } from './middleware/error.middleware.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/receptionist', receptionistRoutes);
app.use('/api/accountant', accountantRoutes);
app.use('/api/admin', adminRoutes);



// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'MediCare Doctor Appointment API is running' });
});

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`[MediCare Backend Server] Running on port ${PORT}`);
});
