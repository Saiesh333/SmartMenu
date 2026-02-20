import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./floating.css";

export default function FloatingCart() {
<<<<<<< HEAD

  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  return (
    <div className="floating-cart" onClick={()=>navigate("/customer/cart")}>
      View Cart ({cartItems.length})
=======
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="floating-cart" onClick={() => navigate("/customer/cart")}>
      View Cart ({totalQty})
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
    </div>
  );
}
