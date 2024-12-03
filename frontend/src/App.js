// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CheckOut from './components/CheckOut';
// import ItemList from './components/ItemList';
// import MyAppBar from './components/MyAppBar';

// function App() {
//   return (
//     <div className="main-page">
//       <Router>
//         <MyAppBar />
//         <Routes>
//           <Route path="/" element={<ItemList />} />
//           <Route path="/checkout" element={<CheckOut />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAppBar from './components/MyAppBar';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <MyAppBar />
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
