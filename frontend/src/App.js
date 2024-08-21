import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar'; // Ensure this import is correct
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Register from './components/Register';
import Login from './components/Login';

function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Art Gallery
        </Typography>
        <Button color="inherit" href="/register">
          Register
        </Button>
        <Button color="inherit" href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <MyAppBar />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
