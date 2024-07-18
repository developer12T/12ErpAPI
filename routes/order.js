const express = require("express");
const router = express.Router();
const {
  index,
  single,
  insert,
  deleted,
} = require("../controllers/orderController");
const {
  insertItem,
  deleteitem,
  deleteitemsingle,
  item,
} = require("../controllers/orderItemController");
// const passportJWT = require("../middleware/passportJWT");

// Order 
//http://localhost:3000/order/
router.post("/", index);

//http://localhost:3000/order/deledte
router.post("/deledte", deleted);

//http://localhost:3000/order/insert
router.post("/insert", insert);

//http://localhost:3000/order/single
router.post("/single", single);

// Order Item
//http://localhost:3000/order/orderitem
router.post("/orderitem", item);

//http://localhost:3000/order/insertorderitem
router.post("/insertorderitem", insertItem);

module.exports = router;
