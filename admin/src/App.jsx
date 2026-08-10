import React, { useContext } from 'react'
import Login from './pages/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-[#5F6FFF]';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (aToken || dToken) ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className='flex-1 p-6'>
          {/* Main Panel Content */}
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