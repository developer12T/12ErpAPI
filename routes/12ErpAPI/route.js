const {
  getRoute,
  getRouteAll,
  getRouteCode,
  getMethod
} = require("../../controllers/master/routeController");
const express = require("express");
const router = express.Router();

/* GET home page. */
//http://localhost:3000/promotion/
router.post("/all", getRouteAll);

//http://localhost:3000/promotion/edit
router.post("/", getRoute);
router.post("/method", getMethod);

//http://localhost:3000/promotion/edit
router.post("/routecode", getRouteCode);

module.exports = router;
