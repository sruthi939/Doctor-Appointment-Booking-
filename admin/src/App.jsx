import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import DoctorsList from './pages/doctors/DoctorsList';
import AddDoctor from './pages/doctors/AddDoctor';
import Appointments from './pages/appointments/Appointments';
import UsersList from './pages/users/UsersList';
import Payments from './pages/payments/Payments';
import Specialties from './pages/specialties/Specialties';
import Coupons from './pages/coupons/Coupons';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/admin/dashboard' replace />} />
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/doctors' element={<DoctorsList />} />
          <Route path='/admin/doctors/add' element={<AddDoctor />} />
          <Route path='/admin/add-doctor' element={<AddDoctor />} />
          <Route path='/admin/appointments' element={<Appointments />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/payments' element={<Payments />} />
          <Route path='/admin/specialties' element={<Specialties />} />
          <Route path='/admin/coupons' element={<Coupons />} />
          <Route path='/admin/reports' element={<Reports />} />
          <Route path='/admin/settings' element={<Settings />} />

          {/* Alias Fallbacks */}
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/doctors' element={<DoctorsList />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/payments' element={<Payments />} />
          <Route path='/specialties' element={<Specialties />} />
          <Route path='/coupons' element={<Coupons />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='/admin/dashboard' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
