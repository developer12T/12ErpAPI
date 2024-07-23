const Order = require("../models/order");
const OLINE = require("../models/orderline");
const Promotion = require("../models/promotion");
const axios = require("axios");
const { LOCALHOST } = require("../config/index");
const { Op } = require("sequelize");
const { sequelize } = require("../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../middleware/getDateTime");
const fs = require("fs");
const path = require("path");
const Shipping = require("../models/shipping");

// Get the current year and month
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

exports.index = async (req, res, next) => {
  try {
    const { orderType, orderNo } = req.body;
    let { orderDate } = req.body;

    if (orderDate == "") {
      orderDate = 202407;
    }
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderType: orderType,
        orderDate: {
          [Op.like]: `${202407}%`,
        },
        // orderNo:orderNo
      },
    });
    let OLINEarr = [];
    let promotionArr = [];
    let shippingarr = [];

    // Object to hold OLINEarr for each orderNo
    const orderLineData = {};
    const promotionData = {};
    const shippingData = {};

    for (let i = 0; i < orderData.length; i++) {
      const OLINEData = await OLINE.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderData[i].orderNo },
      });
      // Initialize the array for current orderNo
      orderLineData[orderData[i].orderNo] = [];

      for (let j = 0; j < OLINEData.length; j++) {
        orderLineData[orderData[i].orderNo].push({
          productNumber: OLINEData[j].productNumber,
          itemNo: OLINEData[j].itemNo,
          itemName: OLINEData[j].itemName,
          qty: OLINEData[j].qty,
          unit: OLINEData[j].unit,
          price: OLINEData[j].price,
          discount: OLINEData[j].discount,
          netPrice: OLINEData[j].netPrice,
          total: OLINEData[j].total,
          promotionCode: OLINEData[j].promotionCode,
        });
      }

      const OLINEData2 = await OLINE.findAll({
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

      for (let OLine2 of OLINEData2) {
        const PromotionData = await Promotion.findAll({
          attributes: {
            exclude: ["id"],
          },
          where: {
            promotionCode: OLine2.promotionCode,
            FZCONO: "410",
          },
        });

        if (PromotionData.length > 0) {
          promotionData[orderData[i].orderNo].push({
            promotionCode: OLine2.promotionCode,
            promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
          });
        } else {
          console.log(`No promotion data found for ${OLine2.promotionCode}`);
          promotionData[orderData[i].orderNo].push({
            promotionCode: OLine2.promotionCode,
            promotionName: null, // Or handle as needed if no data is found
          });
        }
      }
    }

    // If you want to keep all OLINE data in a single array as well
    // OLINEarr = Object.values(orderLineData).flat();

    const orders = orderData.map((order) => {
      const orderNo = order.orderNo.trim();
      const customerNo = order.customerNo.trim();
      const OLINEarr = orderLineData[orderNo] || [];
      const Oline = OLINEarr.map((OLINE) => {
        const promotion = promotionData[orderNo].find(
          (promo) => promo.promotionCode === OLINE.promotionCode
        );
        const itemName = OLINE.itemName.trim();
        const itemNo = OLINE.itemNo.trim();
        const promotionCode = OLINE.promotionCode.trim();
        return {
          productNumber: OLINE.productNumber,
          itemNo: itemNo,
          itemName: itemName,
          qty: OLINE.qty,
          unit: OLINE.unit,
          price: OLINE.price,
          discount: OLINE.discount,
          netPrice: OLINE.netPrice,
          total: OLINE.total,
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
        orderStatus: order.orderStatus,
        total: order.total,
        totalNet: order.totalNet,
        totalVat: order.totalVat,
        totalNonVat: order.totalNonVat,
        totalDiscount: order.totalDiscount,
        item: Oline,
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
    let OLINEarr = [];
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
      const OLINEData = await OLINE.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderNo },
      });

      for (let i = 0; i < OLINEData.length; i++) {
        OLINEarr.push({
          productNumber: OLINEData[i].productNumber,
          itemNo: OLINEData[i].itemNo,
          itemName: OLINEData[i].itemName,
          qty: OLINEData[i].qty,
          unit: OLINEData[i].unit,
          price: OLINEData[i].price,
          discount: OLINEData[i].discount,
          netPrice: OLINEData[i].netPrice,
          total: OLINEData[i].total,
          promotionCode: OLINEData[i].promotionCode,
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
          shippingPoscode: shipping.shippingPoscode,
          shippingPhone: shipping.shippingPhone,
        });
      }
    }
    const OLINEData2 = await OLINE.findAll({
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

    for (let OLine2 of OLINEData2) {
      const PromotionData = await Promotion.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          promotionCode: OLine2.promotionCode,
          FZCONO: "410",
        },
      });

      if (PromotionData.length > 0) {
        promotionArr.push({
          promotionCode: OLine2.promotionCode,
          promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
        });
      } else {
        console.log(`No promotion data found for ${OLine2.promotionCode}`);
        promotionArr.push({
          promotionCode: OLine2.promotionCode,
          promotionName: null, // Or handle as needed if no data is found
        });
      }
    }

    // res.json(promotionArr);

    const Oline = OLINEarr.map((OLINE) => {
      let promotionNameC = "";
      for (let i = 0; i < promotionArr.length; i++) {
        if (OLINE.promotionCode == promotionArr[i].promotionCode) {
          promotionNameC = promotionArr[i].promotionName;
        }
      }
      return {
        productNumber: OLINE.productNumber,
        itemNo: OLINE.itemNo,
        itemName: OLINE.itemName,
        qty: OLINE.qty,
        unit: OLINE.unit,
        price: OLINE.price,
        discount: OLINE.discount,
        netPrice: OLINE.netPrice,
        total: OLINE.total,
        promotionCode: OLINE.promotionCode,
        promotionName: promotionNameC,
      };
    });

    const orders = orderData.map((order) => {
      return {
        orderDate: order.orderDate,
        requestDate: order.requestDate,
        customerNo: order.customerNo,
        orderNo: order.orderNo,
        orderType: order.orderType,
        warehouse: order.warehouse,
        orderStatus: order.orderStatus,
        total: order.total,
        totalNet: order.totalNet,
        totalVat: order.totalVat,
        totalNonVat: order.totalNonVat,
        totalDiscount: order.totalDiscount,
        item: Oline,
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
      orderDate,
      requestDate,
      customerNo,
      orderNo,
      orderType,
      warehouse,
      orderStatus,
      total,
      totalDiscount,
      totalNet,
      totalVat,
      totalNonVat,
      addressID,
    } = req.body;

    const items = req.body.item;

    const jsonPathOrder = path.join(__dirname, "..", "Jsons", "order.json");

    let orderJson = [];

    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      orderJson = JSON.parse(jsonDataOrder);
    }

    const queryOrder = `
INSERT INTO [MVXJDTA].[OOHEAD] 
(
  [OACONO],
  [OADIVI],
  [OAORNO],
  [OAORTP],
  [OAFACI],
  [OAWHLO],
  [OAORST],
  [OAORSL],
  [OACUNO],
  [OAORDT],
  [OACUDT],
  [OARLDT],
  [OARLDZ],
  [OATIZO],
  [OATEPY],
  [OAMODL],
  [OATEDL],
  [OAADID],
  [OALOCD],
  [OACUCD],
  [OABRLA],
  [OANTLA],
  [OARGDT],
  [OARGTM],
  [OALMDT],
  [OACHID],
  [OALMTS]
) VALUES (
  :coNo,
  :OADIVI,
  :orderNo,
  :orderType,
  :OAFACI,
  :warehouse,
  :OAORST,
  :OAORSL,
  :customerNo,
  :orderDate,
  :OACUDT,
  :requestDate,
  :OARLDZ,
  :OATIZO,
  :OATEPY,
  :OAMODL,
  :OATEDL,
  :addressID,
  :OALOCD,
  :OACUCD,
  :OABRLA,
  :OANTLA,
  :OARGDT,
  :OARGTM,
  :OALMDT,
  :OACHID,
  :OALMTS
)
  `;

    let replacements = {
      coNo: orderJson.OACONO, // OACONO,
      OADIVI: orderJson.OADIVI, // OADIVI
      orderNo: orderNo, // OAORNO
      orderType: orderType, // OAFACI
      OAFACI: orderJson.OAFACI, // OAORTP
      warehouse: warehouse, // OAWHLO
      OAORST: orderStatus, // OAORST
      OAORSL: orderStatus, // OAORSL
      customerNo: customerNo, // OACUNO
      orderDate: orderDate, // OAORDT
      OACUDT: formatDate(), // OACUDT
      requestDate: requestDate, // OARLDT
      OARLDZ: formatDate(), // OARLDZ
      OATIZO: orderJson.OATIZO, // OAMODL
      OATEPY: orderJson.OATEPY, // OATEPY
      OAMODL: orderJson.OAMODL, // OAMODL
      OATEDL: orderJson.OATEDL, // OATEDL
      addressID: addressID, // OAADID
      OALOCD: orderJson.OALOCD, // OALOCD
      OACUCD: orderJson.OACUCD, // OACUCD
      OABRLA: total, // OABRLA
      OANTLA: totalNet, // OANTLA
      OARGDT: formatDate(), // OARGDT
      OARGTM: getCurrentTimeFormatted(), // OARGTM
      OALMDT: formatDate(), // OALMDT
      OACHID: orderJson.OACHID, // OACHID
      OALMTS: Date.now(), // OALMTS
    };

    await sequelize.query(queryOrder, {
      replacements,
      type: sequelize.QueryTypes.INSERT,
    });

    const itemsData = items.map((item) => {
      return {
        orderNo: orderNo,
        itemNo: item.itemNo,
        productNo: item.productNo,
        itemCode: item.itemCode,
        itemName: item.itemName,
        qty: item.qty,
        unit: item.unit,
        price: item.price,
        discount: item.discount,
        netPrice: item.netPrice,
        total: item.total,
        promotionCode: item.promotionCode,
      };
    });
    // res.json(itemsData);

    await axios({
      method: "post",
      url: `${LOCALHOST}order/insertorderitem`,
      data: itemsData,
    });
    res.status(201).json({
      message: "Created",
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
          coNo: "410",
        },
      }
    );

    const itemsData = items.map((item) => {
      return {
        orderNo: orderNo,
        itemNo: item.itemNo,
        productNo: item.productNo,
      };
    });

    await axios({
      method: "post",
      url: `${LOCALHOST}order/deleteitem`,
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
