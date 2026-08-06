import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';
import Refund from '../models/Refund.js';
import Appointment from '../models/Appointment.js';
import generateToken from '../utils/generateToken.js';

export const loginAccountant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reqEmail = email || 'accountant@medicare.com';

        let accountant = await User.findOne({ email: reqEmail, role: 'ACCOUNTANT' });

        if (!accountant) {
            accountant = await User.create({
                name: 'Accountant User',
                email: reqEmail,
                password: password || 'password123',
                role: 'ACCOUNTANT',
                phone: '+1 987 654 3210',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
            });
        }

        res.json({
            success: true,
            user: {
                _id: accountant._id,
                name: accountant.name,
                email: accountant.email,
                phone: accountant.phone,
                role: accountant.role,
                image: accountant.image,
                address: accountant.address
            },
            token: generateToken(accountant._id)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAccountantDashboard = async (req, res) => {
    try {
        const completedTransactions = await Transaction.find({ status: 'Completed' });
        const paidAppointments = await Appointment.find({ paymentStatus: 'Paid' });
        const expenses = await Expense.find({});
        const invoicesCount = await Invoice.countDocuments({});
        const processedRefunds = await Refund.find({ status: 'Processed' });

        // Sum transaction revenue + paid appointments revenue
        const txRevenue = completedTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const aptRevenue = paidAppointments.reduce((sum, apt) => sum + (apt.amount || 0), 0);
        const totalRevenueNum = txRevenue + aptRevenue;

        const totalExpensesNum = expenses.reduce((sum, ex) => sum + (ex.amount || 0), 0);
        const totalRefundsNum = processedRefunds.reduce((sum, rf) => sum + (rf.amount || 0), 0);
        const netProfitNum = totalRevenueNum - totalExpensesNum - totalRefundsNum;

        res.json({
            success: true,
            stats: {
                totalRevenue: `$${totalRevenueNum.toLocaleString()}.00`,
                totalPayments: `$${txRevenue.toLocaleString()}.00`,
                totalInvoices: invoicesCount,
                totalExpenses: `$${totalExpensesNum.toLocaleString()}.00`,
                totalRefunds: `$${totalRefundsNum.toLocaleString()}.00`,
                netProfit: `$${netProfitNum.toLocaleString()}.00`
            },
            revenueOverview: [
                { day: 'May 1', value: Math.round(totalRevenueNum * 0.15) },
                { day: 'May 8', value: Math.round(totalRevenueNum * 0.25) },
                { day: 'May 15', value: Math.round(totalRevenueNum * 0.20) },
                { day: 'May 22', value: Math.round(totalRevenueNum * 0.30) },
                { day: 'May 29', value: Math.round(totalRevenueNum * 0.10) }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).sort({ createdAt: -1 });
        res.json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        res.json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createInvoice = async (req, res) => {
    try {
        const { patientName, patientEmail, amount, status, items } = req.body;
        const count = await Invoice.countDocuments({});
        const newInvoice = await Invoice.create({
            invoiceId: `INV-${1001 + count}`,
            patientName,
            patientEmail: patientEmail || '',
            amount: Number(amount) || 0,
            status: status || 'Paid',
            date: new Date().toISOString().split('T')[0],
            items: items || [{ description: 'Medical Service', cost: Number(amount) || 0 }]
        });
        res.status(201).json({ success: true, message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({}).sort({ createdAt: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addExpense = async (req, res) => {
    try {
        const { category, amount, description } = req.body;
        const newExpense = await Expense.create({
            category,
            amount: Number(amount),
            description: description || '',
            date: new Date().toISOString().split('T')[0]
        });
        res.status(201).json({ success: true, message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRefunds = async (req, res) => {
    try {
        const refunds = await Refund.find({}).sort({ createdAt: -1 });
        res.json({ success: true, refunds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const processRefund = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Refund.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({ success: true, message: `Refund marked as ${status}`, refund: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReports = async (req, res) => {
    try {
        const completedTransactions = await Transaction.find({ status: 'Completed' });
        const paidAppointments = await Appointment.find({ paymentStatus: 'Paid' });
        const expenses = await Expense.find({});
        const processedRefunds = await Refund.find({ status: 'Processed' });

        const txRevenue = completedTransactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const aptRevenue = paidAppointments.reduce((sum, apt) => sum + (apt.amount || 0), 0);
        const totalRevenue = txRevenue + aptRevenue;

        const totalExpenses = expenses.reduce((sum, ex) => sum + (ex.amount || 0), 0);
        const totalRefunds = processedRefunds.reduce((sum, rf) => sum + (rf.amount || 0), 0);
        const netProfit = totalRevenue - totalExpenses - totalRefunds;

        res.json({
            success: true,
            summary: {
                totalRevenue: `$${totalRevenue.toLocaleString()}.00`,
                totalExpenses: `$${totalExpenses.toLocaleString()}.00`,
                netProfit: `$${netProfit.toLocaleString()}.00`
            },
            monthlyComparison: [
                {
                    week: 'Week 1',
                    revenue: Math.round(totalRevenue * 0.2),
                    expenses: Math.round(totalExpenses * 0.2)
                },
                {
                    week: 'Week 2',
                    revenue: Math.round(totalRevenue * 0.3),
                    expenses: Math.round(totalExpenses * 0.3)
                },
                {
                    week: 'Week 3',
                    revenue: Math.round(totalRevenue * 0.25),
                    expenses: Math.round(totalExpenses * 0.25)
                },
                {
                    week: 'Week 4',
                    revenue: Math.round(totalRevenue * 0.25),
                    expenses: Math.round(totalExpenses * 0.25)
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateAccountantProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const accountant = await User.findOneAndUpdate(
            { role: 'ACCOUNTANT' },
            { name, email, phone },
            { new: true }
        );
        res.json({ success: true, message: 'Accountant profile updated', user: accountant });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
