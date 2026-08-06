import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Queue from '../models/Queue.js';
import Schedule from '../models/Schedule.js';
import generateToken from '../utils/generateToken.js';

export const loginReceptionist = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reqEmail = email || 'olivia.smith@example.com';

        let receptionist = await User.findOne({ email: reqEmail, role: 'RECEPTIONIST' });

        if (!receptionist) {
            receptionist = await User.create({
                name: 'Olivia Smith',
                email: reqEmail,
                password: password || 'password123',
                role: 'RECEPTIONIST',
                phone: '+1 987 654 3210',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
            });
        }

        res.json({
            success: true,
            user: {
                _id: receptionist._id,
                name: receptionist.name,
                email: receptionist.email,
                phone: receptionist.phone,
                role: receptionist.role,
                image: receptionist.image,
                address: receptionist.address
            },
            token: generateToken(receptionist._id)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReceptionistDashboard = async (req, res) => {
    try {
        const todayAppointmentsCount = await Appointment.countDocuments({});
        const waitingCount = await Queue.countDocuments({ status: 'Waiting' });
        const confirmedCount = await Appointment.countDocuments({ status: 'Upcoming' });
        const cancelledCount = await Appointment.countDocuments({ status: 'Cancelled' });

        res.json({
            success: true,
            stats: {
                todayAppointments: todayAppointmentsCount,
                waitingInQueue: waitingCount,
                confirmed: confirmedCount,
                cancelled: cancelledCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getQueueList = async (req, res) => {
    try {
        const queue = await Queue.find({}).sort({ createdAt: -1 });
        res.json({ success: true, queue });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markQueueServed = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Queue.findByIdAndUpdate(id, { status: 'Served' }, { new: true });
        res.json({ success: true, message: 'Patient marked as served', item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addWalkInAppointment = async (req, res) => {
    try {
        const { patientName, doctorId, slotDate, slotTime, reason, phone } = req.body;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Selected doctor not found' });
        }

        const newApt = await Appointment.create({
            userId: '65f1a2b3c4d5e6f7a8b9c0d1',
            docId: doctorId,
            doctorData: doctor,
            slotDate: slotDate || new Date().toISOString().split('T')[0],
            slotTime: slotTime || '09:00 AM',
            amount: doctor.fees || 50,
            status: 'Upcoming',
            paymentStatus: 'Paid',
            patientDetails: {
                fullName: patientName,
                email: `${patientName.toLowerCase().replace(/\s+/g, '')}@walkin.com`,
                phone: phone || '+1 987 654 3210',
                reason: reason || 'Walk-in Consultation'
            }
        });

        // Add to Queue
        await Queue.create({
            patientName,
            patientPhone: phone || '+1 987 654 3210',
            doctorId,
            doctorName: doctor.name,
            checkInTime: slotTime || '09:00 AM',
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

export const getReceptionistAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 });
        const formatted = appointments.map(apt => ({
            id: apt._id,
            patient: apt.patientDetails?.fullName || 'Patient',
            doctor: apt.doctorData?.name || 'Doctor',
            date: apt.slotDate,
            time: apt.slotTime,
            status: apt.status === 'Upcoming' ? 'Confirmed' : apt.status,
            phone: apt.patientDetails?.phone,
            amount: apt.amount
        }));
        res.json({ success: true, appointments: formatted });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReceptionistPatients = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 });

        const patientMap = new Map();
        appointments.forEach(apt => {
            const name = apt.patientDetails?.fullName || 'Patient';
            const phone = apt.patientDetails?.phone || '+1 987 654 3210';
            const email = apt.patientDetails?.email || 'N/A';
            const key = phone !== '+1 987 654 3210' ? phone : name;

            if (!patientMap.has(key)) {
                patientMap.set(key, {
                    id: apt._id,
                    name,
                    phone,
                    email,
                    lastVisit: apt.slotDate,
                    totalVisits: 1,
                    status: 'Active'
                });
            } else {
                const item = patientMap.get(key);
                item.totalVisits += 1;
            }
        });

        res.json({ success: true, patients: Array.from(patientMap.values()) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReceptionistSchedule = async (req, res) => {
    try {
        let schedule = await Schedule.findOne({ key: 'clinic_schedule' });
        if (!schedule) {
            schedule = await Schedule.create({
                key: 'clinic_schedule',
                workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                timeSlots: [
                    '09:00 AM - 10:00 AM',
                    '10:00 AM - 11:00 AM',
                    '11:00 AM - 12:00 PM',
                    '02:00 PM - 03:00 PM',
                    '03:00 PM - 04:00 PM',
                    '04:00 PM - 05:00 PM'
                ]
            });
        }
        res.json({ success: true, schedule });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateReceptionistSchedule = async (req, res) => {
    try {
        const { workingDays, timeSlots } = req.body;
        const schedule = await Schedule.findOneAndUpdate(
            { key: 'clinic_schedule' },
            { workingDays, timeSlots },
            { new: true, upsert: true }
        );
        res.json({ success: true, message: 'Clinic schedule saved successfully', schedule });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateReceptionistProfile = async (req, res) => {
    try {
        const { name, phone, address, gender, dob } = req.body;
        const receptionist = await User.findOneAndUpdate(
            { role: 'RECEPTIONIST' },
            { name, phone, address, gender, dob },
            { new: true }
        );
        res.json({
            success: true,
            message: 'Receptionist profile updated successfully',
            user: receptionist
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
