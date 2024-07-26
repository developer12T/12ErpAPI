const express = require("express");
const router = express.Router();
const { index,single } = require("../controllers/customers/saleController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/single", single);

//http://localhost:3000/customer/insert
// router.post("/insert", insert);

module.exports = router;
