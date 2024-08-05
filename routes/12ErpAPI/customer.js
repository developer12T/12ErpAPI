const express = require("express");
const router = express.Router();
const {
  index,
  update,
  insert,
  deleted,
  single,
  onlycus,
} = require("../../controllers/customers/customerController");
const passportJWT = require("../../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/customer/
router.post("/", [passportJWT.isLogin], index);

//http://localhost:3000/customer/
router.post("/single", single);

//http://localhost:3000/customer/edit
router.post("/edit", update);

//http://localhost:3000/customer/insert
router.post("/insert", insert);

//http://localhost:3000/customer/insert
router.post("/onlycus", onlycus);

//http://localhost:3000/customer/delete
router.post("/delete", deleted);

module.exports = router;
