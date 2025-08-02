const express = require("express");
const router = express.Router();

const {
  insertHead,
} = require("../../controllers/distribution/distributionController");

const {
  getAddress,
} = require("../../controllers/distribution/addressDistributionController");

router.post("/insertdistribution", insertHead);

router.post("/address", getAddress);


module.exports = router;
