// Models
const { OrderLine, Order } = require("../../models/order");
const Promotion = require("../../models/promotion");
const Shipping = require("../../models/shipping");
const { sequelize } = require("../../config/m3db");
// Controller
const { orderLineInsert } = require("./orderItemController");
const { prepareInvoiceInsertA } = require("./prepareInvoiceController");
const { documentInsert } = require("./documentController");
const { allocateInsert } = require("./allocateController");
const {
  deliveryHeadInsert,
  deliveryLineInsert,
} = require("./deliveryController");
// Service
const {
  runningNumber,
  updateRunningNumber,
} = require("../../services/runningNumberService");
const { getSeries } = require("../../services/orderService");
const {
  fetchCalCost,
  fetchCalWeight,
  fetchItemDetails,
  fetchItemFactor,
} = require("../../services/itemsService");
const {
  fetchCustomer,
  fetchShipping,
} = require("../../services/customerService");
const { fetchRoute } = require("../../services/routeService");
// Utils
const { formatPhoneNumber } = require("../../utils/String");
const { getJsonData } = require("../../utils/getJsonData");
const { nonVat } = require("../../utils/calVat");
const { getCurrentYearMonth } = require("../../utils/getDateTime");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../utils/getDateTime");
// Sequelize "OR"
const { Op } = require("sequelize");
const { de } = require("date-fns/locale");
// Json
const orderJson = getJsonData("order.json");
const runningJson = getJsonData("runnigNumber.json");
exports.getOrderAll = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    let { orderDate } = req.body;

    if (orderDate == "") {
      orderDate = `${getCurrentYearMonth()}`;
    }
    const orderData = await Order.findAll({
      where: {
        orderType: orderType,
        orderDate: {
          [Op.like]: `${orderDate}%`,
        },
      },
    });

    // Object to hold OrderLinearr for each orderNo
    const orderLineData = {};
    const promotionData = {};

    for (let i = 0; i < orderData.length; i++) {
      const OrderLineData = await OrderLine.findAll({
        where: { orderNo: orderData[i].orderNo },
      });
      // Initialize the array for current orderNo
      orderLineData[orderData[i].orderNo] = [];

      for (let j = 0; j < OrderLineData.length; j++) {
        orderLineData[orderData[i].orderNo].push({
          productNumber: OrderLineData[j].productNumber,
          itemCode: OrderLineData[j].itemCode,
          itemNo: OrderLineData[j].itemNo,
          itemName: OrderLineData[j].itemName,
          qty: OrderLineData[j].qty,
          unit: OrderLineData[j].unit,
          price: OrderLineData[j].price,
          discount: OrderLineData[j].discount,
          netPrice: OrderLineData[j].netPrice,
          total: OrderLineData[j].total,
          promotionCode: OrderLineData[j].promotionCode,
        });
      }

      const OrderLineData2 = await OrderLine.findAll({
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
          itemNo: OrderLine.itemNo,
          itemName: itemName,
          qty: OrderLine.qty,
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

exports.getOrder = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    let OrderLinearr = [];
    let promotionArr = [];
    let shippingarr = [];
    const orderData = await Order.findAll({
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
          itemNo: OrderLineData[i].itemNo,
          itemName: OrderLineData[i].itemName,
          qty: OrderLineData[i].qty,
          unit: OrderLineData[i].unit,
          price: OrderLineData[i].price,
          discount: OrderLineData[i].discount,
          netPrice: OrderLineData[i].netPrice,
          total: OrderLineData[i].total,
          promotionCode: OrderLineData[i].promotionCode,
        });
      }

      const ShippingData = await Shipping.findAll({
        where: {
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
          shippingPhone: formatPhoneNumber(shipping.shippingPhone.trim()),
        });
      }
    }
    const OrderLineData2 = await OrderLine.findAll({
      where: {
        orderNo: orderNo,
        promotionCode: {
          [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: "" }],
        },
      },
    });

    for (let OrderLine2 of OrderLineData2) {
      const PromotionData = await Promotion.findAll({
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
        itemNo: OrderLine.itemNo,
        itemName: OrderLine.itemName,
        qty: OrderLine.qty,
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
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const orders = req.body;
    for (let order of orders) {
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
      } = order;
      let { orderNo } = order;
      const items = order.item;
      const calWeights = [];
      const calCosts = [];

      for (let item of items) {
        const itemFactor = await fetchItemFactor(item.itemCode, item.unit);
        const Weight = await fetchCalWeight({
          itemCode: item.itemCode,
          qty: itemFactor.factor * item.qty,
        });

        const Cost = await fetchCalCost({
          itemCode: item.itemCode,
          qty: itemFactor.factor * item.qty,
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

      if (Hcase === 0) {
        const checkOrderNo = await Order.findOne({
          where: {
            orderNo: orderNo,
          },
        });
        if (orderNo === "") {
          const error = new Error("Order No is required");
          error.statusCode = 422;
          throw error;
        }
        if (!checkOrderNo) {
          const error = new Error("Order No is incorrect or not found");
          error.statusCode = 422;
          throw error;
        }
        const oldOrder = await Order.findOne({
          where: {
            orderNo: orderNo,
          },
        });
        const newTotalNet = parseInt(oldOrder.totalNet + totalNet);
        const newTotal = parseInt(oldOrder.total + total);
        const newtotalCost = parseInt(oldOrder.OACOAM + totalCost);
        const newGrossWeight = parseInt(
          oldOrder.grossWeight + totalgrossWeight
        );
        const newNetWeight = parseInt(oldOrder.netWeight + totalnetWeight);
        await Order.update(
          {
            grossWeight: newGrossWeight.toFixed(3),
            netWeight: newNetWeight.toFixed(3),
            OACOAM: newtotalCost.toFixed(3),
            total: newTotal, // OABRLA
            OANTAM: newTotalNet, // Ne Order Value
            totalNet: newTotalNet, // OANTLA
            OABRAM: newTotal, // OANTLA
            OABLRO: nonVat(newTotalNet),
          },
          {
            where: {
              orderNo: orderNo,
            },
            transaction,
          }
        );
      }

      const series = await getSeries(orderType);
      if (series == null) {
        const error = new Error("Order Type is incorrect or not found");
        error.statusCode = 422;
        throw error;
      }

      if (orderNo == "") {
        orderNo = "";
        const orderNoRunning = await runningNumber({
          coNo: runningJson[0].CO.coNo,
          series: series.OOOT05,
          seriesType: runningJson[0].CO.seriesType,
        });
        orderNo = parseInt(orderNoRunning.lastNo) + 1;
        orderNo = orderNo.toString();
      }

      const running = await runningNumber({
        coNo: runningJson[0].DELIVERY.coNo,
        series: series.OOSPIC,
        seriesType: runningJson[0].DELIVERY.seriesType,
      });

      const runningNumberH = parseInt(running.lastNo) + 1;

      await updateRunningNumber(
        {
          coNo: runningJson[0].CO.coNo,
          series: series.OOOT05,
          seriesType: runningJson[0].CO.seriesType,
          lastNo: orderNo,
        },
        transaction
      );
      await updateRunningNumber(
        {
          coNo: runningJson[0].DELIVERY.coNo,
          series: series.OOSPIC,
          seriesType: runningJson[0].DELIVERY.seriesType,
          lastNo: runningNumberH,
        },
        transaction
      );

      const deliveryObj = {
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
        grossWeight: totalgrossWeight.toFixed(3),
        netWeight: totalnetWeight.toFixed(3),
      };

      let itemsData = await Promise.all(
        items.map(async (item) => {
          const itemDetail = await fetchItemDetails(item.itemCode);
          const itemFactor = await fetchItemFactor(item.itemCode, item.unit);
          const shinpping = await fetchShipping({
            customerNo: customerNo,
            addressID: addressID,
          });
          const route = await fetchRoute(shinpping.shippingRoute);
          const customer = await fetchCustomer(customerNo);
          const WeightAll = await fetchCalWeight({
            itemCode: item.itemCode,
            qty: itemFactor.factor * item.qty,
          });
          const Weight = await fetchCalWeight({
            itemCode: item.itemCode,
            qty: 1,
          });
          console.log("itemFactor" + itemFactor.factor * item.qty);
          const Cost = await fetchCalCost({
            itemCode: item.itemCode,
            qty: 1,
          });
          const CostAll = await fetchCalCost({
            itemCode: item.itemCode,
            qty: itemFactor.factor * item.qty,
          });
          return {
            coNo: orderJson[0].LINE.OBCONO,
            OACUCD: customer.OKCUCD,
            zone: customer.zone,
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
            OBITDS: itemDetail[0].itemDescription,
            qtyQT: itemFactor.factor * item.qty,
            qty: item.qty,
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
            OBCOFA: itemFactor.factor,
            OBUCOS: Cost.cost,
            costPCS: CostAll.cost,
            OBLNAM: item.total,
            grossWeightSingle: Weight.grossWeight,
            netWeightSingle: Weight.netWeight,
            OBSPUN: item.unit,
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
            OBCOCD: itemFactor.factor,
            OBUCCD: orderJson[0].LINE.OBUCCD,
            OBVTCD: orderJson[0].LINE.OBVTCD,
            OBSMCD: customer.saleCode, // SaleCode
            OBCUNO: customerNo, // Customer Code
            OBADID: addressID, // Address ID
            OBROUT: route.routeCode, // Route
            OBRODN: route.routeDeparture,
            OBDSHM: route.departureTime,
            OBCINA: orderJson[0].LINE.OBCINA, // Check Data ?
            OBDECU: customerNo,
            OBTEPY: customer.creditTerm,
            OBPMOR: orderJson[0].LINE.OBPMOR, // Check Data ?
            OBUPAV: orderJson[0].LINE.OBUPAV, // Check Data ?
            customerChannel: customer.customerChannel,
            OUSTUN: itemDetail[0].basicUnit,
            OUITGR: itemDetail[0].MMITGR,
            itemType: itemDetail[0].itemType,
            OUITCL: itemDetail[0].itemClass,
          };
        })
      );

      let itemNo = 1;
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

      if (Hcase === 1) {
        const customer = await fetchCustomer(customerNo);
        await Order.create(
          {
            coNo: orderJson[0].HEAD.OACONO, // OACONO,
            OADIVI: orderJson[0].HEAD.OADIVI, // OADIVI
            orderNo: orderNo, // OAORNO
            orderType: orderType, // OAORTP
            OAFACI: customer.OKFACI, // OAFACI
            warehouse: warehouse, // OAWHLO
            orderStatusLow: orderStatusLow, // OAORSL
            orderStatusHigh: orderStatusHigh, // OAORST
            customerNo: customerNo, // OACUNO
            orderDate: orderDate, // OAORDT
            OACUDT: orderDate, // OACUDT
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
            OAINRC: customer.salePayer,
            OAPYCD: customer.OKPYCD,
            OADISY: orderJson[0].HEAD.OADISY, // *** Conditional
            OATINC: orderJson[0].HEAD.OATINC,
            OALOCD: customer.OKCUCD,
            OACUCD: customer.OKCUCD, // OACUCD
            OADCCD: orderJson[0].HEAD.OADCCD, // OADCCD
            OACRTP: 1, // *** Conditional
            OADMCU: orderJson[0].HEAD.OADMCU,
            grossWeight: totalgrossWeight.toFixed(3),
            netWeight: totalnetWeight.toFixed(3),
            OACOAM: totalCost.toFixed(3),
            total: total, // OABRLA
            OANTAM: totalNet, // Ne Order Value
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
          },
          { transaction }
        );
        await documentInsert(
          {
            coNo: orderJson[0].HEAD.OACONO,
            orderType: orderType,
            orderNo: orderNo,
          },
          transaction
        );
      }
      if (Hcase === 1) {
        res.status(201).json({
          message: "Order Created",
          orderNo: orderNo,
        });
      } else {
        res.status(201).json({
          message: "Order Updated",
          orderNo: orderNo,
        });
      }

      await allocateInsert(itemsData, transaction);
      await deliveryHeadInsert(deliveryObj, transaction);
      await deliveryLineInsert(itemsData, transaction);
      await orderLineInsert(itemsData, transaction);
      await prepareInvoiceInsertA(itemsData, transaction);
      await transaction.commit();
    }
  } catch (error) {
    if (transaction) await transaction.rollback();
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
    for (let item of items) {
      await OrderLine.update(
        {
          coNo: -410,
        },
        {
          where: {
            orderNo: item.orderNo,
            itemCode: item.itemCode,
            itemNo: item.itemNo,
          },
        }
      );
    }
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
