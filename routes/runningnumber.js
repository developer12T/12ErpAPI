const express = require("express");
const router = express.Router();
const { index, update } = require("../controllers/runningNumberController");
// const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", index);

//http://localhost:3000/customer/single
router.post("/update", update);

//http://localhost:3000/customer/item
// router.post("/item", item);

module.exports = router;
