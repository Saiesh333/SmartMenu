import { useParams, useNavigate } from "react-router-dom";
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

    </div>
  );
}
