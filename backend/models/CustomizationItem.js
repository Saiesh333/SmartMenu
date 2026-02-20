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
<<<<<<< HEAD
    salt_level: String,
=======
    salt_level: String
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
  },
  { collection: "customization_items" }
);

module.exports = mongoose.model("CustomizationItem", customizationItemSchema);
