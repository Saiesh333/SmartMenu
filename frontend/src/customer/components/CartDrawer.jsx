import "./CartDrawer.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CartDrawer({ open, onClose }) {

  const { cart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ===== LOCK BACKGROUND SCROLL =====
  useEffect(() => {
    if (open) document.body.classList.add("cart-open");
    else document.body.classList.remove("cart-open");

    return () => document.body.classList.remove("cart-open");
  }, [open]);

  if (!open) return null;

  // ===== CALCULATE BILL =====
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  // ===== CREATE ORDER THEN GO TO PAYMENT =====
  const handlePayment = async () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {

      const formattedItems = cart.map(item => ({
  foodId: item.foodId, // ✅ FIXED
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  customizations: item.customizations || {}
}));


      const res = await axios.post("/api/orders", {
        items: formattedItems,
        subtotal,
        gst,
        total
      });

      if (!res.data || !res.data._id) {
        throw new Error("Order ID missing");
      }

      onClose();
      navigate(`/customer/payment/${res.data._id}`);

    } catch (err) {
      console.error("ORDER CREATION FAILED:", err);
      alert("Unable to start payment. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>

      {/* STOP CLOSE WHEN CLICK INSIDE */}
      <div className="drawer" onClick={(e) => e.stopPropagation()}>

        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty">Cart is empty</p>
        ) : (
          <>
            <div className="drawer-items" style={{ paddingBottom: "140px" }}>

              {cart.map((item, index) => (
                <div key={index} className="drawer-item">

                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                  {item.customizations && (
  <small className="custom">
    {item.customizations.spice && `Spice: ${item.customizations.spice} `}
    {item.customizations.oil && `| Oil: ${item.customizations.oil} `}
    {item.customizations.salt && `| Salt: ${item.customizations.salt} `}
    {item.customizations.selectedOptions?.length > 0 &&
      `| Options: ${item.customizations.selectedOptions.join(", ")}`}
    
    {/* ✅ NEW: show note */}
    {item.customizations.note?.trim() && `| Note: ${item.customizations.note}`}
  </small>
)}



                  </div>

                  <div className="qty">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  <div className="price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>

                </div>
              ))}

            </div>

            <div className="drawer-total">

              <div className="bill">
                <p><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></p>
                <p><span>GST (5%)</span><span>₹{gst.toFixed(2)}</span></p>
                <h3><span>Total</span><span>₹{total.toFixed(2)}</span></h3>
              </div>

              <button
                className="payment-btn"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Starting Payment..." : "Proceed to Payment"}
              </button>

              <button className="back-btn" onClick={onClose}>
                Add More Items
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
