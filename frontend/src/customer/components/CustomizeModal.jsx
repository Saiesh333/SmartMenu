import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./modal.css";

export default function CustomizeModal({ food, onClose }) {
  const { addToCart } = useCart();

  const [spice, setSpice] = useState("Normal");
  const [oil, setOil] = useState("Low");
  const [salt, setSalt] = useState("Low");
  const [note, setNote] = useState("");

  // ✅ NEW
  const [excluded, setExcluded] = useState([]);

  const toggleExcluded = (ing) => {
    setExcluded((prev) =>
      prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]
    );
  };

  const handleAdd = () => {
    addToCart(food, { spice, oil, salt, note, excluded });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{food.food_item}</h2>

        <h3>Spice Level</h3>
        {["Mild", "Normal", "Medium", "Hot"].map((s) => (
          <label key={s}>
            <input type="radio" checked={spice === s} onChange={() => setSpice(s)} />
            {s}
          </label>
        ))}

        

        

        {food.customizations?.length > 0 && ( <> <h3>Customization Options</h3> {food.customizations.map((opt) => ( <label key={opt}> <input type="checkbox" /> {opt} </label> ))} </> )}



        <h3>Oil Level</h3>
        {["Low", "Medium", "High"].map((s) => (
          <label key={s}>
            <input type="radio" checked={oil === s} onChange={() => setOil(s)} />
            {s}
          </label>
        ))}

        <h3>Salt Level</h3>
        {["Low", "Normal", "High"].map((s) => (
          <label key={s}>
            <input type="radio" checked={salt === s} onChange={() => setSalt(s)} />
            {s}
          </label>
        ))}

        <textarea
          placeholder="Special instructions"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={handleAdd} className="add-btn">Add to Cart</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}
