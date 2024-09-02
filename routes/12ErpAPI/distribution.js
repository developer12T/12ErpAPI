const express = require("express");
const router = express.Router();
const {
  index,
  insertHead,
  insertLine
} = require("../../controllers/distribution/distributionController");


router.post("/", index);

router.post("/insertHead", insertHead);

router.post("/insertLine", insertLine);

module.exports = router;

