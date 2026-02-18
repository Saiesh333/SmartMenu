import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Payment() {

  const { id } = useParams(); // 🔴 get order id from URL
  const navigate = useNavigate();

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const confirmPayment = async () => {
    try {

      setLoading(true);

      const res = await axios.put(`/api/orders/pay/${id}`, {
        paymentMethod: method
      });

      setLoading(false);

      alert("Payment Successful!");
      navigate(`/customer/order-status/${id}`);

    } catch (err) {
      console.log("PAYMENT ERROR:", err.response?.data || err.message);
      alert("Payment Failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Select Payment Method</h1>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="radio"
            name="pay"
            value="CARD"
            onChange={(e) => setMethod(e.target.value)}
          />
          Debit / Credit Card
        </label>
        <br /><br />

        <label>
          <input
            type="radio"
            name="pay"
            value="UPI"
            defaultChecked
            onChange={(e) => setMethod(e.target.value)}
          />
          GPay / PhonePe / UPI
        </label>
        <br /><br />

        <label>
          <input
            type="radio"
            name="pay"
            value="CASH"
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash at Counter
        </label>
      </div>

      <br />

      <button
        onClick={confirmPayment}
        disabled={loading}
        style={{
          padding: "12px 25px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px"
        }}
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>

    </div>
  );
}
