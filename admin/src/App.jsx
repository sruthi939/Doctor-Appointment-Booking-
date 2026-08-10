import React, { useContext } from 'react'
import Login from './components/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-[#5F6FFF]';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard.jsx';
import AllAppointments from './pages/admin/AllAppointment.jsx';
import AddDoctors from './pages/admin/AddDoctors.jsx';
import DoctorList from './pages/admin/DoctorsList.jsx'

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (aToken || dToken) ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointment' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctors />} />
          <Route path='/doctor-list' element={<DoctorList />} />
        </Routes>
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