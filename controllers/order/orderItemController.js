const { OLINE } = require("../../models/order");
const Promotion = require("../../models/promotion");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize } = require("../../config/m3db");
const axios = require("axios");
const { HOST } = require("../../config/index");

const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");

exports.insertItem = async (req, res, next) => {
  try {
    const items = req.body.items;

    const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "order.json");
    let orderJson = [];
    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      orderJson = JSON.parse(jsonDataOrder);
    }

    // res.json(fs.existsSync(jsonPath))
    // let itemNo = 1;
    for (let item of items) {
      await OLINE.create({
        coNo: orderJson[0].LINE.OBCONO, //
        OBDIVI: orderJson[0].LINE.OBDIVI, //
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        orderStatus: item.orderStatus,
        OBFACI: orderJson[0].LINE.OBFACI,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        OBITDS: orderJson[0].LINE.OBITDS,
        itemName: item.itemName,
        qtyPCS: item.qtyPCS,
        qtyCTN: item.qtyCTN,
        OBIVQT: item.qtyPCS,
        OBIVQA: item.qtyCTN,
        unit: item.unit,
        // OBDCCA
        // OBOCFA
        // OBDMCF
        // OBSPUN
        // OBPCOF
        // OBDCCS
        // OBCOFS
        // OBDMCS
        price: item.price,
        netPrice: item.netPrice,
        discount: item.discount,
        OBLNAM: item.price, // recheck
        // OBDIC1
        // OBDIC2
        // OBDIC3
        // OBDIC4
        // OBDIC5
        // OBDIC6
        // OBDIA1
        // OBDIA2
        // OBDIA3
        // OBDIA4
        // OBDIA5
        // OBDIA6
        // OBDWDT
        // OBCODT
        // OBCOHM
        // OBDWDZ
        // OBCODZ
        // OBCOHZ
        // OBTIZO
        // OBSTCD
        // OBUCOS
        // OBCOCD
        // OBUCCD
        // OBVTCD
        // OBSMCD
        OBDIA5: 0,
        total: item.total,
        promotionCode: item.promotionCode,
        OBATPR: orderJson[0].LINE.OBATPR,
        OBMODL: orderJson[0].LINE.OBMODL,
        OBTEDL: orderJson[0].LINE.OBTEDL,
        OBRGDT: formatDate(),
        OBRGTM: getCurrentTimeFormatted(),
        OBLMDT: formatDate(),
        OBCHNO: orderJson[0].LINE.OBCHNO,
        OBCHID: orderJson[0].LINE.OBCHID,
        OBLMTS: Date.now(),
        OBPLDT: formatDate(),
        OBPLHM: orderJson[0].LINE.OBPLHM,
        OBPRIO: orderJson[0].LINE.OBPRIO,
        OBUCOS: item.OBUCOS,
        OBCOFA: item.OBCOFA,
        OBORCO: item.OBORCO,
        creditTerm: orderJson[0].LINE.OBTEPY,
        //OBDECU
        //OBPRIO
      });
    }

    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.item = async (req, res, next) => {
  const { orderNo } = req.body;
  const orderLineData = {};
  const promotionData = {};
  orderLineData[orderNo] = [];
  promotionData[orderNo] = [];

  const OLINEData = await OLINE.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: { orderNo: orderNo },
  });

  for (let i = 0; i < OLINEData.length; i++) {
    orderLineData[orderNo].push({
      productNumber: OLINEData[i].productNumber,
      itemCode: OLINEData[i].itemCode,
      itemName: OLINEData[i].itemName,
      qtyCTN: OLINEData[i].qtyCTN,
      unit: OLINEData[i].unit,
      price: OLINEData[i].price,
      discount: OLINEData[i].discount,
      netPrice: OLINEData[i].netPrice,
      total: OLINEData[i].total,
      promotionCode: OLINEData[i].promotionCode,
    });
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
      promotionData[orderNo].push({
        promotionCode: OLine2.promotionCode,
        promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
      });
    } else {
      console.log(`No promotion data found for ${OLine2.promotionCode}`);
      promotionData[orderNo].push({
        promotionCode: OLine2.promotionCode,
        promotionName: null, // Or handle as needed if no data is found
      });
    }
  }

  const Oline = orderLineData[orderNo].map((OLINE) => {
    const itemCode = OLINE.itemCode.trim();
    const promotionCode = OLINE.promotionCode.trim();
    const promotion = promotionData[orderNo].find(
      (promo) => promo.promotionCode === OLINE.promotionCode
    );
    return {
      productNumber: OLINE.productNumber,
      itemCode: itemCode,
      itemName: OLINE.itemName,
      qtyCTN: OLINE.qtyCTN,
      unit: OLINE.unit,
      price: OLINE.price,
      discount: OLINE.discount,
      netPrice: OLINE.netPrice,
      total: OLINE.total,
      promotionCode: promotionCode,
      promotionName: promotion ? promotion.promotionName : "",
    };
  });

  res.json(Oline);
};

exports.deleteitem = async (req, res, next) => {
  const items = req.body;

  for (let item of items) {
    const OLINEData = await OLINE.update(
      {
        coNo: -410,
      },
      {
        attributes: {
          exclude: ["id"],
        },
        where: {
          orderNo: item.orderNo,
          itemCode: item.itemCode,
          itemNo: item.itemNo,
        },
      }
    );
  }
};
