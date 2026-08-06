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
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor');

  if (isDoctorRoute) {
    return <DoctorRoutes />;
  }

  return (
    <div className='min-h-screen bg-[#0b0f19] text-slate-100 px-4 sm:px-[10%] pb-12 font-sans'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;