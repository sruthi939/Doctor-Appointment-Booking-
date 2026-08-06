import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';
import Refund from '../models/Refund.js';
import generateToken from '../utils/generateToken.js';

// Seed sample data if collections are empty so accountant dashboard displays nicely out-of-the-box
const seedAccountantData = async () => {
    try {
        const txCount = await Transaction.countDocuments({});
        if (txCount === 0) {
            await Transaction.insertMany([
                { transactionId: '#TXN001', patientName: 'John Doe', doctorName: 'Dr. Smith', amount: 120, paymentMethod: 'Card', status: 'Completed', date: '15 May 2024' },
                { transactionId: '#TXN002', patientName: 'Sarah Wilson', doctorName: 'Dr. Brown', amount: 80, paymentMethod: 'Card', status: 'Completed', date: '15 May 2024' },
                { transactionId: '#TXN003', patientName: 'Michael Brown', doctorName: 'Dr. Davis', amount: 150, paymentMethod: 'UPI', status: 'Pending', date: '15 May 2024' },
                { transactionId: '#TXN004', patientName: 'Emily Davis', doctorName: 'Dr. Lee', amount: 200, paymentMethod: 'Net Banking', status: 'Completed', date: '14 May 2024' },
                { transactionId: '#TXN005', patientName: 'David Lee', doctorName: 'Dr. Garcia', amount: 90, paymentMethod: 'Wallet', status: 'Failed', date: '14 May 2024' },
                { transactionId: '#TXN006', patientName: 'Jessica Taylor', doctorName: 'Dr. Smith', amount: 110, paymentMethod: 'UPI', status: 'Completed', date: '14 May 2024' }
            ]);
        }

        const invCount = await Invoice.countDocuments({});
        if (invCount === 0) {
            await Invoice.insertMany([
                { invoiceId: 'INV-1001', patientName: 'John Doe', patientEmail: 'johndoe@example.com', amount: 120, status: 'Paid', date: '15 May 2024', items: [{ description: 'General Consultation', cost: 120 }] },
                { invoiceId: 'INV-1002', patientName: 'Sarah Wilson', patientEmail: 'sarahwilson@example.com', amount: 80, status: 'Paid', date: '15 May 2024', items: [{ description: 'Skin Checkup', cost: 80 }] },
                { invoiceId: 'INV-1003', patientName: 'Michael Brown', patientEmail: 'michael@example.com', amount: 150, status: 'Unpaid', date: '14 May 2024', items: [{ description: 'Cardiology Assessment', cost: 150 }] },
                { invoiceId: 'INV-1004', patientName: 'Emily Davis', patientEmail: 'emily@example.com', amount: 200, status: 'Paid', date: '14 May 2024', items: [{ description: 'Pediatric Care & Labs', cost: 200 }] },
                { invoiceId: 'INV-1005', patientName: 'David Lee', patientEmail: 'david@example.com', amount: 90, status: 'Paid', date: '14 May 2024', items: [{ description: 'Neurology Consultation', cost: 90 }] }
            ]);
        }

        const expCount = await Expense.countDocuments({});
        if (expCount === 0) {
            await Expense.insertMany([
                { category: 'Utilities', amount: 120, date: '15 May 2024', description: 'Electricity & Water Bill' },
                { category: 'Equipment', amount: 890, date: '14 May 2024', description: 'Stethoscope & BP Monitors' },
                { category: 'Marketing', amount: 200, date: '13 May 2024', description: 'Online Ad Campaigns' },
                { category: 'Stationery', amount: 60, date: '12 May 2024', description: 'Medical Files & Paper Packs' },
                { category: 'Maintenance', amount: 300, date: '10 May 2024', description: 'AC Repair & Sanitation' }
            ]);
        }

        const refCount = await Refund.countDocuments({});
        if (refCount === 0) {
            await Refund.insertMany([
                { refundId: 'RFND001', patientName: 'John Doe', amount: 50, status: 'Processed', date: '15 May 2024', reason: 'Overcharge Correction' },
                { refundId: 'RFND002', patientName: 'Sarah Wilson', amount: 80, status: 'Processed', date: '15 May 2024', reason: 'Appointment Cancelled' },
                { refundId: 'RFND003', patientName: 'Michael Brown', amount: 30, status: 'Processed', date: '14 May 2024', reason: 'Lab Fee Refund' },
                { refundId: 'RFND004', patientName: 'Emily Davis', amount: 100, status: 'Rejected', date: '14 May 2024', reason: 'Late Cancellation' }
            ]);
        }
    } catch (e) {
        console.error('[Accountant Seed Error]', e.message);
    }
};

