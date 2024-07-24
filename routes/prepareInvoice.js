const express = require("express");
const router = express.Router();
const { insert, index } = require("../controllers/prepareInvoiceController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insert", insert);

//http://localhost:3000/customer/insert
// router.post("/insert", insert);

module.exports = router;
