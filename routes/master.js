const express = require("express");
const router = express.Router();
const {
  index,
  //   items,
  // itemsingle,
  //   fac,
  itemdetails,
  //   unit,
  calCost,
  calWight,
  runningNumber,
  runningNumberInvoice,
  updateRunningNumber,
  updateRunningNumberInvoice,
  warehouse,
  singlepolicy,
} = require("../controllers/master/masterContorller");

const {
  fac,
  items,
  unit,
  itemsingle,
  unitmin,
  unitmax,
} = require("../controllers/master/itemController");

const {
  stock,
  balance,
  locate,
  stocksingle,
} = require("../controllers/master/stockController");

const {
  indexdoc,
  singledoc,
} = require("../controllers/master/documentTypeController");

// Item
//http://localhost:3000/master/
router.post("/", index);

//http://localhost:3000/master/
router.post("/items", items);

//http://localhost:3000/master/
router.post("/fac", fac);

//http://localhost:3000/master/
router.post("/unit", unit);

//http://localhost:3000/master/
router.post("/unitmin", unitmin);

//http://localhost:3000/master/
router.post("/unitmax", unitmax);

//http://localhost:3000/master/
router.post("/itemdetails", itemdetails);

//http://localhost:3000/master/
router.post("/itemsingle", itemsingle);

// Calculate
//http://localhost:3000/master/calCost
router.post("/calcost", calCost);

//http://localhost:3000/master/calWight
router.post("/calwight", calWight);

// Number Running
//http://localhost:3000/master/runningNumber/
router.post("/runningNumber", runningNumber);

//http://localhost:3000/master/runningNumber/
router.post("/runningNumber/s", runningNumber);

//http://localhost:3000/master/runningNumber/edit
router.post("/runningNumber/update", updateRunningNumber);

//http://localhost:3000/master/runningNumber/
router.post("/runningNumberInvoice/s", runningNumberInvoice);

//http://localhost:3000/master/runningNumber/edit
router.post("/runningNumberInvoice/update", updateRunningNumberInvoice);

// Warehouse
//http://localhost:3000/master/calWight
router.post("/warehouse", warehouse);

// Stock
//http://localhost:3000/master/calWight
router.post("/stock", stock);

//http://localhost:3000/master/calWight
router.post("/stocksingle", stocksingle);

//http://localhost:3000/master/calWight
router.post("/balance", balance);

//http://localhost:3000/master/calWight
router.post("/locate", locate);

// Document
//http://localhost:3000/master/calWight
router.post("/documenttype", indexdoc);

//http://localhost:3000/master/calWight
router.post("/documenttype/single", singledoc);

//http://localhost:3000/master/calWight
router.post("/policy/single", singlepolicy);

module.exports = router;
