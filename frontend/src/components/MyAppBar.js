import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import PurchaseModal from './PurchaseModal';
import Cart from './Cart';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext'; // Import UserContext
import BookingForm from './BookingForm'; // Import the BookingForm component
import { useNavigate } from 'react-router-dom';
import './MyAppBar.css'; // Import the CSS file

function MyAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false); // State for booking drawer
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(UserContext); // Access user context and logout function
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleBookingDrawer = (open) => () => {
    setBookingDrawerOpen(open);
  };

  const toggleModal = (open) => () => {
    setModalOpen(open);
  };

  const handlePurchase = () => {
    setModalOpen(true); // Open the modal
  };

  const handleConfirmPurchase = () => {
    alert('Purchase confirmed!');
    setModalOpen(false); // Close the modal after confirmation
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleLogout = () => {
    logout(); // Call logout function
    navigate('/itemList'); // Redirect to item list page after logout
  };

  return (
    <AppBar ClasName="my-app-bar">
      <Toolbar className="app-bar">
        <Typography className="typography-title" variant="h3">
          Art Gallery
        </Typography>
        <Button color="inherit" href="/artists">
          Artistas
        </Button>
        <Button color="inherit" href="/itemList">
          Obras
        </Button>

        <Button color="inherit" onClick={toggleBookingDrawer(true)}>
          Visite a Galeria
        </Button>
        {user ? (
          <>
            <Typography color="inherit" className="user-name">
              {user.username} {/* Display user's name */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Cart />
        <Button onClick={handlePurchase} color="primary">
          Purchase
        </Button>
      </Drawer>

      <Drawer
        anchor="right"
        open={bookingDrawerOpen}
        onClose={toggleBookingDrawer(false)}
      >
        <BookingForm /> {/* Place BookingForm here */}
      </Drawer>

      <PurchaseModal
        open={modalOpen}
        onClose={toggleModal(false)}
        onConfirm={handleConfirmPurchase}
      />
    </AppBar>
  );
}

export default MyAppBar;
