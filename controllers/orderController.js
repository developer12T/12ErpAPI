const { Order, OLINE, Promotion } = require("../models/order");
const { Promotion } = require("../models/promotion");
const { Sequelize, Op } = require("sequelize");

exports.index = async (req, res, next) => {
  try {
    const { orderType, orderDate, customerNo, orderNo } = req.body;
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderType: orderType,
        orderDate: orderDate,
        customerNo: customerNo,
        orderNo: orderNo,
      },
    });
    res.json(orderData);
  } catch (error) {
    next(error);
  }
};

exports.single = async (req, res, next) => {
  try {
    const { orderType, orderDate, customerNo, orderNo } = req.body;
    let OLINEarr = [];
    let promotionArr = [];
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
    // for (let i = 0; i < orderData.length; i++) {
    //   const OLINEData = await OLINE.findAll({
    //     attributes: {
    //       exclude: ["id"],
    //     },
    //     where: { orderNo: orderData[i].orderNo },
    //     // group: ["MMFUDS"],
    //   });
    // }

    for (let i = 0; i < orderData.length; i++) {
      const OLINEData = await OLINE.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { orderNo: orderData[i].orderNo },
      });

      //   const PromotionData = await Promotion.findAll({
      //     attributes: {
      //       exclude: ["id"],
      //     },
      //     where: {
      //       promotionCode:
      //         orderData[i].promotionCode !== "undefined"
      //           ? ""
      //           : orderData[i].promotionCode,
      //       FZCONO: "410",
      //     },
      //   });

      for (let i = 0; i < OLINEData.length; i++) {
        OLINEarr.push({
          productNumber: OLINEData[i].productNumber,
          itemNo: OLINEData[i].itemNo,
          itemName: OLINEData[i].itemName,
          promotionCode: OLINEData[i].promotionCode,
          //   promotionName: PromotionData[0].promotionName,
        });

        // console.log(OLINEarr.)

        // for (let i = 0; i < PromotionData.length; i++) {
        //   promotionArr.push({
        //     promotionCode: PromotionData[i].promotionCode,
        //     promotionName: PromotionData[i].promotionName,
        //   });
        // }
      }
    }

    const OLINEData2 = await OLINE.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderNo: "1030000001",
        promotionCode: {
          [Op.ne]: null,
        },
      },
    });

    res.json(OLINEData2);

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
        item: OLINEarr,
      };
    });

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
    // group: ["MMFUDS"],
  });
  res.json(OLINEData);
};
