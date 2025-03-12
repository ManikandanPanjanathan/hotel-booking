import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Register from './components/Register';
import Login from './components/Login';
import HotelList from './components/HotelList';
import BookingForm from './components/BookingForm';
import WebCheckIn from './components/WebCheckIn';
import Navbar from './components/Navbar';

const theme = createTheme();
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hotels" element={user ? <HotelList /> : <Navigate to="/" />} />
              <Route path="/book/:hotelId" element={user ? <BookingForm /> : <Navigate to="/" />} />
              <Route path="/checkin/:bookingId" element={user ? <WebCheckIn /> : <Navigate to="/" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;