import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import { sendBookingConfirmationEmail } from '../services/email.service.js';

// In-memory array fallback if database connection is pending
let memoryAppointments = [
    {
        _id: "APT1245123",
        id: "APT1245123",
        userId: "user123",
        docId: "doc1",
        doctorData: {
            _id: "doc1",
            name: "Dr. Richard James",
            speciality: "General physician",
            fees: 50,
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
        },
        doctor: {
            _id: "doc1",
            name: "Dr. Richard James",
            speciality: "General physician",
            fees: 50,
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
        },
        slotDate: "15 May 2026",
        slotTime: "11:00 AM",
        amount: 50,
        status: "Upcoming",
        paymentStatus: "Paid",
        paymentMethod: "Credit / Debit Card",
        patientDetails: {
            fullName: "John Smith",
            email: "johnsmith@example.com",
            phone: "+1 987 654 3210",
            reason: "Fever and headache"
        },
        reviewSubmitted: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "APT1239088",
        id: "APT1239088",
        userId: "user123",
        docId: "doc3",
        doctorData: {
            _id: "doc3",
            name: "Dr. Sarah Patel",
            speciality: "Dermatologist",
            fees: 30,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
        },
        doctor: {
            _id: "doc3",
            name: "Dr. Sarah Patel",
            speciality: "Dermatologist",
            fees: 30,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
        },
        slotDate: "10 May 2026",
        slotTime: "04:00 PM",
        amount: 30,
        status: "Completed",
        paymentStatus: "Paid",
        paymentMethod: "UPI",
        patientDetails: {
            fullName: "John Smith",
            email: "johnsmith@example.com",
            phone: "+1 987 654 3210",
            reason: "Skin consultation"
        },
        reviewSubmitted: false,
        createdAt: new Date().toISOString()
    }
];

// @desc    Book a new appointment
// @route   POST /api/appointments/book
// @access  Private
export const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime, patientDetails, paymentMethod } = req.body;
        const userId = req.user?._id || 'user123';

        let doctor = await Doctor.findById(docId);
        if (!doctor) {
            doctor = {
                _id: docId,
                name: 'Dr. Richard James',
                speciality: 'General physician',
                fees: 50,
                image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
            };
        }

        const aptId = `APT${Math.floor(1000000 + Math.random() * 9000000)}`;

        let newAppointment;
        try {
            newAppointment = await Appointment.create({
                userId,
                docId,
                doctorData: doctor,
                slotDate,
                slotTime,
                amount: doctor.fees || 50,
                status: 'Upcoming',
                paymentStatus: 'Paid',
                paymentMethod: paymentMethod || 'Credit / Debit Card',
                patientDetails
            });
        } catch (dbErr) {
            newAppointment = {
                _id: aptId,
                id: aptId,
                userId,
                docId,
                doctorData: doctor,
                doctor,
                slotDate,
                slotTime,
                amount: doctor.fees || 50,
                status: 'Upcoming',
                paymentStatus: 'Paid',
                paymentMethod: paymentMethod || 'Credit / Debit Card',
                patientDetails,
                createdAt: new Date().toISOString()
            };
            memoryAppointments.unshift(newAppointment);
        }

        // Send email confirmation asynchronously
        sendBookingConfirmationEmail(patientDetails.email || req.user?.email, newAppointment);

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment: newAppointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current user appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getUserAppointments = async (req, res) => {
    try {
        const userId = req.user?._id;
        let appointments = await Appointment.find({ userId }).sort({ createdAt: -1 });
        
        if (!appointments || appointments.length === 0) {
            return res.json({ success: true, appointments: memoryAppointments });
        }

        const formatted = appointments.map(apt => ({
            ...apt._doc,
            id: apt._id,
            doctor: apt.doctorData
        }));

        res.json({ success: true, appointments: formatted });
    } catch (error) {
        res.json({ success: true, appointments: memoryAppointments });
    }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        let appointment = await Appointment.findById(id);
        if (appointment) {
            appointment.status = 'Cancelled';
            await appointment.save();
        } else {
            memoryAppointments = memoryAppointments.map(apt => apt.id === id || apt._id === id ? { ...apt, status: 'Cancelled' } : apt);
        }

        res.json({ success: true, message: 'Appointment cancelled successfully' });
    } catch (error) {
        memoryAppointments = memoryAppointments.map(apt => apt.id === req.params.id || apt._id === req.params.id ? { ...apt, status: 'Cancelled' } : apt);
        res.json({ success: true, message: 'Appointment cancelled' });
    }
};

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
export const rescheduleAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { newSlotDate, newSlotTime } = req.body;

        let appointment = await Appointment.findById(id);
        if (appointment) {
            appointment.slotDate = newSlotDate;
            appointment.slotTime = newSlotTime;
            appointment.status = 'Upcoming';
            await appointment.save();
        } else {
            memoryAppointments = memoryAppointments.map(apt => 
                apt.id === id || apt._id === id ? { ...apt, slotDate: newSlotDate, slotTime: newSlotTime, status: 'Upcoming' } : apt
            );
        }

        res.json({ success: true, message: 'Appointment rescheduled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
