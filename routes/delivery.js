const express = require("express");
const router = express.Router();
const { index,insertL,insertH } = require("../controllers/order/deliveryController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insertL", insertL);

// http://localhost:3000/customer/insert
router.post("/insertH", insertH);

module.exports = router;
