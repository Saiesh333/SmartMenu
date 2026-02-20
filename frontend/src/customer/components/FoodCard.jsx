import { useState } from "react";
import CustomizeModal from "./CustomizeModal";
import "./FoodCard.css";

export default function FoodCard({ food }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="food-card">
        <div className="img-wrapper">
<<<<<<< HEAD
          <img src={`/images/${food.image}`} alt={food.food_item} loading="lazy" />
        </div>

        <div className="food-info">
          <h4>{food.food_item}</h4>
=======
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

>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
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
