import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import CartDrawer from "../components/CartDrawer";
import "./Menu.css";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [openCart, setOpenCart] = useState(false);

  // ✅ LOAD ALL FOODS WITH CUSTOMIZATIONS
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get("/api/foods/menu-with-customizations");
        const list = Array.isArray(res.data) ? res.data : [];

        setFoods(list);

        const uniqueCats = [...new Set(list.map((f) => f.category).filter(Boolean))];
        setCategories(uniqueCats);

        // keep selected category valid
        setSelectedCategory((prev) => {
          if (prev && uniqueCats.includes(prev)) return prev;
          return uniqueCats[0] || "";
        });
      } catch (err) {
        console.log("Food fetch error:", err);
        setFoods([]);
        setCategories([]);
        setSelectedCategory("");
      }
    };

    fetchFoods();
  }, []);

  // ✅ FILTER (category + search)
  const filteredFoods = useMemo(() => {
    let items = Array.isArray(foods) ? foods : [];

    if (selectedCategory) {
      items = items.filter((f) => f.category === selectedCategory);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter((f) =>
        (f.food_item || "").toLowerCase().includes(q)
      );
    }

    return items;
  }, [foods, selectedCategory, search]);

  return (
    <div className="menu-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-chips">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "chip active" : "chip"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-container">
        <h2 className="category-title">{selectedCategory || "Menu"}</h2>

        {filteredFoods.length === 0 ? (
          <p className="no-food">No items found</p>
        ) : (
          <div className="food-grid">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>

      <button className="floating-cart" onClick={() => setOpenCart(true)}>
        🛒 View Cart
      </button>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </div>
  );
}
