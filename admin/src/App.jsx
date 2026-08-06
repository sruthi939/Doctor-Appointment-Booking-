import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddDoctor from './pages/AddDoctor';
import DoctorsList from './pages/DoctorsList';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/admin/dashboard' replace />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/add-doctor' element={<AddDoctor />} />
        <Route path='/admin/doctors' element={<DoctorsList />} />
        <Route path='/admin/appointments' element={<Appointments />} />
        <Route path='/admin/patients' element={<Patients />} />

        {/* Fallbacks */}
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-doctor' element={<AddDoctor />} />
        <Route path='/doctors' element={<DoctorsList />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='*' element={<Navigate to='/admin/dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
