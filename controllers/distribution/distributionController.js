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
  const distributions = req.body;
  const responses = [];
  const failedDistributions = [];
  let transaction;

  try {
    // ใช้ transaction เดียวครอบทั้ง batch
    transaction = await sequelize.transaction();

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
        addressCode,
        items,
        orderNo: originalOrderNo,
      } = distribution;

      let orderNo = originalOrderNo;
      const calWeights = [];

      // --- คำนวณน้ำหนัก ---
      for (let item of items) {
        // console.log(item.itemCode)
        const itemFactor = await fetchItemFactor(item.itemCode, item.itemUnit);
        const weight = await fetchCalWeight({
          itemCode: item.itemCode,
          qty: item.itemQty
        });
        calWeights.push(weight);
      }
      const totalgrossWeight = calWeights.reduce((acc, w) => acc + w.grossWeight, 0);
      const totalnetWeight = calWeights.reduce((acc, w) => acc + w.netWeight, 0);

      // console.log("totalgrossWeight",totalgrossWeight)
      // console.log("totalnetWeight",totalnetWeight)
      // --- Hcase === 0 ---
      if (Hcase === 0) {
        if (!orderNo || orderNo === '') {
          throw new Error('Order No is required');
        }
        const checkOrderNo = await MGHEAD.findOne({ where: { orderNo } });
        if (!checkOrderNo) {
          throw new Error('Order No is incorrect or not found');
        }
        const oldDistribution = await MGHEAD.findOne({ where: { orderNo } });
        const newGrossWeight = parseInt(oldDistribution.MGGRWE + totalgrossWeight);
        const newSumLine = parseInt(oldDistribution.MGNUGL + MGNUGL);
        await MGHEAD.update(
          {
            MGGRWE: newGrossWeight.toFixed(3),
            MGNUGL: newSumLine
          },
          {
            where: { orderNo },
            transaction
          }
        );
      }

      // --- ตรวจสอบ policy ---
      const series = await fetchDistributionPolicy(orderType);
      if (!series) throw new Error('Order Type is incorrect or not found');

      // --- gen orderNo ถ้าจำเป็น ---
      if (!orderNo || orderNo === '') {
        const orderNoRunning = await runningNumber(
          {
            coNo: runningJson[0].DISTRIBUTION.coNo,
            series: series.YXNBID,
            seriesType: runningJson[0].DISTRIBUTION.seriesType
          },
          transaction
        );
        orderNo = (parseInt(orderNoRunning.lastNo) + 1).toString().padStart(10, '0');
        await updateRunningNumber(
          {
            coNo: runningJson[0].DISTRIBUTION.coNo,
            series: series.YXNBID,
            seriesType: runningJson[0].DISTRIBUTION.seriesType,
            lastNo: orderNo
          },
          transaction
        );
      }

      // --- running number delivery ---
      const running = await runningNumber(
        {
          coNo: runningJson[0].DISTRIBUTION_DELIVERY.coNo,
          series: runningJson[0].DISTRIBUTION_DELIVERY.series,
          seriesType: runningJson[0].DISTRIBUTION_DELIVERY.seriesType,
        },
        transaction
      );
      const runningNumberH = parseInt(running.lastNo) + 1;

      // --- สร้าง itemsData ---
      let itemsData = await Promise.all(
        items.map(async item => {
          const weight = await fetchCalWeight({
            itemCode: item.itemCode,
            qty: item.itemQty
          });
          // console.log("item.itemCode",item.itemCode)
          const stock = await fetchStock({
            warehouse: warehouse,
            itemCode: item.itemCode
          });
          // console.log(stock)
          const itemDetail = await fetchItemDetails(item.itemCode);
          return {
            coNo: distributionJson[0].HEAD.MGCONO,
            runningNumberH,
            orderNo,
            location: item.location,
            toLocation: item.toLocation,
            warehouse,
            towarehouse,
            itemCode: item.itemCode,
            itemName: itemDetail[0].itemDescription,
            itemTranferDate: tranferDate,
            itemQty: item.itemQty,
            // itemUnit: itemDetail[0].basicUnit,
            itemUnit: item.itemUnit,
            itemLocation: item.itemLocation,
            itemLot: item.itemLot,
            itemStatus: item.itemStatus,
            MRWHLO: item.MRWHLO,
            MRGRWE: weight.grossWeight,
            MRNEWE: weight.netWeight,
            MRSTAS: stock[0].allocateMethod 
          }
        })
      );

      // --- กำหนด itemNo ---
      let itemNo = 1;
      let itemNoData = await MGLINE.findOne({
        where: { orderNo },
        order: [['itemNo', 'DESC']]
      });
      if (itemNoData) itemNo = itemNoData.itemNo + 1;
      itemsData = itemsData.map(item => ({ ...item, itemNo: itemNo++ }));

      await updateRunningNumber(
        {
          coNo: runningJson[0].DISTRIBUTION_DELIVERY.coNo,
          series: runningJson[0].DISTRIBUTION_DELIVERY.series,
          seriesType: runningJson[0].DISTRIBUTION_DELIVERY.seriesType,
          lastNo: runningNumberH
        },
        transaction
      );

      // --- Create MGHEAD (Hcase == 1) ---
      if (Hcase == 1) {
        await MGHEAD.create(
          {
            coNo: distributionJson[0].HEAD.MGCONO,
            orderNo,
            MGRORN: orderNo,
            orderType,
            tranferDate,
            MGRIDT: tranferDate,
            MGATHS: distributionJson[0].HEAD.MGATHS,
            warehouse,
            towarehouse,
            location,
            statusLow,
            statusHigh,
            remark,
            MGFACI: distributionJson[0].HEAD.MGFACI,
            MGRESP: distributionJson[0].HEAD.MGCHID,
            MGDEPT,
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
        );
        await insertAddress(orderNo, addressCode, transaction);
      }

      // console.log("itemsData",itemsData)
      // --- Delivery, Allocate, Line ---

      // console.log("totalgrossWeight.toFixed(3)",totalgrossWeight.toFixed(3))
      const deliveryHead = {
        warehouse,
        coNo: distributionJson[0].HEAD.MGCONO,
        runningNumberH,
        orderNo,
        orderType,
        grossWeight: totalgrossWeight.toFixed(3),
        tranferDate,
        towarehouse,
        netWeight: totalnetWeight.toFixed(3),
        routeCode
      }
      await distributionDeliveryLine(itemsData, transaction);
      await distributionAllocate(itemsData, orderType, transaction);
      await distributionDeliveryHead(deliveryHead, transaction);
      await insertLine(itemsData, transaction);

      // --- Success ---
      responses.push({
        orderNo,
        status: Hcase === 1 ? 'Distribution Created' : 'Distribution Updated'
      });
    }

    // ไม่มี error ใน batch, commit ได้เลย
    await transaction.commit();

    return res.status(200).json({
      message: 'All distributions successful',
      successfulDistributions: responses,
      failedDistributions: []
    });

  } catch (error) {
    // ถ้ามี error ตรงไหน, rollback ทันที และ return error
    if (transaction) await transaction.rollback();
    failedDistributions.push({
      error: error.original?.message || error.message || JSON.stringify(error),
      stage: 'batch'
    });
    return res.status(500).json({
      message: 'All distributions failed and rolled back',
      successfulDistributions: [],
      failedDistributions
    });
  }
};

