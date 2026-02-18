import { useState } from "react";
import CustomizeModal from "./CustomizeModal";
import "./FoodCard.css";

export default function FoodCard({ food }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="food-card">
        <div className="img-wrapper">
          {/* 🔥 CHANGE HERE */}
          <img
            src={`/images/${food.image}`}
            alt={food.food_item}
            loading="lazy"
          />
        </div>

        <div className="food-info">
          {/* 🔥 CHANGE HERE */}
          <h4>{food.food_item}</h4>

          <p className="price">₹{food.price}</p>

          <button onClick={() => setOpen(true)}>
            Customize & Add
          </button>
        </div>
      </div>

      {open && <CustomizeModal food={food} onClose={() => setOpen(false)} />}
    </>
  );
}
