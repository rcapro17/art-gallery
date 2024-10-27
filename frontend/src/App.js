import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { UserProvider } from './context/UserContext';
import MyAppBar from './components/MyAppBar';
import ItemList from './components/ItemList';
import Register from './components/Register';
import Login from './components/Login';
// import Artists from './components/Artists';
import BookingForm from './components/BookingForm'; // Import BookingForm
import { CartProvider } from './context/CartContext';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="main-page">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CartProvider>
            <UserProvider>
              <Router>
                <MyAppBar />
                <Routes>
                  <Route path="/" element={<ItemList />} />
                  <Route path="/itemlist" element={<ItemList />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  {/* <Route path="/artists" element={<Artists />} /> */}
                  <Route path="/booking" element={<BookingForm />} />{' '}
                  {/* BookingForm route */}
                </Routes>
              </Router>
            </UserProvider>
          </CartProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
