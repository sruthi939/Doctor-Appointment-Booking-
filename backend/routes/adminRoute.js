import express from "express";
import {
    addDoctor,
    loginAdmin,
    appointmentsAdmin,
    appointmentCancelAdmin,
    adminDashboard,
    allDoctors,
    changeAvailability,
    allAccountants,
    addAccountant,
    allReceptionists,
    addReceptionist
} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancelAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.get('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

adminRouter.get('/all-accountants', authAdmin, allAccountants)
adminRouter.post('/all-accountants', authAdmin, allAccountants)
adminRouter.post('/add-accountant', authAdmin, addAccountant)

adminRouter.get('/all-receptionists', authAdmin, allReceptionists)
adminRouter.post('/all-receptionists', authAdmin, allReceptionists)
adminRouter.post('/add-receptionist', authAdmin, addReceptionist)

export default adminRouter;