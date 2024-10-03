const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const {
  index,
  single,
  insert,
  deleted,
} = require("../../controllers/order/orderController");
const {
  insertItem,
  item,
  deleteitem,
} = require("../../controllers/order/orderItemController");

// const passportJWT = require("../../middleware/passportJWT");

// Order
//http://localhost:3000/order/
router.post("/", index);

//http://localhost:3000/order/deledte
router.post("/delete", deleted);

//http://localhost:3000/order/insert
router.post("/insert", insert);

//http://localhost:3000/order/single
router.post("/single", single);

// Order Item
//http://localhost:3000/order/orderitem
router.post("/orderitem", item);

//http://localhost:3000/order/insertorderitem
router.post("/insertorderitem", insertItem);

//http://localhost:3000/order/insertorderitem
router.post("/deleteitem", deleteitem);

module.exports = router;
