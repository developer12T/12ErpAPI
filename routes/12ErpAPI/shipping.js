const express = require("express");
const {
  index,
  update,
  insert,
  deleted,
  single,
} = require("../../controllers/customers/shippingController");
const shippingController = require("../../controllers/customers/shippingController");
// const passportJWT = require("../../middleware/passportJWT");

/* GET home page. */
module.exports = (io) => {
  const router = express.Router();

  // Define routes
  router.post("/", index);
  router.post("/update", update);
  router.post("/insert", insert);
  router.post("/single", single(io)); // Pass io to the controller

  return router;
};
