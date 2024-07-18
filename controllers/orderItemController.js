const OLINE = require("../models/orderline");
const Promotion = require('../models/promotion')
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize } = require("../config/m3db");

const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../middleware/getDateTime");

exports.insertItem = async (req, res, next) => {
  try {
    const items = req.body;

    const jsonPath = path.join(__dirname, "..", "Jsons", "orederItem.json");
    let existingData = [];

    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }

    // res.json(fs.existsSync(jsonPath))

    const query = `
    INSERT INTO [MVXJDTA].[OOLINE] 
    (
    [OBCONO],
    [OBDIVI],
    [OBORNO],
    [OBPONR],
    [OBORST],
    [OBFACI],
    [OBWHLO],
    [OBITNO],
    [OBITDS],
    [OBTEDS],
    [OBORQT],
    [OBORQA],
    [OBIVQT],
    [OBIVQA],
    [OBALUN],
    [OBSAPR],
    [OBNEPR],
    [OBDIA2],
    [OBLNA2],
    [OBPIDE],
    [OBATPR],
    [OBMODL],
    [OBTEDL],
    [OBRGDT],
    [OBRGTM],
    [OBLMDT],
    [OBCHNO],
    [OBCHID],
    [OBLMTS],
    [OBTEPY]
    ) VALUES (
    :coNo,
    :OBDIVI,
    :orderNo,
    :productNo,
    :orderStatus,
    :OBFACI,
    :warehouse,
    :itemNo,
    :OBITDS,
    :itemName,
    :OBORQT,
    :qty,
    :OBIVQT,
    :OBIVQA,
    :unit,
    :price,
    :netprice,
    :discount,
    :total,
    :promotionCode,
    :OBATPR,
    :OBMODL,
    :OBTEDL,
    :OBRGDT,
    :OBRGTM,
    :OBLMDT,
    :OBCHNO,
    :OBCHID,
    :OBLMTS,
    :creditTerm)`;
    for (let item of items) {
      const replacements = {
        coNo: existingData.OBCONO, //
        OBDIVI: existingData.OBDIVI, //
        orderNo: item.orderNo,
        productNo: item.productNo,
        orderStatus: 22,
        OBFACI: existingData.OBFACI,
        warehouse: 101,
        itemNo: item.itemNo,
        OBITDS: existingData.OBITDS,
        itemName: item.itemName,
        OBORQT: existingData.OBORQT,
        qty: item.qty,
        OBIVQT: existingData.OBIVQT,
        OBIVQA: existingData.OBIVQA,
        unit: item.unit,
        price: item.price,
        netprice: 20.1,
        discount: item.discount,
        total: item.total,
        promotionCode: item.promotionCode,
        OBATPR: existingData.OBATPR,
        OBMODL: existingData.OBMODL,
        OBTEDL: existingData.OBTEDL,
        OBRGDT: formatDate(),
        OBRGTM: getCurrentTimeFormatted(),
        OBLMDT: formatDate(),
        OBCHNO: existingData.OBCHNO,
        OBCHID: existingData.OBCHID,
        OBLMTS: Date.now(),
        creditTerm: existingData.OBTEPY,
      };
      await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.INSERT,
      });
    }

    res.status(201).json({
      message: "Insert Success",
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

  for (let j = 0; j < OLINEData.length; j++) {
    orderLineData[orderNo].push({
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
    const promotion = promotionData[orderNo].find(
      (promo) => promo.promotionCode === OLINE.promotionCode
    );
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
      promotionName: promotion ? promotion.promotionName : "",
    };
  });

  res.json(Oline);
};

exports.deleteitem = async (req, res, next) => {
  const { orderNo } = req.body;
  const OLINEData = await OLINE.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: { orderNo: orderNo },
  });
  res.json(OLINEData);
};

exports.deleteitemsingle = async (req, res, next) => {
  const { orderNo, productNo } = req.body;
  const OLINEData = await OLINE.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: { orderNo: orderNo, productNo: productNo },
  });
  res.json(OLINEData);
};
