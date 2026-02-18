const mongoose = require("mongoose");

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

module.exports = mongoose.model("Food", foodSchema);
