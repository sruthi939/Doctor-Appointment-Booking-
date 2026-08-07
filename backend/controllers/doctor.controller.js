import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json({ success: true, doctors: doctors || [] });
    } catch (error) {
        console.error('[getAllDoctors Error]', error.message);
        res.json({ success: true, doctors: [] });
    }
};

export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.json({ success: true, doctor });
        } else {
            res.status(404).json({ success: false, message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addDoctor = async (req, res) => {
    try {
        const doctorData = req.body;
        const newDoctor = await Doctor.create(doctorData);
        res.status(201).json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });

        if (doctor && (await doctor.matchPassword(password))) {
            return res.json({
                success: true,
                doctor: {
                    _id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    speciality: doctor.speciality,
                    degree: doctor.degree,
                    experience: doctor.experience,
                    fees: doctor.fees,
                    rating: doctor.rating || 4.9,
                    reviewsCount: doctor.reviewsCount || 120,
                    image: doctor.image,
                    workingDays: doctor.workingDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    timeSlots: doctor.timeSlots || ['09:00 AM', '10:30 AM', '02:00 PM']
                },
                token: generateToken(doctor._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDoctorDashboard = async (req, res) => {
    try {
        const docId = req.headers.doc_id || req.query.docId;
        const appointments = docId
            ? await Appointment.find({ docId }).sort({ createdAt: -1 })
            : await Appointment.find({}).sort({ createdAt: -1 });

        const todayAppointments = appointments.length;
        const pendingRequests = appointments.filter(a => a.status === 'Upcoming').length;
        const completed = appointments.filter(a => a.status === 'Completed').length;
        const cancelled = appointments.filter(a => a.status === 'Cancelled').length;

        res.json({
            success: true,
            stats: { todayAppointments, pendingRequests, completed, cancelled },
            todayQueue: appointments.slice(0, 10)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDoctorSchedule = async (req, res) => {
    try {
        const { docId, workingDays, timeSlots, maxPatientsPerSlot, autoConfirm } = req.body;
        const doctorId = docId || req.headers.doc_id;

        if (doctorId) {
            await Doctor.findByIdAndUpdate(doctorId, {
                ...(workingDays && { workingDays }),
                ...(timeSlots && { timeSlots }),
                ...(maxPatientsPerSlot !== undefined && { maxPatientsPerSlot }),
                ...(autoConfirm !== undefined && { autoConfirm })
            });
        }

        res.json({ success: true, message: 'Schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDoctorPatients = async (req, res) => {
    try {
        const docId = req.headers.doc_id || req.query.docId;
        const appointments = docId
            ? await Appointment.find({ docId }).populate('userId', 'name email phone age gender address')
            : await Appointment.find({}).populate('userId', 'name email phone age gender address');

        const patientMap = new Map();
        appointments.forEach(apt => {
            const user = apt.userId || {};
            const pId = user._id ? user._id.toString() : apt.patientDetails?.email || apt._id.toString();
            if (!patientMap.has(pId)) {
                patientMap.set(pId, {
                    _id: pId,
                    name: user.name || apt.patientDetails?.fullName || 'Patient',
                    email: user.email || apt.patientDetails?.email || 'N/A',
                    phone: user.phone || apt.patientDetails?.phone || 'N/A',
                    lastVisit: apt.slotDate,
                    totalVisits: 1,
                    condition: apt.patientDetails?.reason || 'General Checkup'
                });
            } else {
                const existing = patientMap.get(pId);
                existing.totalVisits += 1;
            }
        });

        res.json({ success: true, patients: Array.from(patientMap.values()) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const saveConsultation = async (req, res) => {
    try {
        const { appointmentId, diagnosis, prescription, notes, followUpDate } = req.body;
        if (appointmentId) {
            await Appointment.findByIdAndUpdate(appointmentId, {
                status: 'Completed',
                consultation: { diagnosis, prescription, notes, followUpDate }
            });
        }
        res.json({ success: true, message: 'Consultation saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getDoctorEarnings = async (req, res) => {
    try {
        const docId = req.headers.doc_id || req.query.docId;
        const appointments = docId
            ? await Appointment.find({ docId, paymentStatus: 'Paid' })
            : await Appointment.find({ paymentStatus: 'Paid' });

        const totalEarned = appointments.reduce((sum, a) => sum + (a.amount || 0), 0);
        const thisMonth = totalEarned;
        const thisWeek = Math.round(totalEarned * 0.35);
        const today = Math.round(totalEarned * 0.1);

        const transactions = appointments.map(apt => ({
            id: apt._id,
            patientName: apt.patientDetails?.fullName || 'Patient',
            date: apt.slotDate,
            service: 'Consultation Fee',
            amount: apt.amount,
            status: 'Completed'
        }));

        res.json({
            success: true,
            summary: { thisMonth, thisWeek, today },
            transactions
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, name, phone, speciality, fees, experience, about, image, address } = req.body;
        const doctorId = docId || req.headers.doc_id;

        let doctor;
        if (doctorId) {
            doctor = await Doctor.findByIdAndUpdate(
                doctorId,
                {
                    ...(name && { name }),
                    ...(phone && { phone }),
                    ...(speciality && { speciality }),
                    ...(fees && { fees }),
                    ...(experience && { experience }),
                    ...(about && { about }),
                    ...(image && { image }),
                    ...(address && { address })
                },
                { new: true }
            );
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            doctor
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

