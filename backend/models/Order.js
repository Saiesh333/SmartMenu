const mongoose = require("mongoose");

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
  },

  status: {
    type: String,
    enum: ["Pending Payment", "Paid", "Preparing", "Completed"],
    default: "Pending Payment"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  paidAt: Date,
  completedAt: Date
});

module.exports = mongoose.model("Order", OrderSchema);
