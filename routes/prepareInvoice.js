const express = require("express");
const router = express.Router();
const {
  insertA,
  index,
} = require("../controllers/order/prepareInvoiceController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insertA", insertA);

//http://localhost:3000/customer/insert
// router.post("/insertB", insertB);

module.exports = router;
