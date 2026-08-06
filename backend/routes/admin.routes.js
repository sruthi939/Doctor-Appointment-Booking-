import express from 'express';
import {
    getAdminDashboardStats,
    getAllUsersAdmin,
    addUserAdmin,
    getSpecialties,
    addSpecialty,
    getCoupons,
    addCoupon,
    getSettings,
    updateSettings,
    getAdminPayments,
    getAdminReports
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/dashboard', getAdminDashboardStats);
router.get('/users', getAllUsersAdmin);
router.post('/users/add', addUserAdmin);

router.get('/specialties', getSpecialties);
router.post('/specialties/add', addSpecialty);

router.get('/coupons', getCoupons);
router.post('/coupons/add', addCoupon);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

router.get('/payments', getAdminPayments);
router.get('/reports', getAdminReports);

export default router;
