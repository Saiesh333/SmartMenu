const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

// ⭐ NEW ROUTES (ADD THESE)
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));



app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

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
