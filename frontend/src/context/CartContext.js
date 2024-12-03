// // CartContext.js
// import { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (cartItem) => cartItem.id === item.id
//       );

//       if (existingItem) {
//         // If the item is already in the cart, check if its quantity is less than the stock
//         if (existingItem.quantity < item.stock) {
//           return prevItems.map((cartItem) =>
//             cartItem.id === item.id
//               ? { ...cartItem, quantity: cartItem.quantity + 1 }
//               : cartItem
//           );
//         } else {
//           alert("You can't add more than the available stock.");
//           return prevItems;
//         }
//       } else {
//         // If the item is not in the cart, add it with a quantity of 1
//         return [...prevItems, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.reduce((acc, item) => {
//         if (item.id === id) {
//           if (item.quantity === 1) return acc; // If quantity is 1, remove the item
//           return [...acc, { ...item, quantity: item.quantity - 1 }]; // Decrease quantity by 1
//         }
//         return [...acc, item];
//       }, [])
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        if (existingItem.quantity < item.stock) {
          return prevItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          alert("You can't add more than the available stock.");
          return prevItems;
        }
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItems = () => cartItems;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
