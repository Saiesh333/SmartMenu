<<<<<<< HEAD
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
=======
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
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
