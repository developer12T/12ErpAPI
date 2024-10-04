const express = require("express");
const router = express.Router();
const {
  getSaleAll,
  getSale,
} = require("../../controllers/customers/saleController");

/* GET home page. */
//http://localhost:3000/sale/
router.post("/", getSale);

//http://localhost:3000/customer/edit
router.post("/all", getSaleAll);

module.exports = router;
