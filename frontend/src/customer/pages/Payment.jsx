import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import "./Payment.css";

export default function Payment() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [stage, setStage] = useState("select"); // select → processing → success

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        setOrder(res.data);
        setLoading(false);
      } catch {
        setTimeout(fetchOrder, 400);
      }
    };
    fetchOrder();
  }, [id]);

  const confirmPayment = async () => {

    setStage("processing");

    try {

      await axios.put(`/api/orders/pay/${id}`, {
        paymentMethod: method
      });

      // animation delay
      setTimeout(() => {
        setStage("success");
      }, 1800);

      setTimeout(() => {
        navigate(`/customer/order-success/${id}`);
      }, 3000);

    } catch {
      alert("Payment failed");
      setStage("select");
    }
  };

  if (loading) return <div className="loading-screen">Preparing your table...</div>;

  return (
    <div className="pay-bg">

      {/* PROCESSING SCREEN */}
      {stage === "processing" && (
        <div className="processing">
          <div className="scanner"></div>
          <h2>Confirming Payment...</h2>
          <p>Talking to bank servers</p>
        </div>
      )}

      {/* SUCCESS SCREEN */}
      {stage === "success" && (
        <div className="success">
          <div className="tick">✓</div>
          <h2>Payment Successful</h2>
          <p>Sending order to kitchen 👨‍🍳</p>
        </div>
      )}

      {/* MAIN PAYMENT */}
      {stage === "select" && (
        <div className="pay-card">

          <h1>Complete Your Order</h1>

          <div className="amount">
            ₹{order.total.toFixed(2)}
          </div>

          <div className="eta">
            ⏱ Estimated preparation: 12 - 18 mins
          </div>

          <div className="methods">

            <div
              className={`method ${method === "card" ? "active" : ""}`}
              onClick={() => setMethod("card")}
            >
              💳 Card
            </div>

            <div
              className={`method ${method === "upi" ? "active" : ""}`}
              onClick={() => setMethod("upi")}
            >
              📱 UPI
            </div>

            <div
              className={`method ${method === "cash" ? "active" : ""}`}
              onClick={() => setMethod("cash")}
            >
              💵 Cash
            </div>

          </div>

          <button className="pay-btn" onClick={confirmPayment}>
            Pay Now
          </button>

        </div>
      )}
=======
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
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9

    </div>
  );
}
