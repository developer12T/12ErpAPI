const express = require("express");

const router = express.Router();
const {
  getOrderAll,
  getOrder,
  insert,
  deleted,
  
} = require("../../controllers/order/orderController");
const {
  getOrderItemAll,
  deleteitem,
} = require("../../controllers/order/orderItemController");

// const passportJWT = require("../../middleware/passportJWT");

// Order
//http://localhost:3000/order/single
router.post("/", getOrder);

//http://localhost:3000/order/
router.post("/all", getOrderAll);

//http://localhost:3000/order/deledte
router.post("/delete", deleted);

//http://localhost:3000/order/insert
router.post("/insert", insert);

// Order Item
//http://localhost:3000/order/orderitem
router.post("/orderitemAll", getOrderItemAll);

//http://localhost:3000/order/insertorderitem
router.post("/deleteitem", deleteitem);




module.exports = router;
