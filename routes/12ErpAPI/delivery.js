const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  index,
  insertLine,
  insertHead,
} = require("../../controllers/order/deliveryController");

/* GET home page. */
//http://localhost:3000/sale/
router.get("/", index);

//http://localhost:3000/customer/edit
router.post(
  "/insertLine",
  // [
  //   body("items.*.coNo")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.OACUCD")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing OACUCD")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("OACUCD must be exactly 3 characters long"),
  //   body("items.*.OBDIVI")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing OBDIVI")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("OBDIVI must be exactly 3 characters long"),
  //   body("items.*.OBORCO")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing OBORCO")
  //     .isLength({ min: 1, max: 3 })
  //     .withMessage("OBORCO must be exactly 3 characters long"),
  //   body("items.*.OKALCU")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing OKALCU")
  //     .isLength({ min: 1, max: 10 })
  //     .withMessage("OKALCU must be exactly 3 characters long"),
  //   body("items.*.orderType")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing runningNumberH")
  //     .isLength({ min: 0, max: 9 })
  //     .withMessage("runningNumberH must be exactly 3 characters long"),
  //   body("items.*.runningNumberH")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing orderType")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("orderType must be exactly 3 characters long"),
  //   body("items.*.orderStatus")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing orderStatus")
  //     .isLength({ min: 2, max: 2 })
  //     .withMessage("orderStatus must be exactly 3 characters long"),
  //   body("items.*.orderDate")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing orderDate")
  //     .isLength({ min: 8, max: 8 })
  //     .withMessage("orderDate must be exactly 3 characters long"),
  //   body("items.*.requestDate")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing requestDate")
  //     .isLength({ min: 8, max: 8 })
  //     .withMessage("requestDate must be exactly 3 characters long"),
  //   body("items.*.OAFRE1")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing OAFRE1")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("OAFRE1 must be exactly 3 characters long"),
  //   body("items.*.payer")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing payer")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("payer must be exactly 3 characters long"),
  //   body("items.*.unit")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.price")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.discount")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.netPrice")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.netWeight")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.grossWeight")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.promotionCode")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.warehouse")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.customerNo")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  //   body("items.*.addressID")
  //     .not()
  //     .isEmpty()
  //     .withMessage("Missing coNo")
  //     .isLength({ min: 3, max: 3 })
  //     .withMessage("coNo must be exactly 3 characters long"),
  // ],
  insertLine
);

// http://localhost:3000/customer/insert
router.post(
  "/insertHead",
  [
    body("coNo")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("warehouse")
      .not()
      .isEmpty()
      .withMessage("Missing warehouse")
      .isLength({ min: 3, max: 3 })
      .withMessage("warehouse must be exactly 1 characters long"),
    body("runningNumberH")
      .not()
      .isEmpty()
      .withMessage("Missing Hcase")
      .isNumeric()
      .withMessage("Data is Numeric")
      .isLength({ min: 0, max: 11 })
      .withMessage("runningNumberH must be exactly 11 characters long"),
    body("orderType")
      .not()
      .isEmpty()
      .withMessage("Missing orderType")
      .isLength({ min: 3, max: 3 })
      .withMessage("Hcase must be exactly 3 characters long"),
    body("addressID")
      .not()
      .isEmpty()
      .withMessage("Missing addressID")
      .isString()
      .withMessage("addressID must be String"),
    body("customerNo")
      .not()
      .isEmpty()
      .withMessage("Missing customerNo")
      .isLength({ min: 0, max: 10 })
      .withMessage("customerNo must be exactly 10 characters long"),
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
    body("OARGTM")
      .not()
      .isEmpty()
      .withMessage("Missing OARGTM")
      .isNumeric()
      .withMessage("Data is Numeric")
      .isLength({ min: 1, max: 6 })
      .withMessage("OARGTM must be exactly 6 characters long"),
    body("OATIZO").not().isEmpty().withMessage("Missing OATIZO"),
    body("grossWeight")
      .not()
      .isEmpty()
      .withMessage("Missing grossWeight")
      .isNumeric()
      .withMessage("Data is Numeric"),
    body("netWeight")
      .not()
      .isEmpty()
      .withMessage("Missing netWeight")
      .isNumeric()
      .withMessage("Data is Numeric"),
  ],
  insertHead
);

module.exports = router;
