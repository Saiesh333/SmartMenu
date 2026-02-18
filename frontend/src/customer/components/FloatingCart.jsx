import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./floating.css";

export default function FloatingCart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="floating-cart" onClick={() => navigate("/customer/cart")}>
      View Cart ({totalQty})
    </div>
  );
}
