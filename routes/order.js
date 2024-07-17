const express = require("express");
const router = express.Router();
const {
  index,
  selectOne,
  item,
  insert,
} = require("../controllers/orderController");
const { line } = require("../controllers/orderLineController");
// const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", index);

//http://localhost:3000/customer/
router.post("/line", line);

//http://localhost:3000/customer/
router.post("/insert", insert);

//http://localhost:3000/customer/single
router.post("/single", selectOne);

//http://localhost:3000/customer/item
router.post("/item", item);

module.exports = router;
