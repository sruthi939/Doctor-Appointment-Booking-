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

// API to book walk-in appointment
const bookWalkInAppointment = async (req, res) => {
    try {
        const { patientName, phone, doctorId, slotDate, slotTime, reason } = req.body;

        if (!patientName || !phone || !doctorId || !slotDate || !slotTime) {
            return res.json({
                success: false,
                message: "Missing Details: Patient Name, Phone, Doctor, Date, and Time are required"
            });
        }

        // Find Doctor
        const doctorData = await doctorModel.findById(doctorId).select('-password');
        if (!doctorData) {
            return res.json({ success: false, message: "Selected doctor not found" });
        }

        // Find or create Patient user
        let user = await userModel.findOne({ phone });
        if (!user) {
            user = new userModel({
                name: patientName,
                email: `${phone}@patient.com`,
                phone: phone,
                password: 'default_walkin_pass'
            });
            await user.save();
        }

        // Save Appointment
        const appointmentData = {
            userId: user._id,
            docId: doctorData._id,
            userData: user,
            docData: doctorData,
            amount: doctorData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
            reason: reason || 'Walk-In Patient',
            payment: true,
            isCompleted: false,
            cancelled: false
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update Doctor Slots
        let slots_booked = doctorData.slots_booked || {};
        if (slots_booked[slotDate]) {
            slots_booked[slotDate].push(slotTime);
        } else {
            slots_booked[slotDate] = [slotTime];
        }
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

        res.json({
            success: true,
            message: "Walk-in appointment booked successfully",
            appointment: newAppointment
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// API to get appointments list for receptionist
const getAppointmentsList = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to get patients list for receptionist
const getPatientsList = async (req, res) => {
    try {
        const patients = await userModel.find({}).select('-password');
        res.json({ success: true, patients });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to get active queue for receptionist
const getQueueList = async (req, res) => {
    try {
        const queue = await appointmentModel.find({ cancelled: false, isCompleted: false });
        res.json({ success: true, queue });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to mark queue item served
const markQueueServed = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
        res.json({ success: true, message: "Patient checked-in & marked completed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export {
    loginReceptionist,
    getReceptionistDashboard,
    bookWalkInAppointment,
    getAppointmentsList,
    getPatientsList,
    getQueueList,
    markQueueServed
};
