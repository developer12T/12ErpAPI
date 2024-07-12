const express = require("express");
const router = express.Router();
const { index, update, insert } = require("../controllers/shippingController");
// const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", index);

//http://localhost:3000/customer/edit
router.post("/edit", update);

//http://localhost:3000/customer/insert
router.post("/insert", insert);

module.exports = router;
