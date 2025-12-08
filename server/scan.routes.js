const express = require("express");
const router = express.Router();
const Scan = require("./scan.model");
const authMiddleware = require("./authMiddleware");

//RUN SCAN (save result)
router.post("/run", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Simple random risk count (baad me logic improve kar sakte)
    const risksFound = Math.floor(Math.random() * 4); // 0 to 3

    const newScan = await Scan.create({
      userId,
      risksFound
    });

    res.json({
      message: "Scan saved successfully",
      scan: newScan
    });
  } catch (err) {
    res.status(500).json({ message: "Error running scan", error: err.message });
  }
});

//GET HISTORY for logged-in user
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const scans = await Scan.find({ userId }).sort({ createdAt: -1 });

    res.json(scans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;
