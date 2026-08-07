import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { sendBookingConfirmationEmail } from '../services/email.service.js';

// @desc    Book a new appointment in MongoDB
// @route   POST /api/appointments/book
// @access  Private
export const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime, patientDetails, paymentMethod } = req.body;
        const userId = req.user?._id;

        const doctor = await Doctor.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const newAppointment = await Appointment.create({
            userId,
            docId,
            doctorData: doctor,
            slotDate,
            slotTime,
            amount: doctor.fees,
            status: 'Upcoming',
            paymentStatus: 'Paid',
            paymentMethod: paymentMethod || 'Credit / Debit Card',
            patientDetails
        });

        // Send email confirmation
        if (patientDetails?.email) {
            sendBookingConfirmationEmail(patientDetails.email, newAppointment);
        }

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully in database',
            appointment: newAppointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user appointments from MongoDB
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getUserAppointments = async (req, res) => {
    try {
        const userId = req.user?._id;
        const query = (req.user?.role === 'ADMIN' || !userId) ? {} : { userId };
        const appointments = await Appointment.find(query).sort({ createdAt: -1 });

        const formatted = appointments.map(apt => ({
            ...apt._doc,
            id: apt._id,
            doctor: apt.doctorData
        }));

        res.json({ success: true, appointments: formatted });
    } catch (error) {
        res.json({ success: true, appointments: [] });
    }
};

// @desc    Cancel appointment in MongoDB
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: 'Cancelled' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({ success: true, message: 'Appointment cancelled successfully in database', appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reschedule appointment in MongoDB
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
export const rescheduleAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { newSlotDate, newSlotTime } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { slotDate: newSlotDate, slotTime: newSlotTime, status: 'Upcoming' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.json({ success: true, message: 'Appointment rescheduled successfully in database', appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
