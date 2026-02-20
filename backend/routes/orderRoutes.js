const router = require("express").Router();
const Order = require("../models/Order");


// ================= CREATE ORDER =================
router.post("/", async (req, res) => {
  try {

    const { items, subtotal, gst, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const order = await Order.create({
      items,
      subtotal,
      gst,
      total
    });

    res.status(201).json(order);

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});


// ================= GET ORDER =================
router.get("/:id", async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);

  } catch (err) {
    console.log("GET ORDER ERROR:", err);
    res.status(404).json({ message: "Invalid ID" });
  }
});


// ================= PAYMENT =================
router.put("/pay/:id", async (req, res) => {
  try {

    const { paymentMethod } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentMethod = paymentMethod;
    order.status = "Paid";

    await order.save();

    res.json(order);

  } catch (err) {
    console.log("PAYMENT ERROR:", err);
    res.status(500).json({ message: "Payment failed" });
  }
});


// ================= COMPLETE =================
router.put("/complete/:id", async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: "Completion failed" });
  }
});

module.exports = router;
