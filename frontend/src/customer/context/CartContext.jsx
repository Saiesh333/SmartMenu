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

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          // ✅ store numeric id + correct name
          foodId: food.food_id,
          name: food.food_item,
          price: Number(food.price),
          quantity: 1,
          customizations: custom,
        },
      ];
    });
  };

  const increaseQty = (index) => {
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
  };

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({ cart, addToCart, increaseQty, decreaseQty, clearCart }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
