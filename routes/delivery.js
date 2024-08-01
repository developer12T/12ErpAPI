const express = require("express");
const router = express.Router();
const {
  index,
  insertLine,
  insertHead,
} = require("../controllers/order/deliveryController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insertLine", insertLine);

// http://localhost:3000/customer/insert
router.post("/insertHead", insertHead);

module.exports = router;
