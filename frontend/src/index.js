import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for createRoot
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import the date adapter
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

// Ensure the element with id 'root' exists in your index.html
const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
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
  </React.StrictMode>
);
