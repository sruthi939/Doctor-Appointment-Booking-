import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import DoctorRoutes from './routes/DoctorRoutes';
import ReceptionistRoutes from './routes/ReceptionistRoutes';
import AccountantRoutes from './routes/AccountantRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedUserRoute } from './components/RoleProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor/') || location.pathname === '/doctor';
  const isReceptionistRoute = location.pathname.startsWith('/receptionist/') || location.pathname === '/receptionist';
  const isAccountantRoute = location.pathname.startsWith('/accountant/') || location.pathname === '/accountant';
  const isLoginRoute = location.pathname === '/login';
  const isAppointmentRoute = location.pathname.startsWith('/appointment/') || location.pathname === '/my-appointments';
  const hideHeaderFooter = isLoginRoute || isAppointmentRoute;

  if (isDoctorRoute) {
    return <DoctorRoutes />;
  }

  if (isReceptionistRoute) {
    return <ReceptionistRoutes />;
  }

  if (isAccountantRoute) {
    return <AccountantRoutes />;
  }

  return (
    <div className='min-h-screen bg-[#F8F9FD] text-slate-800 px-4 sm:px-[10%] pb-12 font-sans'>
      <ToastContainer />
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        {/* Protected Patient Routes */}
        <Route element={<ProtectedUserRoute />}>
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
        </Route>

        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;