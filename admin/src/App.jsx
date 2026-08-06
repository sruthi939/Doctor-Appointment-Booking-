import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DoctorProvider } from './context/DoctorContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { PaymentProvider } from './context/PaymentContext';
import { ThemeProvider } from './context/ThemeContext';
import AdminRoutes from './routes/AdminRoutes';
import './styles/globals.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <PaymentProvider>
              <BrowserRouter>
                <AdminRoutes />
              </BrowserRouter>
            </PaymentProvider>
          </AppointmentProvider>
        </DoctorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
