import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Payment from '../models/Payment.js';
import Transaction from '../models/Transaction.js';
import Specialty from '../models/Specialty.js';
import Coupon from '../models/Coupon.js';
import Setting from '../models/Setting.js';

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'USER' });
        const totalDoctors = await Doctor.countDocuments({});
        const totalAppointments = await Appointment.countDocuments({});
        const paidAppointments = await Appointment.find({ paymentStatus: 'Paid' });
        const pendingAppointments = await Appointment.countDocuments({ paymentStatus: 'Pending' });

        const totalRevenue = paidAppointments.reduce((sum, a) => sum + (a.amount || 50), 0);
        const pendingPaymentsAmount = pendingAppointments * 50;

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalDoctors,
                totalAppointments,
                totalRevenue: `$${totalRevenue.toLocaleString()}.00`,
                todayAppointments: Math.min(totalAppointments, 28),
                pendingPayments: `$${pendingPaymentsAmount.toLocaleString()}.00`
            },
            overviewGraph: [
                { day: 'May 10', value: Math.round(totalAppointments * 0.15) },
                { day: 'May 11', value: Math.round(totalAppointments * 0.25) },
                { day: 'May 12', value: Math.round(totalAppointments * 0.20) },
                { day: 'May 13', value: Math.round(totalAppointments * 0.35) },
                { day: 'May 14', value: Math.round(totalAppointments * 0.18) },
                { day: 'May 15', value: Math.round(totalAppointments * 0.40) },
                { day: 'May 16', value: Math.round(totalAppointments * 0.22) }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All System Users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add User (Admin)
// @route   POST /api/admin/users/add
// @access  Private/Admin
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
        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Specialties
// @route   GET /api/admin/specialties
// @access  Public
export const getSpecialties = async (req, res) => {
    try {
        let list = await Specialty.find({});
        if (!list || list.length === 0) {
            list = await Specialty.insertMany([
                { name: 'General physician', description: 'Primary care & general wellness' },
                { name: 'Gynecologist', description: 'Women health and maternal care' },
                { name: 'Dermatologist', description: 'Skin, hair and cosmetic therapies' },
                { name: 'Pediatricians', description: 'Child healthcare and immunizations' },
                { name: 'Neurologist', description: 'Brain & nerve disorder treatments' }
            ]);
        }
        res.json({ success: true, specialties: list });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add Specialty
// @route   POST /api/admin/specialties/add
// @access  Private/Admin
export const addSpecialty = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const specialty = await Specialty.create({ name, description, image });
        res.status(201).json({ success: true, message: 'Specialty added successfully', specialty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Coupons
// @route   GET /api/admin/coupons
// @access  Private/Admin
export const getCoupons = async (req, res) => {
    try {
        let coupons = await Coupon.find({}).sort({ createdAt: -1 });
        if (!coupons || coupons.length === 0) {
            coupons = await Coupon.insertMany([
                { code: 'HEALTH20', discountPercent: 20, expiryDate: '2026-12-31', status: 'Active' },
                { code: 'WELCOME10', discountPercent: 10, expiryDate: '2026-12-31', status: 'Active' },
                { code: 'CARE15', discountPercent: 15, expiryDate: '2026-10-15', status: 'Active' }
            ]);
        }
        res.json({ success: true, coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add Coupon
// @route   POST /api/admin/coupons/add
// @access  Private/Admin
export const addCoupon = async (req, res) => {
    try {
        const { code, discountPercent, expiryDate } = req.body;
        const coupon = await Coupon.create({ code, discountPercent, expiryDate });
        res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get System Settings
// @route   GET /api/admin/settings
// @access  Private/Admin
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

// @desc    Update System Settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
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

// @desc    Get Master Payments List
// @route   GET /api/admin/payments
// @access  Private/Admin
export const getAdminPayments = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 });
        const payments = appointments.map((apt, idx) => ({
            transactionId: `#PAY00${idx + 1}`,
            patient: apt.patientDetails?.fullName || 'Patient',
            amount: apt.amount || 50,
            method: apt.paymentMethod || 'Card',
            status: apt.paymentStatus || 'Paid',
            date: apt.slotDate
        }));
        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Reports Distribution
// @route   GET /api/admin/reports
// @access  Private/Admin
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
                { week: 'Week 1', revenue: 4000, expenses: 1200 },
                { week: 'Week 2', revenue: 6500, expenses: 1800 },
                { week: 'Week 3', revenue: 5200, expenses: 1500 },
                { week: 'Week 4', revenue: 7800, expenses: 2100 }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
