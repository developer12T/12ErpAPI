const express = require("express");
const router = express.Router();
const {
  index,
  insertHead,
  insertLine,
  insertMGDADR
} = require("../../controllers/distribution/distributionController");


router.post("/", index);

router.post("/insertHead", insertHead);

router.post("/insertLine", insertLine);

router.post("/insertMGDADR", insertMGDADR);

module.exports = router;

