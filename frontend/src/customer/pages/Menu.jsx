import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import Cart from "./Cart";
import "./Menu.css";

const Menu = () => {
  const [groupedFoods, setGroupedFoods] = useState({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
   axios.get("/api/foods/menu-with-customizations")

      .then((res) => {
        const grouped = {};
        res.data.forEach((item) => {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });
        setGroupedFoods(grouped);
      })
      .catch((err) => console.error("Menu error:", err));
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-title">Menu</h1>

      {Object.keys(groupedFoods).length === 0 && (
        <h2 className="loading-text">Loading menu...</h2>
      )}

      {Object.keys(groupedFoods).map((category) => (
        <div key={category} className="category-block">
          <h2 className="category-title">{category}</h2>

          <div className="food-grid">
            {groupedFoods[category].map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}

      {/* FLOATING VIEW CART BUTTON */}
      <button className="floating-cart-btn" onClick={() => setShowCart(true)}>
        View Cart
      </button>

      {/* CART DRAWER */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Menu;
