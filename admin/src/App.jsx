import React, { useContext } from 'react'
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard.jsx';
import AllAppointments from './pages/admin/AllAppointments.jsx';
import AddDoctor from './pages/admin/AddDoctor.jsx';
import DoctorsList from './pages/admin/DoctorsList.jsx';
import AccountantsList from './pages/admin/AccountantsList.jsx';
import ReceptionistsList from './pages/admin/ReceptionistsList.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/doctor/DoctorProfile.jsx';
import AccountantDashboard from './pages/accountant/AccountantDashboard.jsx';
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard.jsx';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const accountantToken = localStorage.getItem('accountantToken');
  const receptionistToken = localStorage.getItem('receptionistToken');

  const isAuthenticated = aToken || dToken || accountantToken || receptionistToken;

  return isAuthenticated ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1 p-6'>
          <Routes>
            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />
                <Route path='/accountants-list' element={<AccountantsList />} />
                <Route path='/receptionists-list' element={<ReceptionistsList />} />
              </>
            )}

            {/* Doctor Routes */}
            {dToken && (
              <>
                <Route path='/' element={<DoctorDashboard />} />
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />
              </>
            )}

            {/* Accountant Routes */}
            {accountantToken && (
              <>
                <Route path='/' element={<AccountantDashboard />} />
                <Route path='/accountant-dashboard' element={<AccountantDashboard />} />
              </>
            )}

            {/* Receptionist Routes */}
            {receptionistToken && (
              <>
                <Route path='/' element={<ReceptionistDashboard />} />
                <Route path='/receptionist-dashboard' element={<ReceptionistDashboard />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App