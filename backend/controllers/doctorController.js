import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// API to change doctor availability for Admin/Doctor Panel
const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all doctors list for frontend
const doctorList = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, doctors: [] });
        }
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: true, doctors: [], message: error.message });
    }
};

// API for Doctor Login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: false, message: 'Database connection issue. Please retry.' });
        }
        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, appointments: [] });
        }
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment Completed' });
        }
        res.json({ success: false, message: 'Appointment cancellation failed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment Cancelled' });
        }
        res.json({ success: false, message: 'Cancellation Failed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: 'Profile Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorProfile,
    updateDoctorProfile
};
