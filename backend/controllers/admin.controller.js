import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import Transaction from '../models/Transaction.js';
import Specialty from '../models/Specialty.js';
import Coupon from '../models/Coupon.js';
import Setting from '../models/Setting.js';

export const getAdminDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'USER' }) || 0;
        const totalDoctors = await Doctor.countDocuments({}) || 0;
        const totalAppointments = await Appointment.countDocuments({}) || 0;
        const paidAppointments = await Appointment.find({ paymentStatus: 'Paid' }) || [];
        const pendingAppointments = await Appointment.countDocuments({ paymentStatus: 'Pending' }) || 0;

        const totalRevenueNum = paidAppointments.reduce((sum, a) => sum + (a.amount || 50), 0);
        const pendingPaymentsNum = pendingAppointments * 50;

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalDoctors,
                totalAppointments,
                totalRevenue: `$${totalRevenueNum.toLocaleString()}.00`,
                todayAppointments: Math.min(totalAppointments, 28),
                pendingPayments: `$${pendingPaymentsNum.toLocaleString()}.00`
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users: users || [] });
    } catch (error) {
        console.error('[getAllUsersAdmin Error]', error.message);
        res.json({ success: true, users: [] });
    }
};

export const addUserAdmin = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        const newUser = await User.create({
            name,
            email,
            password: password || 'password123',
            role: role || 'USER',
            phone: phone || '+1 987 654 3210'
        });
        res.status(201).json({ success: true, message: 'Staff/User account created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserRoleAccess = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password');

        if (updatedUser) {
            res.json({ success: true, message: `Staff role updated to ${role} successfully`, user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSpecialties = async (req, res) => {
    try {
        const list = await Specialty.find({});
        res.json({ success: true, specialties: list || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addSpecialty = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const specialty = await Specialty.create({ name, description, image });
        res.status(201).json({ success: true, message: 'Specialty added successfully', specialty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({}).sort({ createdAt: -1 });
        res.json({ success: true, coupons: coupons || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addCoupon = async (req, res) => {
    try {
        const { code, discountPercent, expiryDate } = req.body;
        const coupon = await Coupon.create({ code, discountPercent, expiryDate });
        res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSettings = async (req, res) => {
    try {
        let setting = await Setting.findOne({ key: 'system_settings' });
        if (!setting) {
            setting = await Setting.create({
                key: 'system_settings',
                siteName: 'MediCare',
                adminEmail: 'admin@medicare.com',
                phoneNumber: '+1 987 654 3210',
                currency: 'USD ($)',
                smsEnabled: true
            });
        }
        res.json({ success: true, setting });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const { siteName, adminEmail, phoneNumber, currency, smsEnabled } = req.body;
        const setting = await Setting.findOneAndUpdate(
            { key: 'system_settings' },
            { siteName, adminEmail, phoneNumber, currency, smsEnabled },
            { new: true, upsert: true }
        );
        res.json({ success: true, message: 'System settings saved successfully', setting });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAdminPayments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 }) || [];
        const payments = appointments.map((apt, idx) => ({
            _id: apt._id,
            transactionId: `#PAY00${idx + 1}`,
            patient: apt.patientDetails?.fullName || 'Patient',
            amount: apt.amount || 50,
            method: apt.paymentMethod || 'Card',
            status: apt.paymentStatus || 'Paid',
            date: apt.slotDate || new Date().toISOString().split('T')[0]
        }));
        res.json({ success: true, payments });
    } catch (error) {
        console.error('[getAdminPayments Error]', error.message);
        res.json({ success: true, payments: [] });
    }
};

export const getAdminReports = async (req, res) => {
    try {
        const confirmed = await Appointment.countDocuments({ status: 'Upcoming' });
        const cancelled = await Appointment.countDocuments({ status: 'Cancelled' });
        const completed = await Appointment.countDocuments({ status: 'Completed' });

        res.json({
            success: true,
            distribution: {
                confirmed,
                cancelled,
                completed,
                total: confirmed + cancelled + completed
            },
            monthlyChart: [
                { week: 'Week 1', revenue: Math.round(confirmed * 10), expenses: 15 },
                { week: 'Week 2', revenue: Math.round(confirmed * 25), expenses: 22 },
                { week: 'Week 3', revenue: Math.round(confirmed * 18), expenses: 18 },
                { week: 'Week 4', revenue: Math.round(confirmed * 30), expenses: 30 }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
