const Order = require("../models/order");
const OLINE = require("../models/orderline");
const Promotion = require("../models/promotion");
const { Op } = require("sequelize");
const { sequelize } = require("../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../middleware/getDateTime");

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
      customerCode,
      orderNo,
      orderType,
      orderWh,
      orderStatus,
      total,
      totalDiscount,
      totalNet,
      totalVat,
      totalNonVat,
      Item: [
        {
          itemNo,
          itemCode,
          itemName,
          qty,
          unit,
          price,
          discount,
          netPrice,
          promotionCode,
        },
      ],
    } = req.body;

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
  [OALNCD],
  [OATEPY],
  [OAMODL],
  [OATEDL],
  [OAADID],
  [OASMCD],
  [OAOREF],
  [OAVRCD],
  [OAFRE1],
  [OAPTNO],
  [OAINRC],
  [OABAGD],
  [OADISY],
  [OATINC],
  [OALOCD],
  [OACUCD],
  [OADCCD],
  [OADMCU],
  [OAGRWE],
  [OANEWE],
  [OAVOL3],
  [OACOAM],
  [OABRAM],
  [OABRLA],
  [OANTAM],
  [OANTLA],
  [OARGDT],
  [OARGTM],
  [OALMDT],
  [OACHNO],
  [OACHID],
  [OALMTS],
  [OADECU]
) VALUES (
  :coNo,
  :OADIVI,
  :orderNo,
  :coType,
  :OAFACI,
  :warehouse,
  :OAORST,
  :OAORSL,
  :customerNo,
  :orderDate,
  :OACUDT,
  :OARLDT,
  :OARLDZ,
  :OATIZO,
  :OALNCD,
  :OATEPY,
  :OAMODL,
  :OATEDL,
  :addressID,
  :OASMCD,
  :OAOREF,
  :OAVRCD,
  :OAFRE1,
  :OAPTNO,
  :OAINRC,
  :OABAGD,
  :OADISY,
  :OATINC,
  :OALOCD,
  :OACUCD,
  :OADCCD,
  :OADMCU,
  :OAGRWE,
  :OANEWE,
  :OAVOL3,
  :OACOAM,
  :OABRAM,
  :OABRLA,
  :OANTAM,
  :OANTLA,
  :OARGDT,
  :OARGTM,
  :OALMDT,
  :OACHNO,
  :OACHID,
  :OALMTS,
  :OADECU
)
  `;

    const replacements = {
      customerNo: customerNo, // OACONO,
      coNo: existingData.OKCONO, // OADIVI
      customerStatus: customerStatus, // OAORNO
      customerChannel: customerChannel, // OAORTP
      orderType: "021", // OAFACI
      customerName: customerName, // OAWHLO
      customerAddress1: customerAddress1, // OAORST
      customerAddress2: customerAddress2, // OAORSL
      customerAddress3: customerAddress3, // OACUNO
      customerAddress4: customerAddress4, // OAORDT
      customerPoscode: customerPoscode, // OACUDT
      customerPhone: customerPhone, // OARLDT
      warehouse: warehouse, // OARLDZ
      OKSDST: OKSDST, // OATIZO
      saleTeam: saleTeam, // OALNCD
      OKCFC1: OKCFC1, // OATEPY
      OKCFC3: OKCFC3, // OKCFC3
      OKCFC6: OKCFC6, // OKCFC6
      salePayer: salePayer, // OKPYNO
      creditLimit: creditLimit, // OKCRL2
      taxno: taxno, // OKVRNO
      saleCode: saleCode, // OKSMCD
      OKCUTP: existingData.OKCUTP, // OKCUTP
      OKCORG: existingData.OKCORG, // OKCORG
      creditTerm: existingData.OKTEPY, // OKTEPY
      OKOT75: existingData.OKOT75, // OKOT75
      OKTEDL: existingData.OKTEDL, // OKTEDL
      OKMODL: existingData.OKMODL, // OKMODL
      OKDIPC: existingData.OKDIPC, // OKDIPC
      OKTXAP: existingData.OKTXAP, // OKTXAP
      OKCUCD: existingData.OKCUCD, // OKCUCD
      OKCRTP: existingData.OKCRTP, // OKCRTP
      OKDTFM: existingData.OKDTFM, // OKDTFM
      OKPRIC: existingData.OKPRIC, // OKPRIC
      OKCSCD: existingData.OKCSCD, // OKCSCD
      OKLHCD: existingData.OKLHCD, // OKLHCD
      OKDOGR: existingData.OKDOGR, // OKDOGR
      OKEDES: existingData.OKEDES, // OKEDES
      OKPYCD: existingData.OKPYCD, // OKPYCD
      OKGRPY: existingData.OKGRPY, // OKGRPY
      OKTINC: existingData.OKTINC, // OKTINC
      OKPRDL: existingData.OKPRDL, // OKPRDL
      OKIVGP: existingData.OKIVGP, // OKIVGP
      OKFACI: existingData.OKFACI, // OKFACI
      OKRESP: existingData.USER, // OKRESP
      OKUSR1: existingData.USER, // OKUSR1
      OKUSR2: existingData.USER, // OKUSR2
      OKUSR3: existingData.USER, // OKUSR3
      OKDTE1: formatDate(), // OKDTE1
      OKDTE2: formatDate(), // OKDTE2
      OKDTE3: formatDate(), // OKDTE3
      OKRGDT: formatDate(), // OKRGDT
      OKRGTM: getCurrentTimeFormatted(), // OKRGTM
      OKLMDT: formatDate(), // OKLMDT
      OKCHID: existingData.USER, // OKCHID
      OKLMTS: Date.now(), // OKLMTS
    };
  } catch (error) {
    next(error);
  }
};
