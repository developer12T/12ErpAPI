const { OLINE } = require("../../models/order");
const Promotion = require("../../models/promotion");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize } = require("../../config/m3db");

const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");

exports.insertItem = async (req, res, next) => {
  try {
    const items = req.body;

    const jsonPath = path.join(__dirname, "../../", "Jsons", "orederItem.json");
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
    // let productNo = 1;
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
        netprice: item.netPrice,
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
      // productNo++;
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
    const itemNo = OLINE.itemNo.trim();
    const promotionCode = OLINE.promotionCode.trim();
    const promotion = promotionData[orderNo].find(
      (promo) => promo.promotionCode === OLINE.promotionCode
    );
    return {
      productNumber: OLINE.productNumber,
      itemNo: itemNo,
      itemName: OLINE.itemName,
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
          itemNo: item.itemNo,
          productNo: item.productNo,
        },
      }
    );
  }

  // res.json(OLINEData);
};
