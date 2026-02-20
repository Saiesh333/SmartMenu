const mongoose = require("mongoose");

<<<<<<< HEAD
const OrderSchema = new mongoose.Schema({

  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },

      customizations: {
        spice: String,
        oil: String,
        salt: String,
        notes: String
      }
    }
  ],

  subtotal: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["card", "upi", "cash"],
    default: null
=======
const OrderItemSchema = new mongoose.Schema({
  foodId: String,
  name: String,
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  customizations: {
    spiceLevel: String,
    ingredientsRemoved: [String],
    oilLevel: String,
    saltLevel: String,
    note: String
  }
});

const OrderSchema = new mongoose.Schema({
  items: {
    type: [OrderItemSchema],
    required: true
  },

  subtotal: {
    type: Number,
    required: true,
    default: 0
  },

  gst: {
    type: Number,
    required: true,
    default: 0
  },

  total: {
    type: Number,
    required: true,
    default: 0
  },

  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card"],
    default: "Cash"
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
  },

  status: {
    type: String,
    enum: ["Pending Payment", "Paid", "Preparing", "Completed"],
    default: "Pending Payment"
  },

  createdAt: {
    type: Date,
    default: Date.now
<<<<<<< HEAD
  }

=======
  },

  paidAt: Date,
  completedAt: Date
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
});

module.exports = mongoose.model("Order", OrderSchema);
