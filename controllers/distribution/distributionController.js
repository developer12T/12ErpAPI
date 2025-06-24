// Models
const { MGHEAD, MGLINE, MGDADR } = require('../../models/distribution')
const { sequelize } = require('../../config/m3db')
// Controller
const {
  distributionDeliveryHead,
  distributionDeliveryLine
} = require('./deliveryDistributionController')
const { distributionAllocate } = require('./allocateDistributionController')
// Service
const { fetchStock } = require('../../services/stockService')
const {
  fetchCalWeight,
  fetchItemDetails,
  fetchItemFactor
} = require('../../services/itemsService')
const {
  runningNumber,
  updateRunningNumber
} = require('../../services/runningNumberService')
const { fetchDistributionAddress } = require('../../services/addressService')
// Utils
const {
  formatDate,
  getCurrentTimeFormatted
} = require('../../utils/getDateTime')
const { getJsonData } = require('../../utils/getJsonData')
// Json
const distributionJson = getJsonData('distribution.json')
const runningJson = getJsonData('runnigNumber.json')
// Middleware
const errorEndpoint = require('../../middleware/errorEndpoint')
const path = require('path')
const { fetchDistributionPolicy } = require('../../services/policyService')
const currentFilePath = path.basename(__filename)

exports.insertHead = async (req, res, next) => {
  let transaction
  try {
    const distributions = req.body
    // console.log(distributions)
    const responses = []
    const failedDistributions = []
    for (let distribution of distributions) {
      const {
        orderType,
        tranferDate,
        warehouse,
        towarehouse,
        location,
        statusLow,
        statusHigh,
        remark,
        Hcase,
        MGNUGL,
        MGDEPT,
        routeCode,
        addressCode
      } = distribution

      const items = distribution.items
      let { orderNo } = distribution
      const calWeights = []
      try {
        transaction = await sequelize.transaction()
        for (let item of items) {
          const itemFactor = await fetchItemFactor(item.itemCode, item.itemUnit)
          const weight = await fetchCalWeight({
            itemCode: item.itemCode,
            qty: itemFactor.factor * item.itemQty
          })
          calWeights.push(weight)
        }
        const totalgrossWeight = calWeights.reduce((accumulator, calWeight) => {
          return accumulator + calWeight.grossWeight
        }, 0)

        const totalnetWeight = calWeights.reduce((accumulator, calWeight) => {
          return accumulator + calWeight.netWeight
        }, 0)

        if (Hcase === 0) {
          const checkOrderNo = await MGHEAD.findOne({
            where: {
              orderNo: orderNo
            }
          })
          if (orderNo === '') {
            const error = new Error('Order No is required')
            error.statusCode = 422
            throw error
          }
          if (!checkOrderNo) {
            const error = new Error('Order No is incorrect or not found')
            error.statusCode = 422
            throw error
          }
          const oldDistribution = await MGHEAD.findOne({
            where: {
              orderNo: orderNo
            }
          })
          // res.json(oldDistribution)
          console.log('oldDistribution' + oldDistribution)
          // const newTotalNet = parseInt(oldOrder.totalNet + totalNet)
          // const newTotal = parseInt(oldOrder.total + total)
          // const newtotalCost = parseInt(oldOrder.OACOAM + totalCost)
          // const newNetWeight = parseInt(oldOrder.netWeight + totalnetWeight)
          const newGrossWeight = parseInt(
            oldDistribution.MGGRWE + totalgrossWeight
          )
          const newSumLine = parseInt(oldDistribution.MGNUGL + MGNUGL)
          // console.log('newSumLine' + newSumLine)
          // console.log('newGrossWeight' + newGrossWeight)
          await MGHEAD.update(
            {
              MGGRWE: newGrossWeight.toFixed(3),
              MGNUGL: newSumLine
            },
            {
              where: {
                orderNo: orderNo
              },
              transaction
            }
          )
        }

        const series = await fetchDistributionPolicy(orderType)
        if (series == null) {
          const error = new Error('Order Type is incorrect or not found')
          error.statusCode = 422
          throw error
        }

        if (orderNo == '') {
          orderNo = ''
          const orderNoRunning = await runningNumber(
            {
              coNo: runningJson[0].DISTRIBUTION.coNo,
              series: series.YXNBID,
              seriesType: runningJson[0].DISTRIBUTION.seriesType
            },
            transaction
          )
          orderNo = parseInt(orderNoRunning.lastNo) + 1
          await updateRunningNumber(
            {
              coNo: runningJson[0].DISTRIBUTION.coNo,
              series: series.YXNBID,
              seriesType: runningJson[0].DISTRIBUTION.seriesType,
              lastNo: orderNo
            },
            transaction
          )
          orderNo = orderNo.toString()
          orderNo = orderNo.padStart(10, '0')
        }

        const running = await runningNumber(
          {
            coNo: runningJson[0].DISTRIBUTION_DELIVERY.coNo,
            series: runningJson[0].DISTRIBUTION_DELIVERY.series, //series.OOSPIC,
            seriesType: runningJson[0].DISTRIBUTION_DELIVERY.seriesType // runningJson[0].DELIVERY.seriesType,
          },
          transaction
        )
        const runningNumberH = parseInt(running.lastNo) + 1

        let itemsData = await Promise.all(
          items.map(async item => {
            const weight = await fetchCalWeight({
              itemCode: item.itemCode,
              qty: item.itemQty
            })
            const stock = await fetchStock({
              warehouse: warehouse,
              itemCode: item.itemCode
            })
            const itemDetail = await fetchItemDetails(item.itemCode)
            return {
              coNo: distributionJson[0].HEAD.MGCONO,
              runningNumberH: runningNumberH,
              orderNo: orderNo, //OAORNO
              location: item.location,
              toLocation: item.toLocation,
              warehouse: warehouse,
              towarehouse: towarehouse,
              itemCode: item.itemCode, //OQDLIX
              itemName: itemDetail[0].itemDescription, //OAORTP
              itemTranferDate: tranferDate, //OQDQTY
              itemQty: item.itemQty, //OAORSL
              itemUnit: itemDetail[0].basicUnit, //OAORDT
              itemLocation: item.itemLocation, //OARLDT
              itemLot: item.itemLot,
              itemStatus: item.itemStatus,
              MRWHLO: item.MRWHLO,
              MRGRWE: weight.grossWeight,
              MRNEWE: weight.netWeight,
              MRSTAS: stock[0].allocateMethod
            }
          })
        )

        let itemNo = 1
        itemsData = itemsData.map(item => {
          const result = {
            ...item, // Spread the properties of the original item
            itemNo: itemNo // Add the itemNo property
          }
          itemNo++
          return result
        })
        let itemNoData = await MGLINE.findOne({
          where: {
            orderNo: orderNo
          },
          order: [['itemNo', 'DESC']]
        })

        if (itemNoData != null) {
          itemNo = itemNoData.itemNo + 1
          itemsData = itemsData.map(item => {
            const result = {
              ...item, // Spread the properties of the original item
              itemNo: itemNo // Add the itemNo property
            }
            itemNo++
            return result
          })
        }
        await updateRunningNumber(
          {
            coNo: runningJson[0].DISTRIBUTION_DELIVERY.coNo,
            series: runningJson[0].DISTRIBUTION_DELIVERY.series,
            seriesType: runningJson[0].DISTRIBUTION_DELIVERY.seriesType,
            lastNo: runningNumberH
          },
          transaction
        )
        if (Hcase == 1) {
          await MGHEAD.create(
            {
              coNo: distributionJson[0].HEAD.MGCONO,
              orderNo: orderNo,
              MGRORN: orderNo,
              orderType: orderType,
              tranferDate: tranferDate,
              MGRIDT: tranferDate,
              MGATHS: distributionJson[0].HEAD.MGATHS,
              warehouse: warehouse,
              towarehouse: towarehouse,
              location: location,
              statusLow: statusLow,
              statusHigh: statusHigh,
              remark: remark,
              MGFACI: distributionJson[0].HEAD.MGFACI,
              MGRESP: distributionJson[0].HEAD.MGCHID,
              MGDEPT: MGDEPT,
              MGPRIO: distributionJson[0].HEAD.MGPRIO,
              MGTRTM: parseInt(getCurrentTimeFormatted()),
              MGRITM: getCurrentTimeFormatted().slice(0, -2),
              MGGRWE: totalgrossWeight.toFixed(3),
              MGNUGL: MGNUGL,
              MGRGDT: formatDate(),
              MGRGTM: getCurrentTimeFormatted(),
              MGLMDT: formatDate(),
              MGCHNO: distributionJson[0].HEAD.MGCHNO,
              MGCHID: distributionJson[0].HEAD.MGCHID,
              MGLMTS: Date.now()
            },
            { transaction }
          )
          await insertAddress(orderNo, addressCode, transaction)
        }
        const deliveryHead = {
          warehouse: warehouse,
          coNo: distributionJson[0].HEAD.MGCONO,
          runningNumberH: runningNumberH,
          orderNo: orderNo,
          orderType: orderType,
          grossWeight: totalgrossWeight.toFixed(3),
          tranferDate: tranferDate,
          towarehouse: towarehouse,
          netWeight: totalnetWeight.toFixed(3),
          routeCode: routeCode
        }
        await distributionDeliveryLine(itemsData, transaction)
        await distributionAllocate(itemsData, orderType, transaction)
        await distributionDeliveryHead(deliveryHead, transaction)
        await insertLine(itemsData, transaction)

        // const route = await fetchRouteCode(routeCode);
        responses.push({
          orderNo: orderNo,
          status: Hcase === 1 ? 'Distribution Created' : 'Distribution Updated'
        })
        await transaction.commit()
        // res.json(data);
      } catch (distributionError) {
        await transaction.rollback()
        failedDistributions.push({
          orderNo: orderNo,
          error: distributionError.message
        })
      }
    }
    // Send a combined response
    res.status(207).json({
      message: 'Partial Success',
      successfulDistributions: responses,
      failedDistributions: failedDistributions
    })
    console.log({
      message: 'Partial Success',
      successfulDistributions: responses,
      failedDistributions: failedDistributions
    })
  } catch (error) {
    next(error)
  }
}
// insert Line
insertLine = async (data, transaction) => {
  try {
    const items = data
    // const orderNo = req.body.orderNo;
    for (let item of items) {
      await MGLINE.create(
        {
          coNo: item.coNo,
          orderNo: item.orderNo,
          itemNo: item.itemNo,
          itemCode: item.itemCode,
          itemName: item.itemName,
          itemQty: item.itemQty,
          itemUnit: item.itemUnit,
          itemLocation: item.itemLocation, //MRWHSL
          itemLot: item.itemLot, //MRBANO
          itemStatus: item.itemStatus,
          MRWHLO: item.warehouse,
          MRGRWE: item.MRGRWE,
          MRTRDT: item.itemTranferDate,
          MRRPDT: item.itemTranferDate,
          MRSTAS: item.MRSTAS,
          MRWHSL: item.location,
          MRTWSL: item.toLocation,
          // MRRPQT: item.itemQty,
          // MRACQT: item.itemQty,
          MRSTCD: distributionJson[0].LINE.MRSTCD,
          MRCUCD: distributionJson[0].LINE.MRCUCD,
          // MRPRDT: formatDate(),
          MRNUCR: distributionJson[0].LINE.MRNUCR,
          MRRORN: item.orderNo,
          MRRESP: distributionJson[0].LINE.MRCHID,
          MRTIHM: getCurrentTimeFormatted().slice(0, -2),
          MRRGDT: formatDate(),
          MRRGTM: getCurrentTimeFormatted(),
          MRLMDT: formatDate(),
          MRCHNO: distributionJson[0].LINE.MRCHNO,
          MRCHID: distributionJson[0].LINE.MRCHID,
          MRLMTS: Date.now(),
          MRPRIO: distributionJson[0].LINE.MRPRIO
        },
        { transaction }
      )
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'Distribution Line', error)
  }
}

insertAddress = async (orderNo, addressCode, transaction) => {
  try {
    const address = await fetchDistributionAddress(addressCode)
    await MGDADR.create(
      {
        coNo: 410,
        orderNo: orderNo,
        MAADK1: addressCode,
        MASUNO: '',
        MAADID: '',
        MACONM: address.OACONM,
        MAADR1: address.OAADR1,
        MAADR2: address.OAADR2,
        MAADR3: address.OAADR3,
        MAADR4: address.OAADR4,
        MAPONO: address.OAPONO,
        MACSCD: address.OACSCD,
        MAADVI: '',
        MAOREF: '',
        MAYREF: '',
        MATXID: address.OATXID,
        MATOWN: '',
        MAECAR: address.OAECAR,
        MARGDT: formatDate(),
        MARGTM: getCurrentTimeFormatted(),
        MALMDT: formatDate(),
        MACHNO: 0,
        MACHID: ''
      },
      { transaction }
    )
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'Distribution insertAddresss:', error)
  }
}
