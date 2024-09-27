const { MGHEAD, MGLINE, MGDADR } = require("../../models/distribution");
// Get the current year and month
const {
  getCurrentYearMonth,
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const {
  fetchRunningNumber,
  updateRunningNumber,
  fetchStock,
  calWeight,
} = require("../../middleware/apiMaster");

const { getJsonData } = require("../../middleware/getJsonData");
const {
  insertDistributionLine,
  insertDistributionMGDADR,
  insertDistributionAllocate,
  insertDistributionDeliveryHead,
  insertDistributionDeliveryLine,
} = require("../../middleware/apiOrder");
const { insert } = require("./allocateDistributionController");
const orderJson = getJsonData("distribution.json");
const runningJson = getJsonData("runnigNumber.json");

exports.index = async (req, res, next) => {
  try {
    const { orderType, date, warehouse, towarehouse } = req.body;
    const orderLineData = {};
    const orderHeadData = await MGHEAD.findAll({
      where: {
        coNo: 410,
        orderType: orderType,
        warehouse: warehouse,
        towarehouse: towarehouse,
        date: date,
      },
    });
    // res.json(orderHeadData);

    for (let i = 0; i < orderHeadData.length; i++) {
      const orderLines = await MGLINE.findAll({
        where: { orderNo: orderHeadData[i].orderNo },
      });
      // Initialize the array for current orderNo
      orderLineData[orderHeadData[i].orderNo] = [];
      // console.log(orderLineData);

      for (let j = 0; j < orderLines.length; j++) {
        orderLineData[orderHeadData[i].orderNo].push({
          itemNo: orderLines[j].itemNo,
          itemCode: orderLines[j].itemCode.trim(),
          itemName: orderLines[j].itemName,
          itemQty: orderLines[j].itemQty,
          itemUnit: orderLines[j].itemUnit.trim(),
          itemLocation: orderLines[j].itemLocation.trim(),
          itemLot: orderLines[j].itemLot.trim(),
          itemStatus: orderLines[j].itemStatus,
        });
      }
    }
    // res.json(orderLineData);
    // map oderLineData push into orderHeadData
    // const orders = orderHeadData.forEach((orderHead) => {
    //   orderHead.orderLineData = orderLineData[orderHead.orderNo];
    // });

    const orders = orderHeadData.map((order) => {
      // const orderNo = order.orderNo.trim();
      // const customerNo = order.customerNo.trim();
      const orderLine = orderLineData[order.orderNo] || [];
      return {
        orderNo: order.orderNo,
        orderType: order.orderType,
        date: order.date,
        warehouse: order.warehouse,
        towarehouse: order.towarehouse,
        statusLow: order.statusLow,
        statusHigh: order.statusHigh,
        remark: order.remark,
        items: orderLine,
      };
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.insertHead = async (req, res, next) => {
  try {
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
    } = req.body;

    const items = req.body.items;
    let { orderNo } = req.body;
    const calWeights = [];

    const running = await fetchRunningNumber({
      coNo: runningJson[0].DELIVERY.coNo,
      series: "B", //series.OOSPIC,
      seriesType: "14", // runningJson[0].DELIVERY.seriesType,
    });
    const runningNumberH = parseInt(running.lastNo) + 1;

    if (Hcase === 0) {
      if (orderNo === "") {
        const error = new Error("Order No is required");
        error.statusCode = 422;
        throw error;
      }
    }

    if (orderNo == "") {
      orderNo = "";
      const orderNoRunning = await fetchRunningNumber({
        coNo: 410,
        series: "B",
        seriesType: "14",
      });
      orderNo = parseInt(orderNoRunning.lastNo) + 1;
      orderNo = orderNo.toString();
      orderNo = orderNo.padStart(10, "0");
    }

    updateRunningNumber({
      coNo: 410,
      series: "B",
      seriesType: "14",
      lastNo: orderNo,
    });

    for (let item of items) {
      const weight = await calWeight({
        itemCode: item.itemCode,
        qty: item.itemQty,
      });
      calWeights.push(weight);
    }

    const totalgrossWeight = calWeights.reduce((accumulator, calWeight) => {
      return accumulator + calWeight.grossWeight;
    }, 0);

    // res.json(orderNo);

    let itemsData = await Promise.all(
      items.map(async (item) => {
        const weight = await calWeight({
          itemCode: item.itemCode,
          qty: item.itemQty,
        });
        const stock = fetchStock({
          warehouse: warehouse,
          itemCode: item.itemCode,
        });

        return {
          coNo: 410,
          runningNumberH: runningNumberH,
          orderNo: orderNo, //OAORNO
          warehouse: warehouse, //OARLDT
          itemCode: item.itemCode, //OQDLIX
          itemName: item.itemName, //OAORTP
          itemTranferDate: tranferDate, //OQDQTY
          itemQty: item.itemQty, //OAORSL
          itemUnit: item.itemUnit, //OAORDT
          itemLocation: item.itemLocation, //OARLDT
          itemLot: item.itemLot,
          itemStatus: item.itemStatus,
          warehouse: warehouse,
          towarehouse: towarehouse,
          MRWHLO: item.MRWHLO,
          MRGRWE: weight.grossWeight,
          MRSTAS: stock.allocateMethod,
          MRWHSL: item.MRWHSL,
          MRTWSL: item.MRTWSL,
        };
      })
    );
    // res.json(itemsData);

    let itemNo = 1;
    itemsData = itemsData.map((item) => {
      const result = {
        ...item, // Spread the properties of the original item
        itemNo: itemNo, // Add the itemNo property
      };
      itemNo++;
      return result;
    });
    let itemNoData = await MGLINE.findOne({
      where: {
        orderNo: orderNo,
      },
      order: [["itemNo", "DESC"]],
    });

    if (itemNoData != null) {
      itemNo = itemNoData.itemNo + 1;
      itemsData = itemsData.map((item) => {
        const result = {
          ...item, // Spread the properties of the original item
          itemNo: itemNo, // Add the itemNo property
        };
        itemNo++;
        return result;
      });
    }
    // res.json(itemsData);
    // console.log(getCurrentTimeFormatted());

    if (Hcase == 1) {
      await MGHEAD.create({
        coNo: 410,
        orderNo: orderNo,
        MGRORN: orderNo,
        orderType: orderType,
        tranferDate: tranferDate,
        MGRIDT: tranferDate,
        MGATHS: 1,
        warehouse: warehouse,
        towarehouse: towarehouse,
        location: location,
        statusLow: statusLow,
        statusHigh: statusHigh,
        remark: remark,
        MGFACI: orderJson[0].HEAD.MGFACI,
        MGRESP: orderJson[0].HEAD.MGCHID,
        // MGATHS: 0,
        // MGPRIO: 0,
        MGTRTM: parseInt(getCurrentTimeFormatted()),
        // MGRIDT: formatDate(),
        MGRITM: getCurrentTimeFormatted().slice(0, -2),
        MGGRWE: totalgrossWeight.toFixed(3),
        MGNUGL: 1,
        MGRGDT: formatDate(),
        MGRGTM: getCurrentTimeFormatted(),
        MGLMDT: formatDate(),
        MGCHNO: 1,
        MGCHID: orderJson[0].HEAD.MGCHID,
        MGLMTS: Date.now(),
      });
    }
    const deliveryHead = {
      warehouse: warehouse,
      coNo: 410,
      runningNumberH: runningNumberH,
      orderNo: orderNo,
      orderType: orderType,
      grossWeight: totalgrossWeight.toFixed(3),
      tranferDate: tranferDate,
      towarehouse: towarehouse,
    };

    // const test = {
    //   warehouse: 105,
    //   coNo: 410,
    //   runningNumberH: 6700000075,
    //   orderNo: "6700000073",
    //   orderType: "T01",
    //   grossWeight: 379.656,
    //   transferDate: "20241106",
    //   towarehouse: "513",
    // };

    await insertDistributionAllocate(itemsData);
    await insertDistributionDeliveryHead(deliveryHead);
    await insertDistributionDeliveryLine(itemsData);
    await insertDistributionLine(itemsData);
    await insertDistributionMGDADR(orderNo);

    res.status(201).json({
      orderNo: orderNo,
      // item: itemsData,
      // deliveryHead: deliveryHead,
      message: "Created",
    });
    // res.json(data);
  } catch (error) {
    next(error);
  }
};
// insert Line
exports.insertLine = async (req, res, next) => {
  try {
    const items = req.body.items;
    // const orderNo = req.body.orderNo;
    for (let item of items) {
      await MGLINE.create({
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
        MRWHSL: item.MRWHSL,
        MRTWSL: item.itemLocation,
        MRTRQT: item.itemQty,
        // MRRPQT: item.itemQty,
        // MRACQT: item.itemQty,
        MRSTCD: 1,
        MRCUCD: orderJson[0].LINE.MRCUCD,
        // MRPRDT: formatDate(),
        MRNUCR: 1,
        MRRORN: item.orderNo,
        MRRESP: orderJson[0].LINE.MRCHID,
        MRTIHM: getCurrentTimeFormatted().slice(0, -2),
        MRRGDT: formatDate(),
        MRRGTM: getCurrentTimeFormatted(),
        MRLMDT: formatDate(),
        // MRCHNO: 3,
        MRCHID: orderJson[0].LINE.MRCHID,
        MRLMTS: Date.now(),
        MRPRIO: 5,
      });
    }
    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertMGDADR = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    await MGDADR.create({
      coNo: 410,
      orderNo: orderNo,
      MAADK1: "",
      MASUNO: "",
      MAADID: "",
      MACONM: "",
      MAADR1: "",
      MAADR2: "",
      MAADR3: "",
      MAADR4: "",
      MAPONO: "",
      MACSCD: "",
      MAADVI: "",
      MAOREF: "",
      MAYREF: "",
      MATXID: 0,
      MATOWN: "",
      MAECAR: "",
      MARGDT: formatDate(),
      MARGTM: getCurrentTimeFormatted(),
      MALMDT: formatDate(),
      MACHNO: 0,
      MACHID: "",
    });
    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.type = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
