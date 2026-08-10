import api from './api';

export const accountantLogin = async (email, password) => {
    try {
        const res = await api.post('/accountant/login', { email, password });
        if (res.data?.success) {
            localStorage.setItem('accountant_token', res.data.token);
            localStorage.setItem('accountantToken', res.data.token);
            const userInfo = {
                name: res.data.name || res.data.user?.name || email.split('@')[0],
                email: res.data.email || res.data.user?.email || email
            };
            localStorage.setItem('accountant_user', JSON.stringify(userInfo));
            localStorage.setItem('accountant_name', userInfo.name);
            localStorage.setItem('accountant_email', userInfo.email);
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

export const fetchRefunds = async () => {
    try {
        const res = await api.get('/accountant/refunds');
        return res.data;
    } catch (error) {
        return { success: false, refunds: [] };
    }
};

export const fetchFinancialReportApi = async () => {
    try {
        const res = await api.get('/accountant/report');
        return res.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};