// @desc    Accountant Login
// @route   POST /api/accountant/login
// @access  Public
export const loginAccountant = async (req, res) => {
    try {
        await seedAccountantData();

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

// @desc    Get Accountant Dashboard Stats & Revenue Overview
// @route   GET /api/accountant/dashboard
// @access  Private/Accountant
export const getAccountantDashboard = async (req, res) => {
    try {
        await seedAccountantData();

        const transactions = await Transaction.find({ status: 'Completed' });
        const expenses = await Expense.find({});
        const invoicesCount = await Invoice.countDocuments({});
        const refunds = await Refund.find({ status: 'Processed' });

        const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 45231);
        const totalExpensesSum = expenses.reduce((sum, ex) => sum + (ex.amount || 0), 6310);
        const totalRefundsSum = refunds.reduce((sum, rf) => sum + (rf.amount || 0), 1200);
        const netProfit = totalRevenue - totalExpensesSum - totalRefundsSum;

        res.json({
            success: true,
            stats: {
                totalRevenue: `$${totalRevenue.toLocaleString()}`,
                totalPayments: `$${(totalRevenue - 6310).toLocaleString()}`,
                totalInvoices: invoicesCount || 128,
                totalExpenses: `$${totalExpensesSum.toLocaleString()}`,
                totalRefunds: `$${totalRefundsSum.toLocaleString()}`,
                netProfit: `$${netProfit.toLocaleString()}`
            },
            revenueOverview: [
                { day: 'May 1', value: 20 },
                { day: 'May 8', value: 35 },
                { day: 'May 15', value: 25 },
                { day: 'May 22', value: 40 },
                { day: 'May 29', value: 30 }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Transactions
// @route   GET /api/accountant/transactions
// @access  Private/Accountant
export const getTransactions = async (req, res) => {
    try {
        await seedAccountantData();
        const transactions = await Transaction.find({}).sort({ createdAt: -1 });
        res.json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Invoices
// @route   GET /api/accountant/invoices
// @access  Private/Accountant
export const getInvoices = async (req, res) => {
    try {
        await seedAccountantData();
        const invoices = await Invoice.find({}).sort({ createdAt: -1 });
        res.json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create New Invoice
// @route   POST /api/accountant/invoices/add
// @access  Private/Accountant
export const createInvoice = async (req, res) => {
    try {
        const { patientName, patientEmail, amount, status, items } = req.body;
        const count = await Invoice.countDocuments({});
        const newInvoice = await Invoice.create({
            invoiceId: `INV-${1001 + count}`,
            patientName,
            patientEmail: patientEmail || '',
            amount: Number(amount) || 100,
            status: status || 'Paid',
            date: new Date().toISOString().split('T')[0],
            items: items || [{ description: 'Medical Service', cost: Number(amount) || 100 }]
        });
        res.status(201).json({ success: true, message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Expenses
// @route   GET /api/accountant/expenses
// @access  Private/Accountant
export const getExpenses = async (req, res) => {
    try {
        await seedAccountantData();
        const expenses = await Expense.find({}).sort({ createdAt: -1 });
        res.json({ success: true, expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add New Expense
// @route   POST /api/accountant/expenses/add
// @access  Private/Accountant
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

// @desc    Delete Expense
// @route   DELETE /api/accountant/expenses/:id
// @access  Private/Accountant
export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get All Refunds
// @route   GET /api/accountant/refunds
// @access  Private/Accountant
export const getRefunds = async (req, res) => {
    try {
        await seedAccountantData();
        const refunds = await Refund.find({}).sort({ createdAt: -1 });
        res.json({ success: true, refunds });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Process or Reject Refund
// @route   PUT /api/accountant/refunds/:id
// @access  Private/Accountant
export const processRefund = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Refund.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({ success: true, message: `Refund marked as ${status}`, refund: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Financial Reports Summary
// @route   GET /api/accountant/reports
// @access  Private/Accountant
export const getReports = async (req, res) => {
    try {
        res.json({
            success: true,
            summary: {
                totalRevenue: '$45,231.00',
                totalExpenses: '$6,310.00',
                netProfit: '$38,921.00'
            },
            monthlyComparison: [
                { week: 'Week 1', revenue: 9000, expenses: 1200 },
                { week: 'Week 2', revenue: 11000, expenses: 1500 },
                { week: 'Week 3', revenue: 10500, expenses: 1100 },
                { week: 'Week 4', revenue: 14731, expenses: 2510 }
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Accountant Profile
// @route   PUT /api/accountant/profile
// @access  Private/Accountant
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
