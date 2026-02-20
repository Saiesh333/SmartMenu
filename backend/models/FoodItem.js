const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    food_id: Number,
    food_item: String,
    cuisine: String,
    ingredients: [String],
    description: String,
    image: String,
    category: String,
    type: String,
    is_available: Boolean,
    price: Number,
  },
  { collection: "food_items" } // ✅ collection name
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
