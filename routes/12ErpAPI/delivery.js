const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  index,
  getDeliveryHead,
  getDeliveryLine,
} = require("../../controllers/order/deliveryController");

/* GET home page. */
//http://localhost:3000/delivery/deliveryhead
router.post("/head", getDeliveryHead);

//http://localhost:3000/sale/deliveryline
router.post("/line", getDeliveryLine);



module.exports = router;
