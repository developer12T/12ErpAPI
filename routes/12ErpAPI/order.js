const express = require("express");

const router = express.Router();
const { body, check } = require("express-validator");
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
      .withMessage("Data lenght is incorrect it have 1 digit"),
    body("orderType")
      .not()
      .isEmpty()
      .withMessage("Missing orderType")
      .isByteLength({ min: 3, max: 3 })
      .withMessage("Data lenght is incorrect it have 8 digit"),
    body("orderStatus")
      .not()
      .isEmpty()
      .withMessage("Missing orderStatus")
      .isNumeric()
      .withMessage("Data is Numeric")
      .isLength({ min: 2, max: 2 })
      .withMessage("Data lenght is Over it have 2 digit"),
    body("orderDate")
      .not()
      .isEmpty()
      .withMessage("Missing orderDate")
      .isLength({ min: 8, max: 8 })
      .withMessage("Data lenght is incorrect it have 8 digit"),
    body("requestDate")
      .not()
      .isEmpty()
      .withMessage("Missing requestDate")
      .isLength({ min: 8, max: 8 })
      .withMessage("Data lenght is incorrect it have 8 digit"),
    body("customerNo")
      .not()
      .isEmpty()
      .withMessage("Missing customerNo")
      .isLength({ min: 8, max: 8 })
      .withMessage("Data lenght is incorrect it have 8 digit"),
    body("OKALCU").not().isEmpty().withMessage("Missing OKALCU"),
    body("payer")
      .not()
      .isEmpty()
      .withMessage("Missing payer")
      .isLength({ min: 8, max: 8 })
      .withMessage("Data lenght is incorrect it have 8 digit"),
    body("addressID").not().isEmpty().withMessage("Missing addressID"),
    body("warehouse")
      .not()
      .isEmpty()
      .withMessage("Missing warehouse")
      .isNumeric()
      .withMessage("Data is Numeric")
      .isLength({ min: 3, max: 3 })
      .withMessage("Data lenght is incorrect it have 3 digit"),
    body("totalNet")
      .not()
      .isEmpty()
      .withMessage("Missing totalNet")
      .isNumeric()
      .withMessage("Data is Numeric"),
    // body("item")
    //   .not()
    //   .isEmpty()
    //   .withMessage("Missing totalNet")
    //   .isNumeric()
    //   .withMessage("Data is Numeric"),
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
