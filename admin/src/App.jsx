import React, { useContext } from 'react'
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
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
import AccountantDashboard from './pages/accountant/AccountantDashboard.jsx';
import ReceptionistDashboard from './pages/receptionist/ReceptionistDashboard.jsx';

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1 p-6'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/all-appointments' element={<AllAppointments />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctor-list' element={<DoctorsList />} />
            <Route path='/accountants-list' element={<AccountantsList />} />
            <Route path='/receptionists-list' element={<ReceptionistsList />} />
            <Route path='/doctor-portal' element={<DoctorDashboard />} />
            <Route path='/accountant-portal' element={<AccountantDashboard />} />
            <Route path='/receptionist-portal' element={<ReceptionistDashboard />} />
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