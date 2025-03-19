const { MGHEAD, MGLINE, MGDADR } = require('../../models/distribution')
const { fetchWareHose } = require('../../services/warehouseService')
const {
  fetchCalWeight,
  fetchItemFactor
} = require('../../services/itemsService')
const { Op } = require('sequelize')

exports.getReceive = async (req, res, next) => {
  try {
    const { area, peroid } = req.body
    let receiveLinearr = []
    const receiveLineObj = {}
    const areaData = await fetchWareHose(area)

    const receiveData = await MGHEAD.findAll({
      where: {
        coNo: 410,
        statusHigh: 99,
        towarehouse: areaData.warehouse,
        MGRGDT: {
          [Op.like]: `${peroid}%`
        }
        // orderNo: '0000000002'
      }
    })

    for (let i = 0; i < receiveData.length; i++) {
      const receiveLineData = await MGLINE.findAll({
        where: { orderNo: receiveData[i].orderNo }
      })

      receiveLineObj[receiveData[i].orderNo] = []

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
          qty:  unit == "CTN" ? receiveLineData[j].itemQty / itemFactor.factor : receiveLineData[j].itemQty,
          unit: unit,
          qtyPcs: receiveLineData[j].itemQty,
          //   price: receiveLineData[j].MRTRPR,
          //   total: '',
          weightGross: receiveLineData[j].MRGRWE,
          weightNet: weight.netWeight,
          lot: receiveLineData[j].itemLot
        })
      }
    }
    receiveLinearr = receiveLineObj

    // const receive = receiveData.map(receive => async () => {
    //   const receiveLineArr = receiveLineObj[receive.orderNo] || []

    //   return {
    //     order: receive.orderNo,
    //     orderId: receive.orderNo,
    //     orderType: receive.orderType,
    //     orderTypeName: '',
    //     area: area,
    //     fromWarehouse: receive.warehouse,
    //     toWarehouse: receive.towarehouse,
    //     // shippingId: receive,
    //     shippingRoute: '',
    //     shippingName: '',
    //     sendAddress: '',
    //     sendDate: receive.MGLMDT,
    //     remark: receive.remark,
    //     listProduct: receiveLineArr
    //   }
    // })
    const receive = await Promise.all(
      receiveData.map(async receive => {
        const receiveLineArr = receiveLineObj[receive.orderNo] || []

        const addressData = await MGDADR.findOne({
          where: { coNo: 410, orderNo: receive.orderNo }
        })
        const shippingId = addressData.MAADID.trim()
        const shippingRoute = addressData.MAADK1.trim()
        const shippingName = addressData.MACONM.trim()
        const sendAddress = addressData.MAADR1.trim()
        const fromWarehouse = receive.warehouse
        const toWarehouse = receive.towarehouse

        return {
          order: receive.orderNo,
          orderId: receive.orderNo,
          orderType: receive.orderType,
          area: area, // Ensure area is defined
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

    // const receive = receiveData.map(receive => {
    //   const receiveLineArr = receiveLineObj[orderNo] || []
    //   const receiveLines = receiveLineArr.map(receiveLine => {
    //     const itemName = receiveLine.itemName.trim()
    //     const itemCode = receiveLine.itemCode.trim()

    //     return {
    //       productNumber: receiveLine.productNumber,
    //       itemCode: itemCode,
    //       itemNo: receiveLine.itemNo
    //     }
    //   })
    //   return {
    //     orderDate: order.orderDate,
    //     requestDate: order.requestDate,
    //     customerNo: customerNo,
    //     orderNo: orderNo,
    //     orderType: order.orderType,
    //     warehouse: order.warehouse,
    //     orderStatusLow: order.orderStatusLow,
    //     total: order.total,
    //     totalNet: order.totalNet,
    //     totalVat: order.totalVat,
    //     totalNonVat: order.totalNonVat,
    //     totalDiscount: order.totalDiscount,
    //     item: receiveLines
    //   }
    // })

    res.status(200).json(receive)
  } catch (error) {
    next(error)
  }
}
