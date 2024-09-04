const { OrderLine } = require("../../models/order");
const Promotion = require("../../models/promotion");
const { Op } = require("sequelize");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { getJsonData } = require("../../middleware/getJsonData");

exports.insertItem = async (req, res, next) => {
  try {
    const items = req.body.items;
    const orderJson = getJsonData("order.json");

    // const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "order.json");
    // let orderJson = [];
    // if (fs.existsSync(jsonPathOrder)) {
    //   const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
    //   orderJson = JSON.parse(jsonDataOrder);
    // }

    // res.json(fs.existsSync(jsonPath))
    // let itemNo = 1;
    for (let item of items) {
      await OrderLine.create({
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

  const OrderLineData = await OrderLine.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: { orderNo: orderNo },
  });

  for (let i = 0; i < OrderLineData.length; i++) {
    orderLineData[orderNo].push({
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

  const OrderLine = orderLineData[orderNo].map((OrderLine) => {
    const itemCode = OrderLine.itemCode.trim();
    const promotionCode = OrderLine.promotionCode.trim();
    const promotion = promotionData[orderNo].find(
      (promo) => promo.promotionCode === OrderLine.promotionCode
    );
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
      promotionName: promotion ? promotion.promotionName : "",
    };
  });

  res.json(OrderLine);
};

exports.deleteitem = async (req, res, next) => {
  const items = req.body;

  for (let item of items) {
    const OrderLineData = await OrderLine.update(
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
