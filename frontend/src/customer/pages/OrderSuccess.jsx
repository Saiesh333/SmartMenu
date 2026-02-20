import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderSuccess.css";

export default function OrderSuccess() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const steps = [
    "Order Confirmed",
    "Food Being Prepared",
    "Plating Your Dish",
    "Ready to Serve"
  ];

  // progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);

          // auto redirect to menu after ready
          setTimeout(() => navigate("/customer/menu"), 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="celebrate">🎉</div>

        <h1>Order Confirmed!</h1>
        <p className="order-id">Order ID: {id}</p>

        <div className="progress-area">

          {steps.map((text, index) => (
            <div key={index} className={`step ${index <= step ? "active" : ""}`}>
              <div className="circle">
                {index < step ? "✓" : index === step ? "👨‍🍳" : ""}
              </div>
              <span>{text}</span>
            </div>
          ))}

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />
          </div>

        </div>

        <div className="eta">
          ⏱ Estimated serving time: <b>{15 - step * 2} mins</b>
        </div>

      </div>

    </div>
  );
}
