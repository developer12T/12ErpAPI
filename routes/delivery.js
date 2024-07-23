const express = require("express");
const router = express.Router();
const { index,insert, } = require("../controllers/deliveryController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insert", insert);

//http://localhost:3000/customer/insert
// router.post("/insert", insert);

module.exports = router;
