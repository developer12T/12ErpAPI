const { DeliveryHead, DeliveryLine } = require("../../models/delivery");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { sequelize } = require("../../config/m3db");
const fs = require("fs");
const path = require("path");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { validationResult } = require("express-validator");

exports.index = async (req, res, next) => {};

exports.insertHead = async (req, res, next) => {
  try {
    const {
      coNo,
      warehouse,
      runningNumberH,
      orderNo,
      orderType,
      customerNo,
      addressID,
      OARGTM,
      OATIZO,
      grossWight,
      netWight,
      orderDate,
      requestDate,
    } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is Incorrect");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const jsonPath = path.join(__dirname, "../../", "Jsons", "delivery.json");
    let deliveryData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      deliveryData = JSON.parse(jsonData);
    }
    // res.json(deliveryData[0].HEAD);

    const policy = await axios({
      method: "post",
      url: `${HOST}master/policy/single`,
      data: { orderType: orderType },
    });

    const shinpping = await axios({
      method: "post",
      url: `${HOST}shinpping/single`,
      data: {
        customerNo: customerNo,
        addressID: addressID,
      },
    });

    const route = await axios({
      method: "post",
      url: `${HOST}route/single`,
      data: {
        shippingRoute: shinpping.data[0].shippingRoute,
      },
    });

    const customer = await axios({
      method: "post",
      url: `${HOST}customer/single`,
      data: {
        customerNo: customerNo,
      },
    });

    await DeliveryHead.create({
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: policy.data[0].EDDPOL, // POLICY
      OQWHLO: warehouse,
      OQINOU: deliveryData[0].HEAD.OQINOU,
      OQCONA: warehouse, //OOHEAD.OAWHLO
      // OQCOAA
      // OQCOAF
      // OQCONB
      OQSDES: route.data[0].place, // ROUTE PLACE
      OQDSDT: requestDate, //OOHEAD OARLDT requestDate
      OQDSHM: route.data[0].departureTime, // departureTime
      OQTRDT: orderDate, //OOHEAD OAORDT
      OQTRTM: OARGTM, //OOHEAD
      OQSROT: route.data[0].routeCode, // ROUTE
      OQROUT: route.data[0].routeCode, // ROUTE
      // OQRODN
      // OQMODL
      // OQMODF
      // OQTEDL
      // OQTEDF

      OQRORC: deliveryData[0].HEAD.OQRORC, // 3
      // OQTTYP
      OQTTYP: deliveryData[0].HEAD.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: route.data[0].place, // ROUTE PLACE

      //OQPUTP
      //OQPUSN
      //OQBLOP
      //OQRLFA
      //OQRLTD
      //OQPGRS
      //OQPCKA
      //OQPLSX

      OQNEWE: netWight, // OOLINE SUM
      OQGRWE: grossWight, // OOLINE SUM
      OQTIZO: OATIZO, // OOHEAD.OATIZO
      OQDTDT: formatDate(), // OOHEAD requestDate
      OQDTHM: route.data[0].departureTime, // departureTime
      OQDOCR: deliveryData[0].HEAD.OQDOCR, // 1
      OQDOCE: deliveryData[0].HEAD.OQDOCE, // 1 ** 1 digit in Database TST
      OQDEWD: deliveryData[0].HEAD.OQDEWD, // 0
      OQSEEQ: deliveryData[0].HEAD.OQSEEQ, // 50
      OQIVSS: deliveryData[0].HEAD.OQIVSS, // 2
      OQPRIO: deliveryData[0].HEAD.OQPRIO, // 5
      OQCUCL: route.data[0].customerChannel, // OCUSMA
      OQCSCD: customer.data[0].OKCSCD, // OCUSMA
      OQECAR: customer.data[0].OKECAR, // OCUSMA
      OQPONO: shinpping.data[0].shippingPoscode, // OCUSAD
      OQULZO: route.data[0].shippingRoute, // OCUSAD
      OQFWNS: route.data[0].forwarding, // Route forwarding
      OQFWNO: route.data[0].forwarding, // Route forwarding
      OQAGKY: deliveryData[0].HEAD.OQAGKY, // emthy
      OQRGDT: formatDate(),
      OQRGTM: getCurrentTimeFormatted(),
      OQLMDT: formatDate(),
      OQCHNO: deliveryData[0].HEAD.OQCHNO,
      OQCHID: deliveryData[0].HEAD.OQCHID,
      OQSCES: deliveryData[0].HEAD.OQSCES, //90
      OQLMTS: Date.now(),
    });

    res.status(201).json("Created");
  } catch (error) {
    next(error);
  }
};

exports.insertLine = async (req, res, next) => {
  try {
    const items = req.body.items;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is Incorrect");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    for (let item of items) {
      const jsonPath = path.join(__dirname, "../../", "Jsons", "delivery.json");
      let deliveryData = [];
      if (fs.existsSync(jsonPath)) {
        const jsonData = fs.readFileSync(jsonPath, "utf-8");
        deliveryData = JSON.parse(jsonData);
      }
      // res.json(deliveryData)
      await DeliveryLine.create({
        coNo: item.coNo,
        URDLIX: item.runningNumberH,
        URRORC: deliveryData[0].HEAD.OQRORC, // MHDISH
        URRIDN: item.orderNo,
        URRIDL: item.itemNo,
        URITNO: item.itemCode,
        URFACI: deliveryData[0].LINE.URFACI, // json
        URTRQT: item.qtyPCS, // ooline qtyCTN (pcs)
        URSTCD: deliveryData[0].LINE.URSTCD, // 1
        grossWight: item.grossWightSingle, // OOLINE
        netWight: item.netWightSingle, // OOLINE
        // URALUN OOLINE
        URALUN: item.unit,
        URRGDT: formatDate(),
        URRGTM: getCurrentTimeFormatted(),
        URLMDT: formatDate(),
        URCHNO: deliveryData[0].LINE.URCHNO,
        URCHID: deliveryData[0].LINE.URCHID,
        URLMTS: Date.now(),
        URSCES: deliveryData[0].HEAD.OQSCES, // MHDISH
      });
    }
    res.status(201).json("Created");
  } catch (error) {
    next(error);
  }
};

exports.deleteL = async (req, res, next) => {
  try {
    const { warehouse } = req.body;
  } catch (error) {
    next(error);
  }
};

exports.deleteH = async (req, res, next) => {
  try {
    const { warehouse } = req.body;
  } catch (error) {
    next(error);
  }
};
