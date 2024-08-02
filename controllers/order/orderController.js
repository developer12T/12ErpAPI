const { OLINE, Order } = require("../../models/order");
const Promotion = require("../../models/promotion");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { Op } = require("sequelize");
const { sequelize } = require("../../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const fs = require("fs");
const path = require("path");
const Shipping = require("../../models/shipping");
const { calWight } = require("../master/masterContorller");

// Get the current year and month
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");

exports.index = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    let { orderDate } = req.body;

    if (orderDate == "") {
      orderDate = `${currentYear}${currentMonth}`;
    }
    const orderData = await Order.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderType: orderType,
        orderDate: {
          [Op.like]: `${orderDate}%`,
        },
        // orderNo:orderNo
      },
    });

    // Object to hold OLINEarr for each orderNo
    const orderLineData = {};
    const promotionData = {};

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
          itemCode: OLINEData[j].itemCode,
          itemName: OLINEData[j].itemName,
          qtyCTN: OLINEData[j].qtyCTN,
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
        const itemCode = OLINE.itemCode.trim();
        const promotionCode = OLINE.promotionCode.trim();
        return {
          productNumber: OLINE.productNumber,
          itemCode: itemCode,
          itemName: itemName,
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
        itemCode: OLINE.itemCode,
        itemName: OLINE.itemName,
        qtyCTN: OLINE.qtyCTN,
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
      Hcase,
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
      payer,
      OKALCU,
      netWight,
      grossWight,
      OAFRE1,
    } = req.body;

    const items = req.body.item;

    // console.log(orderStatus);

    const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "order.json");
    let orderJson = [];
    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      orderJson = JSON.parse(jsonDataOrder);
    }

    if (Hcase === 1) {
      await Order.create({
        coNo: orderJson.HEAD.OACONO, // OACONO,
        OADIVI: orderJson.OADIVI, // OADIVI
        orderNo: orderNo, // OAORNO
        orderType: orderType, // OAFACI
        OAFACI: orderJson.OAFACI, // OAORTP
        warehouse: warehouse, // OAWHLO
        orderStatus: orderStatus, // OAORST
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
        total: total, // OABRLA
        totalNet: totalNet, // OANTLA
        OARGDT: formatDate(), // OARGDT
        OARGTM: getCurrentTimeFormatted(), // OARGTM
        OALMDT: formatDate(), // OALMDT
        OACHID: orderJson.OACHID, // OACHID
        OALMTS: Date.now(), // OALMTS
      });

      await axios({
        method: "post",
        url: `${HOST}document/insert`,
        data: { orderType: orderType, orderNo: orderNo },
      });
    }

    const running = await axios({
      method: "post",
      url: `${HOST}master/runningNumber/`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
      },
    });
    const runningNumberH = running.data[0].lastNo + 1;

    await axios({
      method: "post",
      url: `${HOST}master/runningNumber/update`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
        lastNo: runningNumberH,
      },
    });
    const jsonPath = path.join(__dirname, "../../", "Jsons", "orederItem.json");
    let existingData = [];

    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }
    const calWights = [];
    for (let item of items) {
      const { data } = await axios({
        method: "post",
        url: `${HOST}master/calwight`,
        data: {
          itemCode: item.itemCode,
          qty: item.qtyPCS,
        },
      });
      calWights.push(data[0]);
    }
    const totalGrossWight = calWights.reduce((accumulator, calWight) => {
      return accumulator + calWight.grossWight;
    }, 0);

    const totalNetWight = calWights.reduce((accumulator, calWight) => {
      return accumulator + calWight.netWight;
    }, 0);

    // res.json(totalGrossWight + " " + totalNetWight);

    let itemsData = await Promise.all(
      items.map(async (item) => {
        const calWight = await axios({
          method: "post",
          url: `${HOST}master/calwight`,
          data: {
            itemCode: item.itemCode,
            qty: item.qtyPCS,
          },
        });

        const factor = await axios({
          method: "post",
          url: `${HOST}master/unit`,
          data: {
            itemCode: item.itemCode,
            unit: item.unit,
          },
        });

        const calcost = await axios({
          method: "post",
          url: `${HOST}master/calcost`,
          data: {
            itemCode: item.itemCode,
            qty: item.qtyCTN,
          },
        });
        return {
          coNo: orderJson[0].LINE.OBCONO,
          OACUCD: orderJson[0].HEAD.OACUCD,
          OBDIVI: orderJson[0].LINE.OBDIVI,
          OBORCO: orderJson[0].LINE.OBORCO,
          orderNo: orderNo,
          OKALCU: OKALCU,
          runningNumberH: runningNumberH,
          orderType: orderType,
          orderStatus: orderStatus,
          orderDate: orderDate,
          requestDate: requestDate,
          OAFRE1: OAFRE1,
          payer: payer,
          itemCode: item.itemCode,
          itemNo: item.itemNo,
          itemName: item.itemName,
          qtyPCS: item.qtyPCS,
          qtyCTN: item.qtyCTN,
          unit: item.unit,
          price: item.price,
          discount: item.discount,
          netPrice: item.netPrice,
          total: item.total,
          netWight: calWight.data[0].netWight,
          grossWight: calWight.data[0].grossWight,
          promotionCode: item.promotionCode,
          warehouse: warehouse,
          customerNo: customerNo,
          // customerChannel: customerChannel,
          addressID: addressID,
          MOPLDT: orderJson[0].LINE.OBPLDT,
          MOTIHM: orderJson[0].LINE.OBPLHM,
          MOPRIO: orderJson[0].LINE.OBPRIO,
          OBORQT: orderJson[0].LINE.OBORQT,
          OBSAPR: item.OBSAPR,
          OBNEPR: item.OBNEPR,
          OBCOFA: factor.data[0].factor,
          OBUCOS: calcost.data[0].cost,
        };
      })
    );

    let itemNo = 1;
    // let itemNo2 = 1;
    itemsData = itemsData.map((item) => {
      const result = {
        ...item, // Spread the properties of the original item
        itemNo: itemNo, // Add the itemNo property
      };
      itemNo++;
      return result;
    });

    res.json(itemsData);

    // let calCost = await axios({
    //   method: "post",
    //   url: `${HOST}master/calcost`,
    //   data: {
    //     itemCode: item.itemCode,
    //     qtyCTN: item.qtyCTN,
    //   },
    // });
    // console.log(itemsData);

    // await axios({
    //   method: "post",
    //   url: `${HOST}allowcate/insert`,
    //   data: { items: itemsData },
    // });

    // await axios({
    //   method: "post",
    //   url: `${HOST}order/insertorderitem`,
    //   data: { items: itemsData },
    // });

    // res.json(itemsData);
    // // Insert Delivery Head
    // await axios({
    //   method: "post",
    //   url: `${HOST}delivery/insertHead`,
    //   data: {
    //     warehouse: 101,
    //     coNo: 410,
    //     runningNumberH: runningNumberH,
    //     orderNo: orderNo,
    //     orderType: orderType,
    //     addressID: addressID,
    //     customerNo: customerNo,
    //     OARLDT: requestDate,
    //     OARGTM: getCurrentTimeFormatted(),
    //     OATIZO: orderJson.OATIZO,
    //     grossWight: totalGrossWight,
    //     netWight: totalNetWight,
    //   },
    // });
    // // Insert Delivery Line
    // await axios({
    //   method: "post",
    //   url: `${HOST}delivery/insertLine`,
    //   data: {
    //     items: itemsData,
    //   },
    // });

    // // Insert Prepare Invoice A
    // await axios({
    //   method: "post",
    //   url: `${HOST}prepare/insertA`,
    //   data: {
    //     items: itemsData,
    //   },
    // });

    // // Insert Prepare Invoice B
    // await axios({
    //   method: "post",
    //   url: `${HOST}prepare/insertB`,
    //   data: {
    //     items: itemsData,
    //   },
    // });

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

    await axios({
      method: "post",
      url: `${HOST}order/deleteitem`,
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
