const {
  single,
  index,
  dpr,
  udi,
  ute,
  routecode,
} = require("../../controllers/master/routeController");
const express = require("express");
const router = express.Router();

/* GET home page. */
//http://localhost:3000/promotion/
router.post("/", index);

//http://localhost:3000/promotion/edit
router.post("/single", single);

//http://localhost:3000/promotion/edit
router.post("/routecode", routecode);

//http://localhost:3000/promotion/edit
router.post("/udi", udi);

//http://localhost:3000/promotion/edit
router.post("/ute", ute);

//http://localhost:3000/promotion/edit
router.post("/dpr", dpr);

module.exports = router;
