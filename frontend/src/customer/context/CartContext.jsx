<<<<<<< HEAD
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food, customizations = {}) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.foodId === food._id &&
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );
=======
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

const stableStringify = (obj) => {
  if (!obj) return "{}";
  const allKeys = [];
  JSON.stringify(obj, (key, value) => (allKeys.push(key), value));
  allKeys.sort();
  return JSON.stringify(obj, allKeys);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food, customization = {}) => {
    const custom = customization || {};

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        // ✅ use numeric food_id
        const sameFood = item.foodId === food.food_id;
        const sameCustom =
          stableStringify(item.customizations) === stableStringify(custom);
        return sameFood && sameCustom;
      });
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
<<<<<<< HEAD
          foodId: food._id,
          name: food.food_item,     // ✅ use food_item (your DB field)
          price: Number(food.price),
          quantity: 1,
          customizations,          // ✅ includes selectedOptions
=======
          // ✅ store numeric id + correct name
          foodId: food.food_id,
          name: food.food_item,
          price: Number(food.price),
          quantity: 1,
          customizations: custom,
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
        },
      ];
    });
  };

  const increaseQty = (index) => {
<<<<<<< HEAD
    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity === 1) updated.splice(index, 1);
    else updated[index].quantity -= 1;
    setCart(updated);
=======
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity += 1;
      return updated;
    });
  };

  const decreaseQty = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index].quantity === 1) updated.splice(index, 1);
      else updated[index].quantity -= 1;
      return updated;
    });
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
  };

  const clearCart = () => setCart([]);

<<<<<<< HEAD
  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
=======
  const value = useMemo(
    () => ({ cart, addToCart, increaseQty, decreaseQty, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
};

export const useCart = () => useContext(CartContext);
