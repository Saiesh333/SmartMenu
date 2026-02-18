const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// ✅ foods + customizations (JOIN)
router.get("/menu-with-customizations", async (req, res) => {
  try {
    const data = await FoodItem.aggregate([
      { $match: { is_available: true } },
      {
        $lookup: {
          from: "customization_items",
          localField: "food_id",
          foreignField: "food_id",
          as: "customization_docs",
        },
      },
      {
        $addFields: {
    customizations: {
      $filter: {
        input: [
          { $arrayElemAt: ["$customization_docs.c_item1", 0] },
          { $arrayElemAt: ["$customization_docs.c_item2", 0] },
          { $arrayElemAt: ["$customization_docs.c_item3", 0] },
          { $arrayElemAt: ["$customization_docs.c_item4", 0] },
          { $arrayElemAt: ["$customization_docs.c_item5", 0] },
          { $arrayElemAt: ["$customization_docs.c_item6", 0] },
          { $arrayElemAt: ["$customization_docs.c_item7", 0] },
          { $arrayElemAt: ["$customization_docs.c_item8", 0] }
        ],
        as: "x",
        cond: { $ne: ["$$x", null] }
      }
    }
  },
      },
      { $project: { customization_docs: 0 } },
      { $sort: { category: 1, food_item: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    console.log("MENU WITH CUSTOMIZATIONS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
