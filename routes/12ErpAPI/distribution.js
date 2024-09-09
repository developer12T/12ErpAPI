const express = require("express");
const router = express.Router();
const {
  index,
  insertHead,
  insertLine,
  insertMGDADR,
} = require("../../controllers/distribution/distributionController");

const {
  insertAllocate,
} = require("../../controllers/distribution/allocateDistributionController");
const {
  insertDeliveryHead,
  insertDeliveryLine,
} = require("../../controllers/distribution/deliveryDistributionController");

router.post("/", index);

router.post("/insertHead", insertHead);

router.post("/insertLine", insertLine);

router.post("/insertMGDADR", insertMGDADR);

router.post("/insertAllocate", insertAllocate);

router.post("/insertDeliveryHead", insertDeliveryHead);

router.post("/insertDeliveryLine", insertDeliveryLine);

module.exports = router;
