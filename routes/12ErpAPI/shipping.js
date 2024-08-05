const express = require("express");
const router = express.Router();
const {
  index,
  update,
  insert,
  deleted,
  single,
} = require("../../controllers/customers/shippingController");
// const passportJWT = require("../../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", index);

//http://localhost:3000/customer/edit
router.post("/update", update);

//http://localhost:3000/customer/insert
router.post("/insert", insert);

//http://localhost:3000/customer/insert
router.post("/single", single);

//http://localhost:3000/customer/insert
router.post("/delete", deleted);

module.exports = router;
