import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Cart from './Cart'; // Import Cart
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './MyAppBar.css'; // Ensure this is included to keep styles

function MyAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout();
    navigate('/itemList');
  };

  return (
    <AppBar className="my-app-bar">
      {' '}
      {/* Keep your CSS class */}
      <Toolbar className="app-bar">
        {' '}
        {/* Ensure this class is applied */}
        <Typography className="typography-title" variant="h3">
          {' '}
          {/* Preserve the title style */}
          Art Gallery
        </Typography>
        <Button color="inherit" href="/itemList">
          Obras
        </Button>
        {user ? (
          <>
            <Typography color="inherit" className="user-name">
              {' '}
              {/* Ensure user name style */}
              {user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
        <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
      {/* Drawer for Cart */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Cart toggleDrawer={toggleDrawer} />{' '}
        {/* Ensure drawer functionality remains */}
      </Drawer>
    </AppBar>
  );
}

export default MyAppBar;
