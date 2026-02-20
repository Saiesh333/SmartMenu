const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    food_id: { type: Number, required: true, unique: true },
    food_item: { type: String, required: true },
    cuisine: { type: String },
    ingredients: { type: [String], default: [] },
    description: { type: String },
    image: { type: String },
    category: { type: String, required: true },
    type: { type: String, required: true }, // "veg" / "non veg"
    is_available: { type: Boolean, default: true },
    price: { type: Number, required: true },
  },
  { collection: "food_items" }
);

module.exports = mongoose.model("Food", foodSchema);
