// Models
const { OrderLine } = require("../../models/order");
const Promotion = require("../../models/promotion");
// Utils
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../utils/getDateTime");
const { getJsonData } = require("../../utils/getJsonData");
// Middleware
const path = require("path");
const currentFilePath = path.basename(__filename);
const errorEndpoint = require("../../middleware/errorEndpoint");
// Squelize "OR"
const { Op } = require("sequelize");

exports.orderLineInsert = async (itemData, transaction) => {
  // let transaction;
  try {
    const items = itemData;
    const orderJson = getJsonData("order.json");
    for (let item of items) {
      await OrderLine.create(
        {
          coNo: orderJson[0].LINE.OBCONO, //
          OBDIVI: orderJson[0].LINE.OBDIVI, //
          orderNo: item.orderNo,
          itemNo: item.itemNo,
          orderStatusLow: item.orderStatusLow,
          OBFACI: orderJson[0].LINE.OBFACI,
          warehouse: item.warehouse,
          itemCode: item.itemCode,
          OBITDS: item.OBITDS,
          itemName: item.itemName,
          qtyQT: item.qtyQT,
          qty: item.qty,
          OBRNQT: item.qtyQT,
          OBRNQA: item.qty,
          // OBIVQT: item.qtyQT,
          // OBIVQA: item.qty,
          unit: item.unit,
          // OBDCCA
          // OBOCFA
          OBDMCF: orderJson[0].LINE.OBDMCF,
          OBSPUN: item.OBSPUN,
          OBPRMO: item.OBPRMO,
          OBPCOF: orderJson[0].LINE.OBPCOF,
          // OBDCCS
          OBCOFS: item.OBCOFA,
          OBDMCS: orderJson[0].LINE.OBDMCS,
          price: item.price,
          netPrice: item.netPrice,
          discount: item.discount,
          OBLNAM: item.total, // recheck
          OBDIC1: item.OBDIC1,
          OBDIC2: item.OBDIC2,
          OBDIC3: item.OBDIC3,
          OBDIC4: item.OBDIC4,
          OBDIC5: item.OBDIC5,
          OBDIC6: item.OBDIC6,
          OBCMP5: item.OBCMP5,
          OBDIBE: item.OBDIBE,
          OBDIRE: item.OBDIRE,
          OBDDSU: item.OBDDSU,
          OBACRF: item.OBACRF,
          OBDWDT: item.OBDWDT,
          OBCODT: item.OBCODT,
          OBCOHM: item.OBCOHM,
          OBDWDZ: item.OBDWDZ,
          OBCODZ: item.OBCODZ,
          OBCOHZ: item.OBCOHZ,
          OBTIZO: item.OBTIZO,
          OBSTCD: item.OBSTCD,
          OBCOCD: item.OBCOCD,
          OBUCCD: item.OBUCCD,
          OBVTCD: item.OBVTCD,
          OBSMCD: item.OBSMCD,
          OBCUNO: item.OBCUNO,
          OBADID: item.OBADID,
          OBROUT: item.OBROUT,
          OBRODN: item.OBRODN,
          OBDSDT: item.requestDate,
          OBDSHM: item.OBDSHM,
          OBFDED: item.requestDate,
          OBLDED: item.requestDate,
          OBCINA: item.OBCINA,
          OBDECU: item.OBDECU,
          OBTEPY: item.OBTEPY,
          OBPMOR: item.OBPMOR,
          OBUPAV: item.OBUPAV,
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

          //OBPRIO
        },
        {
          transaction,
        }
      );
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Order Line:", error);
  }
};

exports.getOrderItemAll = async (req, res, next) => {
  const { orderNo } = req.body;
  const orderLineData = {};
  const promotionData = {};
  orderLineData[orderNo] = [];
  promotionData[orderNo] = [];

  const OrderLineData = await OrderLine.findAll({
    where: { orderNo: orderNo },
  });

  for (let i = 0; i < OrderLineData.length; i++) {
    orderLineData[orderNo].push({
      productNumber: OrderLineData[i].productNumber,
      itemCode: OrderLineData[i].itemCode,
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
      promotionData[orderNo].push({
        promotionCode: OrderLine2.promotionCode,
        promotionName: PromotionData[0].promotionName, // Assuming promotionName is a property of PromotionData
      });
    } else {
      console.log(`No promotion data found for ${OrderLine2.promotionCode}`);
      promotionData[orderNo].push({
        promotionCode: OrderLine2.promotionCode,
        promotionName: null, // Or handle as needed if no data is found
      });
    }
  }

  const response = orderLineData[orderNo].map((OrderLine) => {
    const itemCode = OrderLine.itemCode.trim();
    const promotionCode = OrderLine.promotionCode.trim();
    const promotion = promotionData[orderNo].find(
      (promo) => promo.promotionCode === OrderLine.promotionCode
    );
    return {
      productNumber: OrderLine.productNumber,
      itemCode: itemCode,
      itemName: OrderLine.itemName,
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

  res.json(response);
};

exports.deleteitem = async (req, res, next) => {
  const items = req.body;

  for (let item of items) {
    const OrderLineData = await OrderLine.update(
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
};
