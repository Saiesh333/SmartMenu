import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";

import Payment from "./customer/pages/Payment";
import Menu from "./customer/pages/Menu";
import Cart from "./customer/pages/Cart";
import OrderSuccess from "./customer/pages/OrderSuccess";

import { CartProvider } from "./customer/context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />

          {/* Customer */}
          <Route path="/customer/menu" element={<Menu />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/payment/:id" element={<Payment />} />
          <Route path="/customer/order-success/:id" element={<OrderSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
