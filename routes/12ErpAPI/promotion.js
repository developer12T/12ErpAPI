const express = require("express");
const router = express.Router();
const {
  index,
  deleted,
  update,
  single,
  insert
} = require("../../controllers/order/promotionController");
const passportJWT = require("../../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/promotion/
router.post("/", index);

//http://localhost:3000/promotion/edit
router.post("/update", update);

//http://localhost:3000/promotion/insert
router.post("/insert", insert);

//http://localhost:3000/promotion/delete
router.post("/single", single);

//http://localhost:3000/promotion/delete
router.post("/delete", deleted);


module.exports = router;
