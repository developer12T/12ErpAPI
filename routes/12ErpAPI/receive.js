const { getArea,getWareHose } = require('../../services/warehouseService')
const {
  getReceive,
  updateStatus
} = require('../../controllers/distribution/receiveController')
const express = require('express')
const router = express.Router()

/* GET home page. */
//http://localhost:3000/promotion/
router.post('/getArea', getArea)
router.post('/getWareHose', getWareHose)
router.post('/getReceiveAll', getReceive)
router.post('/updateStatus', updateStatus)

module.exports = router
