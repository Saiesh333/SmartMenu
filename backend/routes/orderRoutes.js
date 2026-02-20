const router = require("express").Router();
const Order = require("../models/Order");


// ================= CREATE ORDER =================
router.post("/", async (req, res) => {
  try {

    const { items, subtotal, gst, total } = req.body;

    if (!items || items.length === 0) {
<<<<<<< HEAD
      return res.status(400).json({ message: "Cart empty" });
=======
      return res.status(400).json({ message: "Cart is empty" });
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
    }

    const order = await Order.create({
      items,
      subtotal,
      gst,
<<<<<<< HEAD
      total
    });

    res.status(201).json(order);

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
=======
      total,
      status: "Pending Payment",
      createdAt: new Date()
    });

    res.json(order);

  } catch (err) {
    console.log("Create Order Error:", err);
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
    res.status(500).json({ message: "Order creation failed" });
  }
});


<<<<<<< HEAD
=======
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


>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
// ================= GET ORDER =================
router.get("/:id", async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

<<<<<<< HEAD
    if (!order) return res.status(404).json({ message: "Order not found" });
=======
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9

    res.json(order);

  } catch (err) {
<<<<<<< HEAD
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
=======
    res.status(404).json({ message: "Order not found" });
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
  }
});

module.exports = router;
