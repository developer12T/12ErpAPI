const Order = require("../models/order");
const OLINE = require("../models/orderline");
const Promotion = require("../models/promotion");
const { Op } = require("sequelize");
const { sequelize } = require("../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../middleware/getDateTime");
const fs = require("fs");
const path = require("path");

// Get the current year and month
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

exports.index = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    let { orderDate } = req.body;
    if (orderDate == "") {
      orderDate = 20240715;
    }
    // console.log(orderDate);
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderType: orderType,
        orderDate: orderDate,
      },
    });
    let OLINEarr = [];
    let promotionArr = [];
    let shippingarr = [];

    // Object to hold OLINEarr for each orderNo
    const orderLineData = {};
    const promotionData = {};

    for (let i = 0; i < orderData.length; i++) {
      const OLINEData = await OLINE.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderData[i].orderNo },
        // group: ["MMFUDS"],
      });
      // OLINEarr[i] = [];
      // Initialize the array for current orderNo
      orderLineData[orderData[i].orderNo] = [];

      for (let j = 0; j < OLINEData.length; j++) {
        orderLineData[orderData[i].orderNo].push({
          productNumber: OLINEData[j].productNumber,
          itemNo: OLINEData[j].itemNo,
          itemName: OLINEData[j].itemName,
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

      for (let j = 0; j < OLINEData2.length; j++) {
        const PromotionData = await Promotion.findAll({
          attributes: {
            exclude: ["id"],
          },
          where: {
            promotionCode: OLINEData2[j].promotionCode,
            // FZCONO: "410",
          },
        });
        promotionData[orderData[i].orderNo].push({
          promotionCode: OLINEData2[j].promotionCode,
          promotionName: PromotionData[j].promotionName,
        });
      }

      // res.json(promotionData);
      // orderLineData[orderData[i].orderNo].map(() => {
      //   let promotionNameC = "";
      //   for (let i = 0; i < promotionArr.length; i++) {
      //     if (OLINE.promotionCode == promotionArr[i].promotionCode) {
      //       promotionNameC = promotionArr[i].promotionName;
      //     }
      //   }
      // });
    }

    // If you want to keep all OLINE data in a single array as well
    // OLINEarr = Object.values(orderLineData).flat();

    const orders = orderData.map((order) => {
      const orderNo = order.orderNo;
      const OLINEarr = orderLineData[orderNo] || [];
      const Oline = OLINEarr.map((OLINE) => {
        const promotion = promotionData[orderNo].find(
          (promo) => promo.promotionCode === OLINE.promotionCode
        );
        return {
          productNumber: OLINE.productNumber,
          itemNo: OLINE.itemNo,
          itemName: OLINE.itemName,
          promotionCode: OLINE.promotionCode,
          promotionName: promotion ? promotion.promotionName : "",
        };
      });

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
        shipping: promotionArr,
      };
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.selectOne = async (req, res, next) => {
  try {
    const { orderType, orderDate, customerNo, orderNo } = req.body;
    let OLINEarr = [];
    let promotionArr = [];
    let shippingarr = [];
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        // orderType: orderType,
        // orderDate: orderDate,
        // customerNo: customerNo,
        orderNo: orderNo,
      },
    });

    for (let i = 0; i < orderData.length; i++) {
      const OLINEData = await OLINE.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderData[i].orderNo },
      });

      for (let i = 0; i < OLINEData.length; i++) {
        OLINEarr.push({
          productNumber: OLINEData[i].productNumber,
          itemNo: OLINEData[i].itemNo,
          itemName: OLINEData[i].itemName,
          promotionCode: OLINEData[i].promotionCode,
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
    });

    for (let i = 0; i < OLINEData2.length; i++) {
      const PromotionData = await Promotion.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          promotionCode: OLINEData2[i].promotionCode,
          // FZCONO: "410",
        },
      });
      // console.log(PromotionData[i].promotionName);
      promotionArr.push({
        promotionCode: OLINEData2[i].promotionCode,
        promotionName: PromotionData[i].promotionName,
      });
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

exports.item = async (req, res, next) => {
  const OLINEData = await OLINE.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: { orderNo: "000000001" },
  });
  res.json(OLINEData);
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

    const jsonPath = path.join(__dirname, "..", "Jsons", "order.json");
    let existingData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }

    const query = `
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

    const replacements = {
      coNo: 410, // OACONO,
      OADIVI: existingData.OADIVI, // OADIVI
      orderNo: orderNo, // OAORNO
      orderType: orderType, // OAFACI
      OAFACI: existingData.OAFACI, // OAORTP
      warehouse: warehouse, // OAWHLO
      OAORST: 22, // OAORST
      OAORSL: 22, // OAORSL
      customerNo: customerNo, // OACUNO
      orderDate: orderDate, // OAORDT
      OACUDT: formatDate(), // OACUDT
      requestDate: requestDate, // OARLDT
      OARLDZ: formatDate(), // OARLDZ
      OATIZO: existingData.OATIZO, // OAMODL
      OATEPY: existingData.OATEPY, // OATEPY
      OAMODL: existingData.OAMODL, // OAMODL
      OATEDL: existingData.OATEDL, // OATEDL
      addressID: addressID, // OAADID
      OALOCD: existingData.OALOCD, // OALOCD
      OACUCD: existingData.OACUCD, // OACUCD
      OABRLA: total, // OABRLA
      OANTLA: totalNet, // OANTLA
      OARGDT: formatDate(), // OARGDT
      OARGTM: getCurrentTimeFormatted(), // OARGTM
      OALMDT: formatDate(), // OALMDT
      OACHID: existingData.OACHID, // OACHID
      OALMTS: Date.now(), // OALMTS
    };
    await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(201).json({
      message: "Upload Success",
    });
  } catch (error) {
    next(error);
  }
};
