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
  [
    body("item.*.coNo")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.OBDIVI")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.orderNo")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.OKALCU")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.runningNumberH")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.orderType")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.orderStatus")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.payer")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.itemCode")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.itemNo")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.itemName")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.qtyPCS")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.unit")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.price")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.discount")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.netPrice")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.netWight")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.grossWight")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.promotionCode")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.warehouse")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.customerNo")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
    body("item.*.addressID")
      .not()
      .isEmpty()
      .withMessage("Missing coNo")
      .isLength({ min: 3, max: 3 })
      .withMessage("coNo must be exactly 3 characters long"),
  ],
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
    body("grossWight")
      .not()
      .isEmpty()
      .withMessage("Missing grossWight")
      .isNumeric()
      .withMessage("Data is Numeric"),
    body("netWight")
      .not()
      .isEmpty()
      .withMessage("Missing netWight")
      .isNumeric()
      .withMessage("Data is Numeric"),
  ],
  insertHead
);

module.exports = router;
