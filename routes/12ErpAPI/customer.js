const express = require("express");
const {
  index,
  update,
  insert,
  deleted,
  single,
  saleZone,
} = require("../../controllers/customers/customerController");
const passportJWT = require("../../middleware/passportJWT");

module.exports = (io) => {
  const router = express.Router();
  /* GET home page. */
  //http://localhost:3000/customer/
  router.post("/", [passportJWT.isLogin], index);

  //http://localhost:3000/customer/single
  router.post("/single", single);

  //http://localhost:3000/customer/edit
  router.post("/edit", update);

  //http://localhost:3000/customer/insert
  router.post("/insert", insert(io));

  //http://localhost:3000/customer/saleZone
  router.post("/saleZone", saleZone(io));

  //http://localhost:3000/customer/delete
  router.post("/delete", deleted);

  return router;
};
