const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ✅ MENU WITH CUSTOMIZATIONS FROM TABLE
router.get("/menu-with-customizations", async (req, res) => {
  try {
    const foods = await Food.aggregate([
      {
  $match: {
    $or: [
      { is_available: true },
      { isAvailable: true },
      { is_available: { $exists: false }, isAvailable: { $exists: false } } // if field missing
    ]
  }
},


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
          customization_doc: { $arrayElemAt: ["$customization_docs", 0] },
        },
      },

      {
        $addFields: {
          customizations: {
            $filter: {
              input: [
                "$customization_doc.c_item1",
                "$customization_doc.c_item2",
                "$customization_doc.c_item3",
                "$customization_doc.c_item4",
                "$customization_doc.c_item5",
                "$customization_doc.c_item6",
                "$customization_doc.c_item7",
                "$customization_doc.c_item8",
              ],
              as: "x",
              cond: { $and: [{ $ne: ["$$x", null] }, { $ne: ["$$x", ""] }] },
            },
          },
          spice_level: "$customization_doc.spice_level",
          sweetness: "$customization_doc.sweetness",
          salt_level: "$customization_doc.salt_level",
        },
      },

      { $project: { customization_docs: 0, customization_doc: 0 } },
      { $sort: { category: 1, food_item: 1 } },
    ]);

    res.json(foods);
  } catch (err) {
    console.log("MENU WITH CUSTOMIZATIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET ALL FOODS (used by Menu page)
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ category: 1, food_item: 1 }).lean();
    res.json(foods);
  } catch (err) {
    console.log("FOODS FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch foods" });
  }
});


module.exports = router;
