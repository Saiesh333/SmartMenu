const mongoose = require("mongoose");

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
  },

  status: {
    type: String,
    enum: ["Pending Payment", "Paid", "Preparing", "Completed"],
    default: "Pending Payment"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", OrderSchema);
