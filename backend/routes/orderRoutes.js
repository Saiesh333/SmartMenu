const router = require("express").Router();
const Order = require("../models/Order");


// ================= CREATE ORDER =================
router.post("/", async (req, res) => {
  try {

    const { items, subtotal, gst, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      items,
      subtotal,
      gst,
      total,
      status: "Pending Payment",
      createdAt: new Date()
    });

    res.json(order);

  } catch (err) {
    console.log("Create Order Error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});


// ================= PAYMENT SUCCESS =================
router.put("/pay/:id", async (req, res) => {
  try {

    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method missing" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "Paid",
          paymentMethod: paymentMethod,
          paidAt: new Date()
        }
      },
      {
        new: true,
        runValidators: false   // 🔴 VERY IMPORTANT
      }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    console.log("PAYMENT UPDATE ERROR:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});


// ================= COMPLETE ORDER =================
router.put("/complete/:id", async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "Completed",
          completedAt: new Date()
        }
      },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: "Completion update failed" });
  }
});


// ================= GET ORDER =================
router.get("/:id", async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = router;
