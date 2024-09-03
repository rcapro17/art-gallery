import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import the CSS file

function Cart({ onPurchase, userName }) {
  const { cartItems, addToCart, removeFromCart, totalAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleAddMoreItems = () => {
    navigate('/itemList');
  };

  return (
    <div className="drawer-wrapper">
      <h2>{userName}'s Cart</h2>
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
        <h3>Total: ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</h3>
        <Button
          color="success"
          variant="contained"
          onClick={onPurchase}
          sx={{ marginBottom: '10px' }}
        >
          Go to checkout
        </Button>
        <Button variant="contained" onClick={handleAddMoreItems}>
          Add More Items
        </Button>
      </div>
    </div>
  );
}

export default Cart;
