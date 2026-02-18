import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Payment from "./customer/pages/Payment";

// Customer Pages
import Menu from "./customer/pages/Menu";

import Cart from "./customer/pages/Cart";
import { CartProvider } from "./customer/context/CartContext";

import OrderStatus from "./customer/pages/OrderStatus";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer/payment/:id" element={<Payment />} />

        {/* Customer Flow */}
        <Route path="/customer/menu" element={<Menu />} />
        <Route path="/customer/cart" element={<Cart />} />
        <Route path="/customer/order-status/:id" element={<OrderStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
