// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAppBar from './components/MyAppBar'; // Ensure this import is correct
import ItemList from './components/ItemList';
import Register from './components/Register';
import Login from './components/Login';
import Artists from './components/Artists';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <MyAppBar />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route path="/artists" element={<Artists />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
