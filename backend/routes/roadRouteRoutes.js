const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from road route routes");
});

module.exports = router;