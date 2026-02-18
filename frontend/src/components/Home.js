import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/restaurant-bg.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fef9f9",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(244, 250, 251, 0.85)",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Smart Restaurant</h1>
        <p>Your Digital Smart Menu Ordering System</p>

        <button
          className="order-btn"
          onClick={() => navigate("/customer/menu")}
        >
          Order Now
        </button>

      </div>
    </div>
  );
}

export default Home;
