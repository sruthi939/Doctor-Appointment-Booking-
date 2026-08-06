import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages imports
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/Login/ForgotPassword';
import ResetPassword from '../pages/Login/ResetPassword';

import Dashboard from '../pages/Dashboard/Dashboard';

import DoctorsList from '../pages/Doctors/DoctorsList';
import AddDoctor from '../pages/Doctors/AddDoctor';
import EditDoctor from '../pages/Doctors/EditDoctor';
import DoctorProfile from '../pages/Doctors/DoctorProfile';
import DoctorSchedule from '../pages/Doctors/DoctorSchedule';

import PatientList from '../pages/Patients/PatientList';
import PatientDetails from '../pages/Patients/PatientDetails';
import EditPatient from '../pages/Patients/EditPatient';

import AppointmentList from '../pages/Appointments/AppointmentList';
import AppointmentDetails from '../pages/Appointments/AppointmentDetails';
import RescheduleAppointment from '../pages/Appointments/RescheduleAppointment';
import CancelAppointment from '../pages/Appointments/CancelAppointment';

import PaymentList from '../pages/Payments/PaymentList';
import Invoice from '../pages/Payments/Invoice';
import Refund from '../pages/Payments/Refund';
import PaymentHistory from '../pages/Payments/PaymentHistory';

import SpecialityList from '../pages/Specialities/SpecialityList';
import AddSpeciality from '../pages/Specialities/AddSpeciality';
import EditSpeciality from '../pages/Specialities/EditSpeciality';

import Reports from '../pages/Reports/Reports';
import RevenueReport from '../pages/Reports/RevenueReport';
import AppointmentReport from '../pages/Reports/AppointmentReport';
import DoctorReport from '../pages/Reports/DoctorReport';
import PatientReport from '../pages/Reports/PatientReport';

import UserList from '../pages/Users/UserList';
import AddUser from '../pages/Users/AddUser';
import EditUser from '../pages/Users/EditUser';
import UserRoles from '../pages/Users/UserRoles';

import NotificationList from '../pages/Notifications/NotificationList';
import SendNotification from '../pages/Notifications/SendNotification';
import EmailTemplate from '../pages/Notifications/EmailTemplate';

import GeneralSettings from '../pages/Settings/GeneralSettings';
import HospitalProfile from '../pages/Settings/HospitalProfile';
import SecuritySettings from '../pages/Settings/SecuritySettings';
import PaymentSettings from '../pages/Settings/PaymentSettings';
import BackupRestore from '../pages/Settings/BackupRestore';

import ProtectedRoutes from './ProtectedRoutes';

const AdminRoutes = () => {
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoutes />}>
                <Route path='/dashboard' element={<Dashboard />} />

                {/* Doctors */}
                <Route path='/doctors' element={<DoctorsList />} />
                <Route path='/doctors/add' element={<AddDoctor />} />
                <Route path='/doctors/edit/:id' element={<EditDoctor />} />
                <Route path='/doctors/profile/:id' element={<DoctorProfile />} />
                <Route path='/doctors/schedule/:id' element={<DoctorSchedule />} />

                {/* Patients */}
                <Route path='/patients' element={<PatientList />} />
                <Route path='/patients/details/:id' element={<PatientDetails />} />
                <Route path='/patients/edit/:id' element={<EditPatient />} />

                {/* Appointments */}
                <Route path='/appointments' element={<AppointmentList />} />
                <Route path='/appointments/details/:id' element={<AppointmentDetails />} />
                <Route path='/appointments/reschedule/:id' element={<RescheduleAppointment />} />
                <Route path='/appointments/cancel/:id' element={<CancelAppointment />} />

                {/* Payments */}
                <Route path='/payments' element={<PaymentList />} />
                <Route path='/payments/invoice/:id' element={<Invoice />} />
                <Route path='/payments/refund/:id' element={<Refund />} />
                <Route path='/payments/history' element={<PaymentHistory />} />

                {/* Specialities */}
                <Route path='/specialties' element={<SpecialityList />} />
                <Route path='/specialties/add' element={<AddSpeciality />} />
                <Route path='/specialties/edit/:id' element={<EditSpeciality />} />

                {/* Reports */}
                <Route path='/reports' element={<Reports />} />
                <Route path='/reports/revenue' element={<RevenueReport />} />
                <Route path='/reports/appointments' element={<AppointmentReport />} />
                <Route path='/reports/doctors' element={<DoctorReport />} />
                <Route path='/reports/patients' element={<PatientReport />} />

                {/* Users */}
                <Route path='/users' element={<UserList />} />
                <Route path='/users/add' element={<AddUser />} />
                <Route path='/users/edit/:id' element={<EditUser />} />
                <Route path='/users/roles' element={<UserRoles />} />

                {/* Notifications */}
                <Route path='/notifications' element={<NotificationList />} />
                <Route path='/notifications/send' element={<SendNotification />} />
                <Route path='/notifications/templates' element={<EmailTemplate />} />

                {/* Settings */}
                <Route path='/settings' element={<GeneralSettings />} />
                <Route path='/settings/hospital' element={<HospitalProfile />} />
                <Route path='/settings/security' element={<SecuritySettings />} />
                <Route path='/settings/payment' element={<PaymentSettings />} />
                <Route path='/settings/backup' element={<BackupRestore />} />
            </Route>

            <Route path='*' element={<Navigate to='/admin/dashboard' replace />} />
        </Routes>
    );
};

export default AdminRoutes;
