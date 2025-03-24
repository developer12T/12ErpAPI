const { MGHEAD, MGLINE, MGDADR } = require('../../models/distribution')
const { fetchWareHose, fetchArea } = require('../../services/warehouseService')
const {
  fetchCalWeight,
  fetchItemFactor,
  fetchTransectionLot
} = require('../../services/itemsService')
const { Op } = require('sequelize')
const { fetchCAWareHouse, fetchCAArea } = require('../customers/customerController')

exports.getReceive = async (req, res, next) => {
  try {
    const { peroid, transdate } = req.body
    let { area } = req.body

    const receiveLineObj = {}
    let areaData = {}
    let warehouseARR = []

    let areaDataObj = {}

    const whereCondition = {
      coNo: 410,
      statusHigh: 99
    }
    console.log(area)

    // console.log('warehouseARR ' + warehouseARR)

    // // Conditionally add 'warehouse' only if areaData is not empty

    const dataCAWareHouse = await fetchCAWareHouse()
    for (const key of dataCAWareHouse) {
      warehouseARR.push(key.warehouse)
    }

    if (area) {
      areaData = await fetchWareHose(area)
      whereCondition.towarehouse = areaData.warehouse
      whereCondition.MGRGDT = {
        [Op.like]: `${peroid}%`
      }
    } else {
      whereCondition.tranferDate = {
        [Op.like]: `${transdate}%`
      }
      whereCondition.towarehouse = {
        [Op.in]: [warehouseARR]
      }
    }
    const receiveData = await MGHEAD.findAll({
      where: whereCondition
    })

    for (let i = 0; i < receiveData.length; i++) {
      // if (area) {
      //   const areaData = await fetchArea(receiveData[i].towarehouse)
      //   area = areaData.area
      // }


      const receiveLineData = await MGLINE.findAll({
        where: { orderNo: receiveData[i].orderNo }
      })

      receiveLineObj[receiveData[i].orderNo] = []
    //   areaDataObj[receiveData[i].orderNo] = []

      
    //   if (!area) {
    //     for (const key of dataCAWareHouse) {
    //       console.log('Area CA ' + key.OKCFC1)
    //       console.log('fromWarehouse ' + receiveData[i].towarehouse)
    //       if (key.warehouse === receiveData[i].towarehouse) {
    //         area = key.OKCFC1
    //       }
    //     }
    //   }

      for (let j = 0; j < receiveLineData.length; j++) {
        const weight = await fetchCalWeight({
          itemCode: receiveLineData[j].itemCode,
          qty: receiveLineData[j].itemQty
        })

        const itemFactor = await fetchItemFactor(
          receiveLineData[j].itemCode,
          receiveLineData[j].itemUnit
        )

        const itemCode = receiveLineData[j].itemCode.trim()
        const itemName = receiveLineData[j].itemName.trim()
        const unit = receiveLineData[j].itemUnit.trim() || 'PCS'

        const itemLot = await fetchTransectionLot({
          itemCode: itemCode,
          towarehouse: receiveData[i].towarehouse,
          //   area: area,
          // area !== ''
          //   ? receiveData[i].towarehouse
          //   : receiveData[i].towarehouse,
          orderId: receiveData[i].orderNo.trim()
        })

        // res.status(200).json(itemLot)
        if (parseInt(receiveLineData[j].itemQty) > 0) {
          receiveLineObj[receiveData[i].orderNo].push({
            //   productNumber: receiveLineData[j].productNumber,
            //   itemCode: receiveLineData[j].itemCode,
            //   itemNo: receiveLineData[j].itemNo,
            //   itemName: receiveLineData[j].itemName,
            //   qty: receiveLineData[j].qty,
            //   unit: receiveLineData[j].unit,
            //   price: receiveLineData[j].price,
            //   discount: receiveLineData[j].discount,
            //   netPrice: receiveLineData[j].netPrice,
            //   total: receiveLineData[j].total,
            //   promotionCode: receiveLineData[j].promotionCode
            id: itemCode,
            name: itemName,
            //   group: '',
            //   brand: '',
            //   size: '',
            //   flavour: '',
            //   itemFactor: itemFactor.factor,
            qty:
              unit == 'CTN'
                ? receiveLineData[j].itemQty / itemFactor.factor
                : receiveLineData[j].itemQty,
            unit: unit,
            qtyPcs: receiveLineData[j].itemQty,
            //   price: receiveLineData[j].MRTRPR,
            //   total: '',
            weightGross: receiveLineData[j].MRGRWE,
            weightNet: weight.netWeight,
            lot: itemLot.itemLot || ''
          })
        }
      }
    }
    receiveLinearr = receiveLineObj
    const receive = await Promise.all(
      receiveData.map(async receive => {
        const receiveLineArr = receiveLineObj[receive.orderNo] || []

        const addressData = await MGDADR.findOne({
          where: { coNo: 410, orderNo: receive.orderNo }
        })

        const shippingId = addressData.MAADK1.trim()
        const shippingRoute = addressData.MAPONO.trim()
        const shippingName = addressData.MACONM.trim()
        const sendAddress = addressData.MAADR1.trim()
        const fromWarehouse = receive.warehouse
        const toWarehouse = receive.towarehouse

        if (!area) {
          const CAData = await fetchCAArea(toWarehouse)
          area = CAData.OKCFC1
        }

        return {
          //   order: receive.orderNo,
          orderId: receive.orderNo,
          orderType: receive.orderType,
          area: area,
          fromWarehouse: fromWarehouse,
          toWarehouse: toWarehouse,
          shippingId: shippingId,
          shippingRoute: shippingRoute,
          shippingName: shippingName,
          sendAddress: sendAddress,
          sendDate: receive.MGLMDT,
          remark: receive.remark,
          listProduct: receiveLineArr
        }
      })
    )

    res.status(200).json(receive)
  } catch (error) {
    next(error)
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const { orderList } = req.body
    for (const order of orderList) {
      await MGHEAD.update(
        {
          MGGSR3: 'Y'
        },
        {
          where: {
            coNo: 410,
            orderNo: order
          }
        }
      )
    }
    res.status(200).json({
      status: 'success'
    })
  } catch (error) {
    next(error)
  }
}
