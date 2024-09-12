const express = require("express");
const router = express.Router();
const { index, insert } = require("../../controllers/order/allocateController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insert", insert);

// http://localhost:3000/customer/insert
// router.post("/insertH", insertH);

module.exports = router;
