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
        const envEmail = process.env.RECEPTIONIST_EMAIL || "receptionist@medicare.com";
        const envPass = process.env.RECEPTIONIST_PASSWORD || "receptionist123";

        if (email === envEmail && password === envPass) {
            const token = jwt.sign({ id: "RECEPTIONIST_ID" }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }

        const receptionist = await receptionistModel.findOne({ email });
        if (receptionist) {
            const isMatch = await bcrypt.compare(password, receptionist.password);
            if (isMatch) {
                const token = jwt.sign({ id: receptionist._id }, process.env.JWT_SECRET);
                return res.json({ success: true, token });
            }
        }

        return res.json({ success: false, message: "Invalid Receptionist credentials" });
    } catch (error) {
        console.log(error);
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

// API for Receptionist walk-in appointment booking
const bookWalkInAppointment = async (req, res) => {
    try {
        const { patientName, patientPhone, docId, slotDate, slotTime } = req.body;

        if (!patientName || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing Walk-in Details" });
        }

        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData || !docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" });
        }

        const appointmentData = {
            userId: `WALKIN_${Date.now()}`,
            docId,
            userData: {
                name: patientName,
                phone: patientPhone || "0000000000",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
            },
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            payment: true,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        res.json({ success: true, message: "Walk-in Appointment Booked" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    loginReceptionist,
    getReceptionistDashboard,
    bookWalkInAppointment
};
