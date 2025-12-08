require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// =======================
//  MongoDB Connection
// =======================
mongoose.connect(process.env.MONGO_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// =======================
// Import Routes + Middleware
// =======================
const authRoutes = require("./auth.routes");
const scanRoutes = require("./scan.routes");
const authMiddleware = require("./authMiddleware");

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);

// =======================
// Protected Test Route
// =======================
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed successfully!",
    user: req.user
  });
});

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
