const express = require("express");
const router = express.Router();
const {
  getAllocate,
} = require("../../controllers/order/allocateController");

/* GET home page. */
//http://localhost:3000/allocate/
router.post("/", getAllocate);

module.exports = router;
