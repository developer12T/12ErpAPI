const express = require("express");
const router = express.Router();
const { index } = require("../../controllers/order/prepareInvoiceController");

/* GET home page. */
//http://localhost:3000/sale/
router.post("/", index);

module.exports = router;
