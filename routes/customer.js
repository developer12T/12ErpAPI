const express = require("express");
const router = express.Router();
const { index, update } = require("../controllers/customerController");
const passportJWT = require("../middleware/passportJWT");

/* GET home page. */
//http://localhost:3000/stock
router.post("/", [passportJWT.isLogin], index);

//localhost:3000/stock
http: router.post("/edit", update);

//http://localhost:3000/stock/monitoring/10010201029
// router.get("/monitoring/:id", index);

module.exports = router;
