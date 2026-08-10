import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// API for Accountant Login
const loginAccountant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const envEmail = process.env.ACCOUNTANT_EMAIL || "accountant@medicare.com";
        const envPass = process.env.ACCOUNTANT_PASSWORD || "accountant123";

        if (email === envEmail && password === envPass) {
            const token = jwt.sign({ id: "ACCOUNTANT_ID" }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid Accountant credentials" });
        }
    } catch (error) {
        console.log(error);
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
            netProfit: Math.round(totalRevenue * 0.20),
            recentTransactions
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all payment transactions list
const getPaymentTransactions = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});

        const transactions = appointments.map((apt, index) => ({
            _id: apt._id,
            transactionId: `#TXN-${1000 + index}`,
            patientName: apt.userData?.name || "Patient",
            doctorName: apt.docData?.name || "Doctor",
            amount: apt.amount || 50,
            date: apt.slotDate || new Date().toISOString().split('T')[0],
            paymentMethod: apt.paymentMethod || "Card",
            status: apt.cancelled ? "Cancelled / Refund" : (apt.payment || apt.isCompleted) ? "Paid" : "Pending"
        }));

        res.json({ success: true, transactions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all refund requests
const getRefundRequests = async (req, res) => {
    try {
        const cancelledAppointments = await appointmentModel.find({ cancelled: true });

        const refunds = cancelledAppointments.map((apt, index) => ({
            _id: apt._id,
            refundId: `#REF-${5000 + index}`,
            patientName: apt.userData?.name || "Patient",
            doctorName: apt.docData?.name || "Doctor",
            amount: apt.amount || 50,
            date: apt.slotDate || new Date().toISOString().split('T')[0],
            reason: "Patient Cancellation",
            status: apt.isRefunded ? "Refunded" : "Pending Approval"
        }));

        res.json({ success: true, refunds });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to process/approve refund
const processRefund = async (req, res) => {
    try {
        const { appointmentId, action } = req.body; // action: 'approve' or 'reject'
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment Not Found" });
        }

        const isRefunded = action === 'approve';
        await appointmentModel.findByIdAndUpdate(appointmentId, { isRefunded });

        res.json({
            success: true,
            message: action === 'approve' ? "Refund Processed & Issued" : "Refund Request Rejected"
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to generate financial summary report
const getFinancialReport = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});

        let totalGrossIncome = 0;
        let totalRefunded = 0;

        appointments.forEach(apt => {
            if (apt.isRefunded) {
                totalRefunded += (apt.amount || 50);
            } else if (apt.payment || apt.isCompleted) {
                totalGrossIncome += (apt.amount || 50);
            }
        });

        const doctorPayouts = Math.round(totalGrossIncome * 0.80);
        const platformCommission = totalGrossIncome - doctorPayouts;
        const netProfit = platformCommission - totalRefunded;

        const report = {
            totalGrossIncome,
            doctorPayouts,
            platformCommission,
            totalRefunded,
            netProfit,
            totalAppointmentsCount: appointments.length
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
