const mongoose = require("mongoose");

const customizationItemSchema = new mongoose.Schema(
  {
    food_id: Number,
    c_id: Number,
    c_item1: String,
    c_item2: String,
    c_item3: String,
    c_item4: String,
    c_item5: String,
    c_item6: String,
    c_item7: String,
    c_item8: String,
    spice_level: String,
    sweetness: String,
    salt_level: String,
  },
  { collection: "customization_items" }
);

module.exports = mongoose.model("CustomizationItem", customizationItemSchema);
