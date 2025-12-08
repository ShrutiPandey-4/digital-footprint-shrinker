const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY_123");
    req.user = decoded; // user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
