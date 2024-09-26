// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import the date adapter
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CartProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CartProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
