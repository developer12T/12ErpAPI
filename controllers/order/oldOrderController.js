const { OrderLine, Order } = require("../../models/order");
const Promotion = require("../../models/promotion");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { Op } = require("sequelize");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const Shipping = require("../../models/shipping");
const { validationResult } = require("express-validator");
const {
  fetchOrderType,
  fetchOrderNoRunning,
  fetchRunningNumber,
  updateRunningNumber,
  calCost,
  calWeight,
  fetchfactor,
  fetchItemUnitMax,
  fetchItemUnitMin,
  fetchItemDetail,
} = require("../../middleware/apiMaster");
const {
  fetchCustomer,
  fetchShipping,
} = require("../../middleware/apiCustomer");
const {
  insertAllocate,
  insertOrderLine,
  insertDeliveryHead,
  insertDeliveryLine,
  insertPrepareInovoice,
  insertDocument,
} = require("../../middleware/apiOrder");
const { fetchRoutes } = require("../../middleware/apiRoutes");
const { getJsonData } = require("../../middleware/getJsonData");
const { nonVat } = require("../../middleware/calVat");
// Get the current year and month
const { getCurrentYearMonth } = require("../../middleware/getDateTime");

exports.index = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    let { orderDate } = req.body;

    if (orderDate == "") {
      orderDate = `${getCurrentYearMonth()}`;
    }
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderType: orderType,
        orderDate: {
          [Op.like]: `${orderDate}%`,
        },
        // orderNo:orderNo
      },
    });

    // Object to hold OrderLinearr for each orderNo
    const orderLineData = {};
    const promotionData = {};

    for (let i = 0; i < orderData.length; i++) {
      const OrderLineData = await OrderLine.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderData[i].orderNo },
      });
      // Initialize the array for current orderNo
      orderLineData[orderData[i].orderNo] = [];

      for (let j = 0; j < OrderLineData.length; j++) {
        orderLineData[orderData[i].orderNo].push({
          productNumber: OrderLineData[j].productNumber,
          itemCode: OrderLineData[j].itemCode,
          itemName: OrderLineData[j].itemName,
          qtyCTN: OrderLineData[j].qtyCTN,
          unit: OrderLineData[j].unit,
          price: OrderLineData[j].price,
          discount: OrderLineData[j].discount,
          netPrice: OrderLineData[j].netPrice,
          total: OrderLineData[j].total,
          promotionCode: OrderLineData[j].promotionCode,
        });
      }

      const OrderLineData2 = await OrderLine.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          orderNo: orderData[i].orderNo,
          promotionCode: {
            [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
          },
        },
      });

      promotionData[orderData[i].orderNo] = [];

      for (let OrderLine2 of OrderLineData2) {
        const PromotionData = await Promotion.findAll({
          attributes: {
            exclude: ["id"],
          },
          where: {
            promotionCode: OrderLine2.promotionCode,
            FZCONO: "410",
          },
        });

        if (PromotionData.length > 0) {
          promotionData[orderData[i].orderNo].push({
            promotionCode: OrderLine2.promotionCode,
            promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
          });
        } else {
          console.log(
            `No promotion data found for ${OrderLine2.promotionCode}`
          );
          promotionData[orderData[i].orderNo].push({
            promotionCode: OrderLine2.promotionCode,
            promotionName: null, // Or handle as needed if no data is found
          });
        }
      }
    }

    // If you want to keep all OrderLine data in a single array as well
    // OrderLinearr = Object.values(orderLineData).flat();

    const orders = orderData.map((order) => {
      const orderNo = order.orderNo.trim();
      const customerNo = order.customerNo.trim();
      const OrderLinearr = orderLineData[orderNo] || [];
      const OrderLine = OrderLinearr.map((OrderLine) => {
        const promotion = promotionData[orderNo].find(
          (promo) => promo.promotionCode === OrderLine.promotionCode
        );
        const itemName = OrderLine.itemName.trim();
        const itemCode = OrderLine.itemCode.trim();
        const promotionCode = OrderLine.promotionCode.trim();
        return {
          productNumber: OrderLine.productNumber,
          itemCode: itemCode,
          itemName: itemName,
          qtyCTN: OrderLine.qtyCTN,
          unit: OrderLine.unit,
          price: OrderLine.price,
          discount: OrderLine.discount,
          netPrice: OrderLine.netPrice,
          total: OrderLine.total,
          promotionCode: promotionCode,
          promotionName: promotion ? promotion.promotionName : "",
        };
      });

      return {
        orderDate: order.orderDate,
        requestDate: order.requestDate,
        customerNo: customerNo,
        orderNo: orderNo,
        orderType: order.orderType,
        warehouse: order.warehouse,
        orderStatusLow: order.orderStatusLow,
        total: order.total,
        totalNet: order.totalNet,
        totalVat: order.totalVat,
        totalNonVat: order.totalNonVat,
        totalDiscount: order.totalDiscount,
        item: OrderLine,
      };
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.single = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    let OrderLinearr = [];
    let promotionArr = [];
    let shippingarr = [];
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderNo: orderNo,
      },
    });

    for (let i = 0; i < orderData.length; i++) {
      const OrderLineData = await OrderLine.findAll({
        where: { orderNo: orderNo },
      });

      for (let i = 0; i < OrderLineData.length; i++) {
        OrderLinearr.push({
          productNumber: OrderLineData[i].productNumber,
          itemCode: OrderLineData[i].itemCode,
          itemName: OrderLineData[i].itemName,
          qtyCTN: OrderLineData[i].qtyCTN,
          unit: OrderLineData[i].unit,
          price: OrderLineData[i].price,
          discount: OrderLineData[i].discount,
          netPrice: OrderLineData[i].netPrice,
          total: OrderLineData[i].total,
          promotionCode: OrderLineData[i].promotionCode,
        });
      }

      const ShippingData = await Shipping.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          // addressID: orderData[i].addressID,
          customerNo: orderData[i].customerNo,
          coNo: "410",
        },
      });

      for (let shipping of ShippingData) {
        shippingarr.push({
          addressID: shipping.addressID,
          customerName: shipping.customerName,
          shippingAddress1: shipping.shippingAddress1,
          shippingAddress2: shipping.shippingAddress2,
          shippingAddress3: shipping.shippingAddress3,
          shippingPoscode: shipping.shippingPoscode.trim(),
          shippingPhone: shipping.shippingPhone.trim(),
        });
      }
    }
    const OrderLineData2 = await OrderLine.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderNo: orderNo,
        promotionCode: {
          [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
        },
      },
      // group: ["promotionCode"],
    });

    for (let OrderLine2 of OrderLineData2) {
      const PromotionData = await Promotion.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          promotionCode: OrderLine2.promotionCode,
          FZCONO: "410",
        },
      });

      if (PromotionData.length > 0) {
        promotionArr.push({
          promotionCode: OrderLine2.promotionCode,
          promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
        });
      } else {
        console.log(`No promotion data found for ${OrderLine2.promotionCode}`);
        promotionArr.push({
          promotionCode: OrderLine2.promotionCode,
          promotionName: null, // Or handle as needed if no data is found
        });
      }
    }

    // res.json(promotionArr);

    const OrderLineData = OrderLinearr.map((OrderLine) => {
      let promotionNameC = "";
      for (let i = 0; i < promotionArr.length; i++) {
        if (OrderLine.promotionCode == promotionArr[i].promotionCode) {
          promotionNameC = promotionArr[i].promotionName;
        }
      }
      const itemCode = OrderLine.itemCode.trim();
      const promotionCode = OrderLine.promotionCode.trim();
      return {
        productNumber: OrderLine.productNumber,
        itemCode: itemCode,
        itemName: OrderLine.itemName,
        qtyCTN: OrderLine.qtyCTN,
        unit: OrderLine.unit,
        price: OrderLine.price,
        discount: OrderLine.discount,
        netPrice: OrderLine.netPrice,
        total: OrderLine.total,
        promotionCode: promotionCode,
        promotionName: promotionNameC,
      };
    });

    const orders = orderData.map((order) => {
      const customer = order.customerNo.trim();
      const orderNo = order.customerNo.trim();
      return {
        orderDate: order.orderDate,
        requestDate: order.requestDate,
        customerNo: customer,
        orderNo: orderNo,
        orderType: order.orderType,
        warehouse: order.warehouse,
        orderStatusLow: order.orderStatusLow,
        total: order.total,
        totalNet: order.totalNet,
        totalVat: order.totalVat,
        totalNonVat: order.totalNonVat,
        totalDiscount: order.totalDiscount,
        item: OrderLineData,
        shipping: shippingarr,
      };
    });
    res.json(orders);
    // res.json(PromotionData);
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const {
      Hcase,
      orderDate,
      requestDate,
      customerNo,
      orderType,
      warehouse,
      orderStatusLow,
      orderStatusHigh,
      total,
      totalNet,
      addressID,
      payer,
      OAFRE1,
      ref,
      note,
    } = req.body;
    let { orderNo } = req.body;

    if (Hcase === 0) {
      if (orderNo === "") {
        const error = new Error("Order No is required");
        error.statusCode = 422;
        throw error;
      }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is Incorrect");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    const series = await fetchOrderType(orderType);

    const items = req.body.item;

    // console.log(orderStatusLow);
    const orderJson = getJsonData("order.json");
    const RunningJson = getJsonData("runnigNumber.json");

    if (orderNo == "") {
      orderNo = "";
      const orderNoRunning = await fetchRunningNumber({
        coNo: RunningJson[0].CO.coNo,
        series: series.OOOT05,
        seriesType: RunningJson[0].CO.seriesType,
      });

      orderNo = parseInt(orderNoRunning.lastNo) + 1;
      await updateRunningNumber({
        coNo: RunningJson[0].CO.coNo,
        series: series.OOOT05,
        seriesType: RunningJson[0].CO.seriesType,
        lastNo: orderNo,
      });
      orderNo = orderNo.toString();
    }
    // res.json(orderNo);

    // res.json(orderJson);
    // console.log(orderJson);

    const running = await fetchRunningNumber({
      coNo: RunningJson[0].DELIVERY.coNo,
      series: series.OOSPIC,
      seriesType: RunningJson[0].DELIVERY.seriesType,
    });

    const runningNumberH = parseInt(running.lastNo) + 1;
    await updateRunningNumber({
      coNo: RunningJson[0].DELIVERY.coNo,
      series: series.OOSPIC,
      seriesType: RunningJson[0].DELIVERY.seriesType,
      lastNo: runningNumberH,
    });
    // res.status(200).json(runningNumberH);

    const calWeights = [];
    const calCosts = [];

    for (let item of items) {
      const Weight = await calWeight({
        itemCode: item.itemCode,
        qty: item.qtyPCS,
      });
      const Cost = await calCost({
        itemCode: item.itemCode,
        qty: item.qtyPCS,
      });
      calWeights.push(Weight);
      calCosts.push(Cost);
    }
    const totalCost = calCosts.reduce((accumulator, calCost) => {
      return accumulator + calCost.cost;
    }, 0);

    const totalgrossWeight = calWeights.reduce((accumulator, calWeight) => {
      return accumulator + calWeight.grossWeight;
    }, 0);

    const totalnetWeight = calWeights.reduce((accumulator, calWeight) => {
      return accumulator + calWeight.netWeight;
    }, 0);

    // res.json(totalCost);

    let itemsData = await Promise.all(
      items.map(async (item) => {
        const itemUnitMinData = await fetchItemUnitMin(item.itemCode);
        const itemUnitMaxData = await fetchItemUnitMax(item.itemCode);
        const itemDetail = await fetchItemDetail(item.itemCode);
        const shinpping = await fetchShipping({
          customerNo: customerNo,
          addressID: addressID,
        });
        const route = await fetchRoutes(shinpping.shippingRoute);
        const customer = await fetchCustomer(customerNo);
        const WeightAll = await calWeight({
          itemCode: item.itemCode,
          qty: item.qtyPCS,
        });
        const Weight = await calWeight({
          itemCode: item.itemCode,
          qty: 1,
        });
        const factor = await fetchfactor({
          itemCode: item.itemCode,
          unit: item.unit,
        });
        const Cost = await calCost({
          itemCode: item.itemCode,
          qty: 1,
        });
        const CostAll = await calCost({
          itemCode: item.itemCode,
          qty: item.qtyPCS,
        });
        return {
          coNo: orderJson[0].LINE.OBCONO,
          OACUCD: customer.OKCUCD,
          OBDIVI: orderJson[0].LINE.OBDIVI,
          OBORCO: orderJson[0].LINE.OBORCO,
          orderNo: orderNo, //OAORNO
          OKALCU: customer.OKALCU,
          runningNumberH: runningNumberH, //OQDLIX
          orderType: orderType, //OAORTP
          orderStatusLow: orderStatusLow, //OAORSL
          orderDate: orderDate, //OAORDT
          requestDate: requestDate, //OARLDT
          OAFRE1: OAFRE1,
          payer: payer,
          itemCode: item.itemCode,
          itemNo: item.itemNo,
          itemName: itemDetail[0].itemName,
          OBITDS: itemDetail[0].MMITDS,
          qtyPCS: item.qtyPCS,
          qtyCTN: item.qtyCTN,
          unit: item.unit,
          price: item.price,
          discount: item.discount,
          netPrice: item.netPrice,
          total: item.total,
          netWeight: WeightAll.netWeight,
          grossWeight: WeightAll.grossWeight,
          promotionCode: item.promotionCode,
          warehouse: warehouse,
          customerNo: customerNo,
          // customerChannel: customerChannel,
          addressID: addressID,
          MOPLDT: formatDate(),
          MOTIHM: orderJson[0].LINE.OBPLHM,
          MOPRIO: orderJson[0].LINE.OBPRIO,
          OBCOFA: factor.factor,
          OBUCOS: Cost.cost,
          costPCS: CostAll.cost,
          OBLNAM: item.total,
          grossWeightSingle: Weight.grossWeight,
          netWeightSingle: Weight.netWeight,
          OBSPUN: itemUnitMaxData.unit,
          OBPRMO: orderJson[0].LINE.OBPRMO,
          OBDIC1: orderJson[0].LINE.OBDIC1,
          OBDIC2: item.discount !== 0 ? 8 : 1,
          OBDIC3: orderJson[0].LINE.OBDIC3,
          OBDIC4: orderJson[0].LINE.OBDIC4,
          OBDIC5: item.promotionCode === "" ? 1 : 6,
          OBDIC6: orderJson[0].LINE.OBDIC6,
          OBCMP5: item.promotionCode,
          OBDIBE: item.promotionCode !== "" ? 4 : "",
          OBDIRE: item.promotionCode !== "" ? 0 : "",
          OBDDSU: item.promotionCode !== "" ? 1 : 0,
          OBACRF: item.promotionCode !== "" ? 0 : "",
          OBDWDT: requestDate,
          OBCODT: requestDate,
          OBCOHM: route.departureTime,
          OBDWDZ: requestDate,
          OBCODZ: requestDate,
          OBTIZO: orderJson[0].LINE.OBTIZO, // Check Data ?
          OBSTCD: orderJson[0].LINE.OBSTCD,
          OBCOCD: itemUnitMaxData.factor,
          OBUCCD: orderJson[0].LINE.OBUCCD,
          OBVTCD: orderJson[0].LINE.OBVTCD,
          OBSMCD: customer.saleCode, // SaleCode
          OBCUNO: customerNo, // Customer Code
          OBADID: addressID, // Address ID
          OBROUT: route.routeCode, // Route
          OBRODN: route.routeDeparture,
          OBDSDT: 1, // Check Data ?
          OBDSHM: route.departureTime,
          OBFDED: 1, // Check Data ?
          OBLDED: 1, // Check Data ?
          OBCINA: 1, // Check Data ?
          OBDECU: customerNo,
          OBTEPY: customer.creditTerm,
          OBPMOR: 1, // Check Data ?
          OBUPAV: 1, // Check Data ?
          customerChannel: customer.customerChannel,
          OUSTUN: itemUnitMinData.unit,
          OUITGR: itemDetail[0].MMITGR,
          itemType: itemDetail[0].itemType,
          OUITCL: itemDetail[0].MMITCL,
        };
      })
    );

    let itemNo = 1;
    // let itemNo2 = 1;
    itemsData = itemsData.map((item) => {
      const result = {
        ...item, // Spread the properties of the original item
        itemNo: itemNo, // Add the itemNo property
      };
      itemNo++;
      return result;
    });

    let itemNoData = await OrderLine.findOne({
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

    // res.status(201).json(itemsData);

    if (Hcase === 1) {
      const customer = await fetchCustomer(customerNo);
      await Order.create({
        coNo: orderJson[0].HEAD.OACONO, // OACONO,
        OADIVI: orderJson[0].HEAD.OADIVI, // OADIVI
        orderNo: orderNo, // OAORNO
        orderType: orderType, // OAORTP
        OAFACI: customer.OKFACI, // OAFACI
        warehouse: warehouse, // OAWHLO
        orderStatusLow: orderStatusLow, // OAORSL
        orderStatusHigh: orderStatusHigh, // OAORST
        // OAORSL: orderStatusLow, // OAORSL
        customerNo: customerNo, // OACUNO
        orderDate: orderDate, // OAORDT
        OACUDT: formatDate(), // OACUDT
        requestDate: requestDate, // OARLDT
        OARLDZ: requestDate,
        OATIZO: orderJson[0].HEAD.OATIZO, // OATIZO
        OAOPRI: orderJson[0].HEAD.OAOPRI, // OAOPRI
        OAAICD: orderJson[0].HEAD.OAAICD,
        OAOT38: orderJson[0].HEAD.OAOT38,
        OALNCD: orderJson[0].HEAD.OALNCD,
        OATEPY: customer.creditTerm, // OATEPY
        OAMODL: customer.OKMODL, // OAMODL
        OATEDL: customer.OKTEDL, // OATEDL
        addressID: addressID, // OAADID
        OASMCD: customer.saleCode,
        OAOREF: ref,
        OAYREF: note,
        OAVRCD: orderJson[0].HEAD.OAVRCD,
        OAFRE1: OAFRE1,
        OAPYNO: customer.salePayer,
        OAINRC: customer.OKINRC,
        OAPYCD: customer.OKPYCD,
        OADISY: orderJson[0].HEAD.OADISY, // *** Conditional
        OATINC: orderJson[0].HEAD.OATINC,
        OALOCD: customer.OKCUCD,
        OACUCD: customer.OKCUCD, // OACUCD
        OADCCD: orderJson[0].HEAD.OADCCD, // OADCCD
        OACRTP: 1, // *** Conditional
        OADMCU: orderJson[0].HEAD.OADMCU,
        grossWeight: totalgrossWeight,
        netWeight: totalnetWeight,
        OACOAM: totalCost,
        total: total, // OABRLA
        OANTAM: totalNet,
        totalNet: totalNet, // OANTLA
        OABRAM: total, // OANTLA
        OAFDED: requestDate,
        OALDED: requestDate,
        OARESP: orderJson[0].HEAD.OACHID,
        OABLRO: nonVat(totalNet),
        OATXAP: orderJson[0].HEAD.OATXAP,
        OARLDZ: formatDate(), // OARLDZ
        OARGDT: formatDate(), // OARGDT
        OARGTM: getCurrentTimeFormatted(), // OARGTM
        OALMDT: formatDate(), // OALMDT
        OACHID: orderJson[0].HEAD.OACHID, // OACHID
        OACHNO: orderJson[0].HEAD.OACHNO, // OACHID
        OALMTS: Date.now(), // OALMTS
        OADECU: customerNo,
      });

      await insertDocument({
        orderType: orderType,
        orderNo: orderNo,
      });
    }
    // res.json(itemsData);
    await insertAllocate(itemsData);
    await insertOrderLine(itemsData);
    await insertDeliveryLine(itemsData);
    await insertPrepareInovoice(itemsData);
    await insertDeliveryHead({
      warehouse: warehouse,
      coNo: 410,
      runningNumberH: runningNumberH,
      orderNo: orderNo,
      orderType: orderType,
      addressID: addressID,
      customerNo: customerNo,
      orderDate: orderDate,
      requestDate: requestDate,
      OARGTM: getCurrentTimeFormatted(),
      OATIZO: orderJson[0].HEAD.OATIZO,
      grossWeight: totalgrossWeight,
      netWeight: totalnetWeight,
    });
    res.status(201).json({
      message: "Created",
      orderNo: orderNo,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleted = async (req, res, next) => {
  try {
    const { orderNo, coNo } = req.body;
    const items = req.body.item;

    const deleted = await Order.update(
      {
        coNo: coNo,
      },
      {
        attributes: { exclude: ["id"] },
        where: {
          orderNo: orderNo,
          coNo: 410,
        },
      }
    );

    const itemsData = items.map((item) => {
      return {
        orderNo: orderNo,
        itemCode: item.itemCode,
        itemNo: item.itemNo,
      };
    });

    await axios({
      method: "post",
      url: `${HOST}order/deleteitem`,
      data: itemsData,
    });
    if (deleted[0] === 1) {
      res.status(202).json({
        message: "Deleted",
      });
    } else {
      res.status(304).json({
        message: "Not Modified",
      });
    }
  } catch (error) {
    next(error);
  }
};
