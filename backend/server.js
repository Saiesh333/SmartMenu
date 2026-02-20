const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

<<<<<<< HEAD
// ✅ Make sure these files exist exactly with same name/case:
=======
// ⭐ NEW ROUTES (ADD THESE)
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
<<<<<<< HEAD
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
=======
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
<<<<<<< HEAD
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo error:", err));

// ✅ IMPORTANT: default port if .env doesn't have PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

=======

// ⭐ CUSTOMER SIDE ROUTES
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server Start
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
>>>>>>> 95119c6d651d04588453d5d3ce559c2d3af00ca9
