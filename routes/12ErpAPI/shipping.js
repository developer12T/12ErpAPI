const express = require("express");
const {
  update,
  // insert,
  deleted,
  getShipping,
  getShippingAll,
} = require("../../controllers/customers/shippingController");
// const passportJWT = require("../../middleware/passportJWT");

/* GET home page. */
module.exports = (io) => {
  const router = express.Router();

  // Define routes
  router.post("/all", getShippingAll);
  router.post("/update", update);
  // router.post("/insert", insert);
  router.post("/deleted", deleted);
  router.post("/", getShipping(io)); // Pass io to the controller

  return router;
};
