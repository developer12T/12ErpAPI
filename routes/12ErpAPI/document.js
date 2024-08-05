const express = require("express");
const router = express.Router();
const { insert } = require("../../controllers/order/documentController");

/* GET home page. */
//http://localhost:3000/sale/
// router.get("/", index);

//http://localhost:3000/customer/edit
router.post("/insert", insert);


module.exports = router;
