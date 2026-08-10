import receptionistModel from "../models/receptionistModel.js";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// API for Receptionist Login
const loginReceptionist = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const receptionist = await receptionistModel.findOne({ email });

        if (!receptionist) {
            return res.json({ success: false, message: "Receptionist account not found. Contact Admin to register." });
        }

        const isMatch = await bcrypt.compare(password, receptionist.password);

        if (isMatch) {
            const token = jwt.sign({ id: receptionist._id }, process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321');
            return res.json({
                success: true,
                token,
                name: receptionist.name,
                email: receptionist.email
            });
        } else {
            return res.json({ success: false, message: "Invalid password credentials" });
        }
    } catch (error) {
        console.log("Receptionist Login Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to get receptionist dashboard metrics
const getReceptionistDashboard = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        const doctorsCount = await doctorModel.countDocuments({});
        const patientsCount = await userModel.countDocuments({});

        let pendingCheckinsCount = 0;

        appointments.forEach(apt => {
            if (!apt.cancelled && !apt.isCompleted) {
                pendingCheckinsCount++;
            }
        });

        const dashData = {
            totalAppointments: appointments.length,
            totalDoctors: doctorsCount,
            totalPatients: patientsCount,
            pendingCheckins: pendingCheckinsCount,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const bookWalkInAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;

        if (!patientId || !doctorId || !date || !time) {
            return res.status(400).json({
                success: false,
                message: "Patient, doctor, date and time are required"
            });
        }

        // Add your Appointment model/database logic here

        res.status(201).json({
            success: true,
            message: "Walk-in appointment booked successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    loginReceptionist,
    getReceptionistDashboard
};
