const mongoose = require("mongoose");

<<<<<<< HEAD
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
=======
const foodSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  price: Number,
  image: String,

  // ✅ add this
  ingredients: {
    type: [String],
    default: []
  }
});
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9

module.exports = mongoose.model("Food", foodSchema);
