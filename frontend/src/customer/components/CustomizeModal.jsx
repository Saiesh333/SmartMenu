import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import "./modal.css";

export default function CustomizeModal({ food, onClose }) {
  const { addToCart } = useCart();

  const [spice, setSpice] = useState("Normal");
  const [oil, setOil] = useState("Low");
  const [salt, setSalt] = useState("Normal");
  const [note, setNote] = useState("");

  // ✅ for checkbox options (you were getting error because this was missing)
  const [excluded, setExcluded] = useState([]);

  const toggleExcluded = (opt) => {
    setExcluded((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  // Make sure customizations is always an array
  const options = useMemo(() => {
    return Array.isArray(food.customizations) ? food.customizations : [];
  }, [food.customizations]);

  const handleAdd = () => {
   addToCart(food, {
  spice,
  oil,
  salt,
  note,               // ✅ this saves special instruction
  selectedOptions: excluded
});

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{food.food_item}</h2>
        <p className="subtitle">Customize your dish</p>

        <div className="modal-content">
          {/* Spice */}
          <h3>Spice Level</h3>
          <div className="pill-row">
            {["Mild", "Normal", "Medium", "Hot"].map((s) => (
              <label key={s} className={`pill ${spice === s ? "active" : ""}`}>
                <input
                  type="radio"
                  checked={spice === s}
                  onChange={() => setSpice(s)}
                />
                {s}
              </label>
            ))}
          </div>

          {/* Customization Options */}
          {options.length > 0 && (
            <>
              <h3>Customization Options</h3>
              <div className="options-grid">
                {options.map((opt) => (
                  <label key={opt} className="option-card">
                    <input
                      type="checkbox"
                      checked={excluded.includes(opt)}
                      onChange={() => toggleExcluded(opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Oil */}
          <h3>Oil Level</h3>
          <div className="pill-row">
            {["Low", "Medium", "High"].map((s) => (
              <label key={s} className={`pill ${oil === s ? "active" : ""}`}>
                <input
                  type="radio"
                  checked={oil === s}
                  onChange={() => setOil(s)}
                />
                {s}
              </label>
            ))}
          </div>

          {/* Salt */}
          <h3>Salt Level</h3>
          <div className="pill-row">
            {["Low", "Normal", "High"].map((s) => (
              <label key={s} className={`pill ${salt === s ? "active" : ""}`}>
                <input
                  type="radio"
                  checked={salt === s}
                  onChange={() => setSalt(s)}
                />
                {s}
              </label>
            ))}
          </div>

          {/* Note */}
          <h3>Special instructions</h3>
          <textarea
            placeholder="Special instructions"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleAdd} className="add-btn">
            
          </button>
        </div>
      </div>
    </div>
  );
}
