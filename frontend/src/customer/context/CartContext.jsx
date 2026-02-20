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

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          foodId: food._id,
          name: food.food_item,     // ✅ use food_item (your DB field)
          price: Number(food.price),
          quantity: 1,
          customizations,          // ✅ includes selectedOptions
        },
      ];
    });
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity === 1) updated.splice(index, 1);
    else updated[index].quantity -= 1;
    setCart(updated);
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
