// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Button from '@mui/material/Button';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart({ toggleDrawer }) {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleContinueShopping = () => {
    toggleDrawer(false); // Close the cart drawer
    setTimeout(() => {
      navigate('/itemList'); // Redirect to ItemList after the drawer closes
    }, 300); // Add a small delay to ensure the drawer closes first
  };

  const handleGoToCheckout = () => {
    // You can add navigation to the checkout page here
    alert('Going to Checkout...');
  };

  return (
    <div className="drawer-wrapper">
      <h2 className="cart-title-top">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="item-image" />
            <div className="item-details">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-price">Price: ${item.price}</p>
              <div className="quantity-controls">
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => removeFromCart(item.id)}
                  sx={{ minWidth: '32px' }}
                >
                  -
                </Button>
                <p style={{ margin: '0 10px' }}>{item.quantity}</p>
                <Button
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => addToCart(item)}
                  sx={{ minWidth: '32px' }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="cart-footer">
        <div className="footer-buttons">
          <Button
            variant="outlined"
            onClick={handleContinueShopping}
            sx={{ marginRight: '10px' }}
          >
            Continue Shopping
          </Button>
          <Button color="warning" variant="outlined" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleGoToCheckout}
          sx={{ marginTop: '10px' }}
        >
          Go to Checkout
        </Button>
        <h3 className="total-amount">Total: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
