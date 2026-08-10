import express from 'express';
import {
    loginAccountant,
    getAccountantDashboard,
    getPaymentTransactions,
    getInvoices,
    getRefundRequests,
    processRefund,
    getFinancialReport
} from '../controllers/accountantController.js';
import authAccountant from '../middleware/authAccountant.js';

const accountantRouter = express.Router();

accountantRouter.post('/login', loginAccountant);
accountantRouter.get('/dashboard', authAccountant, getAccountantDashboard);
accountantRouter.get('/transactions', authAccountant, getPaymentTransactions);
accountantRouter.get('/invoices', authAccountant, getInvoices);
accountantRouter.get('/refunds', authAccountant, getRefundRequests);
accountantRouter.post('/process-refund', authAccountant, processRefund);
accountantRouter.get('/report', authAccountant, getFinancialReport);

export default accountantRouter;
