import express from "express";
import { addDoctor, loginAdmin, appointmentsAdmin, appointmentCancelAdmin, adminDashboard, allDoctors, changeAvailability } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancelAdmin)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

export default adminRouter;