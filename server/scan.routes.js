const express = require("express");
const authMiddleware = require("./authMiddleware");
const Scan = require("./scan.model");

const router = express.Router();

// ======================================
// START SCAN (POST /api/scan/start)
// ======================================
router.post("/start", authMiddleware, async (req, res) => {
  try {
    const scan = await Scan.create({
      userId: req.user.id,
      risksFound: Math.floor(Math.random() * 5), // random risk count
      date: new Date()
    });

    return res.status(201).json({
      message: "Scan completed successfully",
      scan
    });
  } catch (err) {
    return res.status(500).json({
      message: "Scan failed",
      error: err.message
    });
  }
});

// ======================================
// GET SCAN HISTORY (GET /api/scan/history)
// ======================================
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Scan
      .find({ userId: req.user.id })
      .sort({ date: -1 });

    return res.status(200).json(history);
  } catch (err) {
    return res.status(500).json({
      message: "History fetch error",
      error: err.message
    });
  }
});

module.exports = router;

