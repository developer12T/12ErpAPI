const express = require('express')
const {
  index,
  update,
  insert,
  deleted,
  single,
  saleZone,
  selectTopOnehundred,
  getCAWareHouse
} = require('../../controllers/customers/customerController')

const passportJWT = require('../../middleware/passportJWT')

const router = express.Router()
/* GET home page. */
//http://localhost:3000/customer/
router.post('/bearer', [passportJWT.isLogin], index)

//http://localhost:3000/customer/single
router.post('/', single)

//http://localhost:3000/customer/top100
router.post('/top100', selectTopOnehundred)

//http://localhost:3000/customer/edit
router.post('/edit', update)

//http://localhost:3000/customer/insert
router.post('/insert', insert)

//http://localhost:3000/customer/saleZone
router.post('/saleZone', saleZone)

//http://localhost:3000/customer/delete
router.post('/delete', deleted)

//http://localhost:3000/customer/delete
router.get('/getCAWareHouse', getCAWareHouse)

module.exports = router
