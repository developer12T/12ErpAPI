const express = require("express");
const router = express.Router();
const { index, single, item } = require("../controllers/orderController");
// const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", index);

//http://localhost:3000/customer/single
router.post("/single", single);

//http://localhost:3000/customer/item
router.post("/item", item);

module.exports = router;
