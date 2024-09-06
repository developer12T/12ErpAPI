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
  deleteitemsingle,
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
router.post(
  "/insert",
  [
    body("Hcase")
      .not()
      .isEmpty()
      .withMessage("Missing Hcase")
      .isLength({ min: 1, max: 1 })
      .withMessage("Hcase must be exactly 1 characters long"),
    body("orderType")
      .not()
      .isEmpty()
      .withMessage("Missing orderType")
      .isLength({ min: 3, max: 3 })
      .withMessage("orderType must be exactly 3 characters long"),
    body("orderStatus")
      .not()
      .isEmpty()
      .withMessage("Missing orderStatus")
      .isNumeric()
      .withMessage("orderStatus is Numeric")
      .isLength({ min: 2, max: 2 })
      .withMessage("orderStatus must be exactly 2 characters long"),
    body("orderDate")
      .not()
      .isEmpty()
      .withMessage("Missing orderDate")
      .isLength({ min: 8, max: 8 })
      .withMessage("orderDate must be exactly 8 characters long"),
    body("requestDate")
      .not()
      .isEmpty()
      .withMessage("Missing requestDate")
      .isLength({ min: 8, max: 8 })
      .withMessage("requestDate must be exactly 8 characters long"),
    body("customerNo")
      .not()
      .isEmpty()
      .withMessage("Missing customerNo")
      .isLength({ min: 8, max: 8 })
      .withMessage("customerNo must be exactly 8 characters long"),
    body("payer")
      .not()
      .isEmpty()
      .withMessage("Missing payer")
      .isLength({ min: 8, max: 8 })
      .withMessage("payer must be exactly 8 characters long"),
    body("addressID").not().isEmpty().withMessage("Missing addressID"),
    body("warehouse")
      .not()
      .isEmpty()
      .withMessage("Missing warehouse")
      .isNumeric()
      .withMessage("Data is Numeric")
      .isLength({ min: 3, max: 3 })
      .withMessage("warehouse must be exactly 3 characters long"),
    body("totalNet")
      .not()
      .isEmpty()
      .withMessage("Missing totalNet")
      .isNumeric()
      .withMessage("Data is Numeric"),
    body("item.*.itemCode")
      .not()
      .isEmpty()
      .withMessage("Missing itemCode")
      .isInt()
      .withMessage("ItemCode must be numeric"),
    body("item.*.itemName")
      .not()
      .isEmpty()
      .withMessage("Missing itemName")
      .isString()
      .withMessage("Itemname must be String")
      .isLength({ min: 1, max: 60 })
      .withMessage("Itemname must be exactly 60 characters long"),
    body("item.*.qtyPCS").not().isEmpty().withMessage("Missing qtyPCS"),
    body("item.*.qtyCTN").not().isEmpty().withMessage("Missing qtyCTN"),
    body("item.*.price").not().isEmpty().withMessage("Missing qtyCTN"),
    body("item.*.unit")
      .not()
      .isEmpty()
      .withMessage("Missing unit")
      .isLength({ min: 3, max: 3 })
      .withMessage("warehouse must be exactly 3 characters long"),
    body("item.*.discount").not().isEmpty().withMessage("Missing discount"),
    body("item.*.netPrice").not().isEmpty().withMessage("Missing netPrice"),
    body("item.*.total").not().isEmpty().withMessage("Missing total"),
  ],
  insert
);

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
