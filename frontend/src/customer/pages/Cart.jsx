import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {

  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty } = useCart();

  // totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  // 🔴 CREATE ORDER THEN GO PAYMENT
  const goToPayment = async () => {
    try {

      const res = await axios.post("/api/orders", {
        items: cart,
        subtotal,
        gst,
        total
      });

      const orderId = res.data._id;

      // navigate WITH id
      navigate(`/customer/payment/${orderId}`);

    } catch (err) {
      console.log("Order creation error:", err);
      alert("Failed to create order");
    }
  };

  return (
    <div className="cart-page">

      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 && (
        <h2 className="empty-cart">Cart is empty</h2>
      )}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">

          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* customizations */}
           {item.customizations && (
  <div className="custom-info">
    <small>
      {item.customizations.spice && `Spice: ${item.customizations.spice} `}
      {item.customizations.oil && `| Oil: ${item.customizations.oil} `}
      {item.customizations.salt && `| Salt: ${item.customizations.salt} `}
      {item.customizations.selectedOptions?.length > 0 &&
        `| Options: ${item.customizations.selectedOptions.join(", ")}`}

      {/* ✅ NEW: show note */}
      {item.customizations.note?.trim() && `| Note: ${item.customizations.note}`}
    </small>
  </div>
)}



          </div>

          <div className="qty-controls">
            <button onClick={() => decreaseQty(index)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(index)}>+</button>
          </div>

          <div className="item-total">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>

        </div>
      ))}

      {cart.length > 0 && (
        <div className="price-box">

          <div className="price-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="price-row">
            <span>GST (5%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="price-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={goToPayment}>
            Proceed to Payment
          </button>

        </div>
      )}

    </div>
  );
}
