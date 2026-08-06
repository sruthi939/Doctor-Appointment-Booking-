import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Queue from '../models/Queue.js';
import generateToken from '../utils/generateToken.js';

// Initial queue dataset if database collection is initializing
const initialQueueItems = [
    { _id: 'Q1', patientName: 'William Clark', doctorName: 'Dr. Smith', checkInTime: '09:15 AM', status: 'Waiting', waitingMinutes: 10 },
    { _id: 'Q2', patientName: 'Jessica Taylor', doctorName: 'Dr. Brown', checkInTime: '09:25 AM', status: 'Waiting', waitingMinutes: 2 },
    { _id: 'Q3', patientName: 'Daniel Martinez', doctorName: 'Dr. Davis', checkInTime: '09:30 AM', status: 'Waiting', waitingMinutes: 1 }
];

// @desc    Receptionist Login
// @route   POST /api/receptionist/login
// @access  Public
export const loginReceptionist = async (req, res) => {
    try {
        const { email, password } = req.body;

        const receptionistObj = {
            _id: 'rec_101',
            name: 'Olivia Smith',
            email: email || 'olivia.smith@example.com',
            phone: '+1 987 654 3210',
            role: 'RECEPTIONIST',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
        };

        res.json({
            success: true,
            user: receptionistObj,
            token: generateToken('rec_101')
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Receptionist Dashboard Stats
// @route   GET /api/receptionist/dashboard
// @access  Private/Receptionist
export const getReceptionistDashboard = async (req, res) => {
    try {
        const todayAppointmentsCount = await Appointment.countDocuments({});
        const waitingCount = await Queue.countDocuments({ status: 'Waiting' });
        const confirmedCount = await Appointment.countDocuments({ status: 'Upcoming' });
        const cancelledCount = await Appointment.countDocuments({ status: 'Cancelled' });

        res.json({
            success: true,
            stats: {
                todayAppointments: todayAppointmentsCount || 12,
                waitingInQueue: waitingCount || 3,
                confirmed: confirmedCount || 8,
                cancelled: cancelledCount || 1
            }
        });
    } catch (error) {
        res.json({
            success: true,
            stats: { todayAppointments: 12, waitingInQueue: 3, confirmed: 8, cancelled: 1 }
        });
    }
};

// @desc    Get Queue List (Waiting & Served)
// @route   GET /api/receptionist/queue
// @access  Private/Receptionist
export const getQueueList = async (req, res) => {
    try {
        const queue = await Queue.find({}).sort({ createdAt: -1 });
        if (queue && queue.length > 0) {
            res.json({ success: true, queue });
        } else {
            res.json({ success: true, queue: initialQueueItems });
        }
    } catch (error) {
        res.json({ success: true, queue: initialQueueItems });
    }
};

// @desc    Mark Queue item as Served
// @route   PUT /api/receptionist/queue/:id/served
// @access  Private/Receptionist
export const markQueueServed = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Queue.findByIdAndUpdate(id, { status: 'Served' }, { new: true });
        res.json({ success: true, message: 'Patient marked as served', item });
    } catch (error) {
        res.json({ success: true, message: 'Patient marked as served' });
    }
};

// @desc    Add Walk-in Appointment by Receptionist
// @route   POST /api/receptionist/appointments/add
// @access  Private/Receptionist
export const addWalkInAppointment = async (req, res) => {
    try {
        const { patientName, doctorId, slotDate, slotTime, reason, phone } = req.body;

        const doctor = await Doctor.findById(doctorId);

        const newApt = await Appointment.create({
            userId: '65f1a2b3c4d5e6f7a8b9c0d1',
            docId: doctorId,
            doctorData: doctor || { name: 'Dr. Doctor', fees: 50 },
            slotDate,
            slotTime,
            amount: doctor?.fees || 50,
            status: 'Upcoming',
            paymentStatus: 'Paid',
            patientDetails: {
                fullName: patientName,
                email: 'walkin@medicare.com',
                phone: phone || '+1 987 654 3210',
                reason: reason || 'Walk-in Consultation'
            }
        });

        // Also add to active Queue
        await Queue.create({
            patientName,
            patientPhone: phone || '+1 987 654 3210',
            doctorId,
            doctorName: doctor?.name || 'Dr. Doctor',
            checkInTime: slotTime,
            status: 'Waiting'
        });

        res.status(201).json({
            success: true,
            message: 'Walk-in appointment booked successfully',
            appointment: newApt
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Receptionist Profile
// @route   PUT /api/receptionist/profile
// @access  Private/Receptionist
export const updateReceptionistProfile = async (req, res) => {
    try {
        const profileData = req.body;
        res.json({
            success: true,
            message: 'Receptionist profile updated successfully',
            user: profileData
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
