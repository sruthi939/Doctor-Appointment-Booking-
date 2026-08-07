import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get All Doctors (Pure MongoDB query)
// @route   GET /api/doctors
// @access  Public
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.json({ success: true, doctors: doctors || [] });
    } catch (error) {
        console.error('[getAllDoctors Error]', error.message);
        res.json({ success: true, doctors: [] });
    }
};

// @desc    Get Doctor By ID (Pure MongoDB query)
// @route   GET /api/doctors/:id
// @access  Public
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

// @desc    Add New Doctor (Pure MongoDB creation)
// @route   POST /api/doctors/add
// @access  Private/Admin
export const addDoctor = async (req, res) => {
    try {
        const doctorData = req.body;
        const newDoctor = await Doctor.create(doctorData);
        res.status(201).json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Doctor Login (Pure MongoDB query)
// @route   POST /api/doctors/login
// @access  Public
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
