const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//MongoDB Connection
mongoose.connect("mongodb+srv://admin:Doraemon123@cluster0.zb3rq7n.mongodb.net/?appName=Cluster0", {
  tls: true,
  tlsAllowInvalidCertificates: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));


//Import Routes
const authRoutes = require("./auth.routes");
app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


