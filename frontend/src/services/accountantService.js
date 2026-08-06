import api from './api';

export const accountantLogin = async (email, password) => {
    try {
        const res = await api.post('/accountant/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('accountant_token', res.data.token);
            localStorage.setItem('accountant_user', JSON.stringify(res.data.user));
        }
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Accountant login failed.'
        };
    }
};

export const fetchAccountantDashboard = async () => {
    try {
        const res = await api.get('/accountant/dashboard');
        return res.data;
    } catch (error) {
        return {
            success: false,
            stats: { totalRevenue: '$0', totalPayments: '$0', totalInvoices: 0, totalExpenses: '$0', totalRefunds: '$0', netProfit: '$0' },
            revenueOverview: []
        };
    }
};

export const fetchTransactions = async () => {
    try {
        const res = await api.get('/accountant/transactions');
        return res.data;
    } catch (error) {
        return { success: false, transactions: [] };
    }
};

export const fetchInvoices = async () => {
    try {
        const res = await api.get('/accountant/invoices');
        return res.data;
    } catch (error) {
        return { success: false, invoices: [] };
    }
};

export const createInvoiceApi = async (invoiceData) => {
    try {
        const res = await api.post('/accountant/invoices/add', invoiceData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchExpenses = async () => {
    try {
        const res = await api.get('/accountant/expenses');
        return res.data;
    } catch (error) {
        return { success: false, expenses: [] };
    }
};

export const addExpenseApi = async (expenseData) => {
    try {
        const res = await api.post('/accountant/expenses/add', expenseData);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const deleteExpenseApi = async (id) => {
    try {
        const res = await api.delete(`/accountant/expenses/${id}`);
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchRefunds = async () => {
    try {
        const res = await api.get('/accountant/refunds');
        return res.data;
    } catch (error) {
        return { success: false, refunds: [] };
    }
};

export const processRefundApi = async (id, status) => {
    try {
        const res = await api.put(`/accountant/refunds/${id}`, { status });
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const fetchReports = async () => {
    try {
        const res = await api.get('/accountant/reports');
        return res.data;
    } catch (error) {
        return { success: false };
    }
};

export const updateAccountantProfileApi = async (profileData) => {
    try {
        const res = await api.put('/accountant/profile', profileData);
        if (res.data?.success) {
            localStorage.setItem('accountant_user', JSON.stringify(res.data.user));
        }
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
