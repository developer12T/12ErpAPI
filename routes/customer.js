const express = require("express");
const router = express.Router();
const { index } = require("../controllers/customerController");

/* GET home page. */
//http://localhost:3000/stock
router.post("/", index);

//http://localhost:3000/stock
router.post("/edit", index);

//http://localhost:3000/stock/monitoring/10010201029
// router.get("/monitoring/:id", index);

module.exports = router;
