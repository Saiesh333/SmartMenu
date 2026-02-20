import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./floating.css";

export default function FloatingCart() {

  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  return (
    <div className="floating-cart" onClick={()=>navigate("/customer/cart")}>
      View Cart ({cartItems.length})
    </div>
  );
}