// insert Line
insertLine = async (data, transaction) => {
  try {
    const items = data
    // const orderNo = req.body.orderNo;
    for (let item of items) {
      // console.log("itemNo",item.itemCode)
      // console.log("MRGRWE",item.MRGRWE)
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
          // MRRPDT: item.itemTranferDate,
          MRRPDT: 0,
          // MRSTAS: item.MRSTAS,
          MRSTAS: 2,
          MRWHSL: item.location,
          MRTWSL: item.toLocation,
          // MRRPQT: item.itemQty,
          // MRACQT: item.itemQty,
          MRSTCD: distributionJson[0].LINE.MRSTCD,
          MRCUCD: distributionJson[0].LINE.MRCUCD,
          // MRPRDT: formatDate(),
          // MRNUCR: distributionJson[0].LINE.MRNUCR,
          MRNUCR: 2,
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
        MACONM: address.OACONM?? '',
        MAADR1: address.OAADR1?? '',
        MAADR2: address.OAADR2?? '',
        MAADR3: address.OAADR3?? '',
        MAADR4: address.OAADR4?? '',
        MAPONO: address.OAPONO?? '',
        MACSCD: address.OACSCD?? '',
        MAADVI: '',
        MAOREF: '',
        MAYREF: '',
        MATXID: address.OATXID?? '',
        MATOWN: '',
        MAECAR: address.OAECAR?? '',
        MARGDT: formatDate(),
        MARGTM: getCurrentTimeFormatted(),
        MALMDT: formatDate(),
        MACHNO: 0,
        MACHID: ''
      },
      { transaction }
    )
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'Distribution :', error)
  }
}
