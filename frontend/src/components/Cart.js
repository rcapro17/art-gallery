import React, { useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Implement cart functionality

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
