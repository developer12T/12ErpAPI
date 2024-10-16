const express = require("express");
const router = express.Router();
const {
  getCalCost,
  getCalWeight,
  getRunningNumber,
  getRunningNumberInvoice,
  postUpdateRunningNumber,
  postUpdateRunningNumberInvoice,
  getWarehouse,
  getPolicy,
  getOrdertype,
  getDistributionpolicy,
  getItemAll,
  getItemDetails,
  getCoType,
} = require("../../controllers/master/masterContorller");
const {
  getStockAll,
  getStockDetail,
} = require("../../controllers/master/stockController");
const {
  getDocumentTypeAll,
  getDocumentType,
} = require("../../controllers/master/documentTypeController");


//================================== Item Master ===============================
//http://localhost:3000/master/items
router.post("/items", getItemAll);

//http://localhost:3000/master/itemdetails
router.post("/itemdetails", getItemDetails);



//=================================== Order ====================================
//http://localhost:3000/master/ordertype
router.post("/ordertype", getOrdertype);

//http://localhost:3000/master/documenttype
router.post("/documenttype", getDocumentTypeAll);

//http://localhost:3000/master/documenttype/single
router.post("/documenttype/single", getDocumentType);

//http://localhost:3000/master/policy/single
router.post("/policy/single", getPolicy);

//http://localhost:3000/master/policy/distribution/single
router.post("/policy/distribution/single", getDistributionpolicy);

//http://localhost:3000/master/policy/distribution/single
router.post("/cotype", getCoType);


//================================== Calulate ==================================
//http://localhost:3000/master/getCalCost
router.post("/calcost", getCalCost);

//http://localhost:3000/master/getCalWeight
router.post("/calWeight", getCalWeight);


//=============================== Number Running ===============================
//http://localhost:3000/master/runningNumber/
router.post("/runningNumber", getRunningNumber);

//http://localhost:3000/master/runningNumber/update
router.post("/runningNumber/update", postUpdateRunningNumber);

//http://localhost:3000/master/runningNumberInvoice/
router.post("/runningNumberInvoice/", getRunningNumberInvoice);

//http://localhost:3000/master/runningNumberInvoice/update
router.post("/runningNumberInvoice/update", postUpdateRunningNumberInvoice);


//=============================== Warehouse ===============================
//http://localhost:3000/master/warehouse
router.post("/warehouse", getWarehouse);

//=============================== Stock ===============================
//http://localhost:3000/master/stockAll
router.post("/stockAll", getStockAll);

//http://localhost:3000/master/stockDetail
router.post("/stockDetail", getStockDetail);

module.exports = router;
