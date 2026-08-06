import express from 'express';
import { 
    loginAccountant, 
    getAccountantDashboard, 
    getTransactions, 
    getInvoices, 
    createInvoice, 
    getExpenses, 
    addExpense, 
    deleteExpense, 
    getRefunds, 
    processRefund, 
    getReports, 
    updateAccountantProfile 
} from '../controllers/accountant.controller.js';

const router = express.Router();

router.post('/login', loginAccountant);
router.get('/dashboard', getAccountantDashboard);
router.get('/transactions', getTransactions);
router.get('/invoices', getInvoices);
router.post('/invoices/add', createInvoice);
router.get('/expenses', getExpenses);
router.post('/expenses/add', addExpense);
router.delete('/expenses/:id', deleteExpense);
router.get('/refunds', getRefunds);
router.put('/refunds/:id', processRefund);
router.get('/reports', getReports);
router.put('/profile', updateAccountantProfile);

export default router;
