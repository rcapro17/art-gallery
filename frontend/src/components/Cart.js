import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const DrawerWrapper = styled.div`
  width: 400px;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f5f5; /* Light background for better contrast */
  height: 100%; /* Full height of the drawer */
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff; /* White background for each item */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
  color: #555;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const CartFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function Cart({ onPurchase, userName }) {
  const { cartItems, addToCart, removeFromCart, totalAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleAddMoreItems = () => {
    navigate('/itemList');
  };

  return (
    <DrawerWrapper>
      <h2>{userName}'s Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id}>
            <ItemImage src={item.image} alt={item.title} />
            <ItemDetails>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>Price: ${item.price}</ItemPrice>
              <QuantityControls>
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
              </QuantityControls>
            </ItemDetails>
          </CartItem>
        ))
      )}
      <CartFooter>
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
      </CartFooter>
    </DrawerWrapper>
  );
}

export default Cart;
