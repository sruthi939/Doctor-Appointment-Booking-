import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import accountantModel from "../models/accountantModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// API for Accountant Login
const loginAccountant = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const accountant = await accountantModel.findOne({ email });

        if (!accountant) {
            return res.json({ success: false, message: "Accountant account not found. Contact Admin to register." });
        }

        const isMatch = await bcrypt.compare(password, accountant.password);

        if (isMatch) {
            const token = jwt.sign({ id: accountant._id }, process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321');
            return res.json({
                success: true,
                token,
                name: accountant.name,
                email: accountant.email
            });
        } else {
            return res.json({ success: false, message: "Invalid password credentials" });
        }
    } catch (error) {
        console.log("Accountant Login Error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to get accountant dashboard stats & financial metrics
const getAccountantDashboard = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        const totalDoctors = await doctorModel.countDocuments({});
        const totalPatients = await userModel.countDocuments({});

        let totalRevenue = 0;
        let pendingRefundsCount = 0;
        let totalTransactions = appointments.length;

        appointments.forEach(apt => {
            if (apt.payment || apt.isCompleted) {
                totalRevenue += (apt.amount || 50);
            }
            if (apt.cancelled && (apt.payment || apt.amount)) {
                pendingRefundsCount++;
            }
        });

        const recentTransactions = appointments.reverse().slice(0, 5).map((apt, index) => ({
            id: apt._id,
            transactionId: `#TXN-${1000 + index}`,
            patientName: apt.userData?.name || "Patient",
            doctorName: apt.docData?.name || "Doctor",
            amount: apt.amount || 50,
            date: apt.slotDate || new Date().toISOString().split('T')[0],
            paymentMethod: apt.paymentMethod || "Card",
            status: apt.cancelled ? "Refund Pending" : (apt.payment || apt.isCompleted) ? "Completed" : "Pending"
        }));

        const dashData = {
            totalRevenue,
            totalTransactions,
            totalDoctors,
            totalPatients,
            pendingRefunds: pendingRefundsCount,
            recentTransactions
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get payment transactions
const getPaymentTransactions = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        const transactions = appointments.map((apt, index) => ({
            id: apt._id,
            transactionId: `#TXN-${1000 + index}`,
            patientName: apt.userData?.name || "Patient",
            doctorName: apt.docData?.name || "Doctor",
            amount: apt.amount || 50,
            date: apt.slotDate || new Date().toISOString().split('T')[0],
            paymentMethod: apt.paymentMethod || "Card",
            status: apt.cancelled ? "Refund Pending" : (apt.payment || apt.isCompleted) ? "Completed" : "Pending"
        }));
        res.json({ success: true, transactions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get refund requests
const getRefundRequests = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ cancelled: true });
        const refunds = appointments.map((apt, index) => ({
            id: apt._id,
            refundId: `#RFD-${500 + index}`,
            patientName: apt.userData?.name || "Patient",
            amount: apt.amount || 50,
            date: apt.slotDate || new Date().toISOString().split('T')[0],
            reason: apt.cancelReason || "Patient Cancellation",
            status: apt.refundProcessed ? "Processed" : "Pending"
        }));
        res.json({ success: true, refunds });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to process a refund
const processRefund = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        await appointmentModel.findByIdAndUpdate(appointmentId, { refundProcessed: true });
        res.json({ success: true, message: "Refund Processed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get financial report summary
const getFinancialReport = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        let totalRevenue = 0;
        let completedPayments = 0;
        let cancelledRefunds = 0;

        appointments.forEach(apt => {
            if (apt.payment || apt.isCompleted) {
                totalRevenue += (apt.amount || 50);
                completedPayments++;
            }
            if (apt.cancelled) {
                cancelledRefunds++;
            }
        });

        const report = {
            totalRevenue,
            totalAppointments: appointments.length,
            completedPayments,
            cancelledRefunds,
            generatedAt: new Date().toISOString()
        };

        res.json({ success: true, report });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    loginAccountant,
    getAccountantDashboard,
    getPaymentTransactions,
    getRefundRequests,
    processRefund,
    getFinancialReport
};
