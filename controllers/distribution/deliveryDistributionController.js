const { DeliveryHead, DeliveryLine } = require("../../models/delivery");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { validationResult } = require("express-validator");
const { getJsonData } = require("../../middleware/getJsonData");
const {
  fetchShipping,
  fetchCustomer,
} = require("../../middleware/apiCustomer");
const {
  fetchPolicyDistribution,
  fetchPolicy,
  fetchRouteDetail,
} = require("../../middleware/apiMaster");
const { fetchRoutes } = require("../../middleware/apiRoutes");
const axios = require("axios");
const deliveryData = getJsonData("distribution.json");

exports.index = async (req, res, next) => {};

exports.insertDeliveryHead = async (req, res, next) => {
  try {
    const {
      coNo,
      warehouse,
      runningNumberH,
      orderNo,
      orderType,
      grossWeight,
      tranferDate,
      towarehouse,
      routeCode,
      netWeight,
      routeDeparture,
      method,
      departureTime,
    } = req.body;

    //validation
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   const error = new Error("Data is Incorrect");
    //   error.statusCode = 422;
    //   error.validation = errors.array();
    //   throw error;
    // }

    // res.status(201).json({
    //   // route: route,
    //   // item: itemsData,
    //   message: "Created",
    // });
    const route = await fetchRouteDetail(routeCode);
    const policy = await fetchPolicyDistribution(orderType);

    await DeliveryHead.create({
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: policy.EDDPOL, // POLICY
      OQWHLO: warehouse,
      OQINOU: deliveryData[0].DELIVERY_HEAD.OQINOU,
      OQCONA: towarehouse, //OOHEAD.OAWHLO
      // OQCOAA: "ID",
      // OQCOAF: "ID",
      // OQCONB: warehouse, //OOHEAD.OAWHLO
      OQSDES: deliveryData[0].DELIVERY_HEAD.OQSDES, //route.place, // ROUTE PLACE
      OQDSDT: tranferDate, //requestDate, //OOHEAD OARLDT requestDate
      // OQDSHM: 0, // departureTime
      OQTRDT: tranferDate, //OOHEAD OAORDT
      OQTRTM: getCurrentTimeFormatted(), //OOHEAD
      OQSROT: routeCode, //route.routeCode, // ROUTE
      OQSROD: route[0].routeDeparture, //route.routeDeparture, // ROUTE routeDeparture
      OQROUT: routeCode, //route.routeCode, // ROUTE
      OQRODN: route[0].routeDeparture, //route.routeDeparture, // ROUTE routeDeparture
      OQMODL: route[0].method, //customer.OKMODL, empty
      OQMODF: route[0].method, //customer.OKMODL, empty
      // OQTEDL: 0, //customer.OKTEDL, empty
      // OQTEDF: 0, //customer.OKTEDL, empty
      OQRORC: deliveryData[0].DELIVERY_HEAD.OQRORC, // deliveryData[0].DELIVERY_HEAD.OQRORC, // 3 to 5
      // OQTTYP
      OQTTYP: deliveryData[0].DELIVERY_HEAD.OQTTYP, //deliveryData[0].DELIVERY_HEAD.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: deliveryData[0].DELIVERY_HEAD.OQEDES, //route.place, // ROUTE PLACE
      //OQPUTP
      //OQPUSN
      //OQBLOP
      //OQRLFA
      //OQRLTD
      OQPGRS: deliveryData[0].DELIVERY_HEAD.OQPGRS,
      OQPIST: deliveryData[0].DELIVERY_HEAD.OQPIST,
      // OQECAR: 0, //customer.OKECAR,
      OQPONO: routeCode, //shinpping.shippingPoscode,
      // OQULZO: 0, //shinpping.shippingRoute,
      // OQFWNS: 0, //route.forwarding,
      // OQFWNO: 0, //route.forwarding,
      OQIRST: deliveryData[0].DELIVERY_HEAD.OQIRST,
      //OQPCKA
      //OQPLSX
      OQNEWE: netWeight, // netWeight, // OrderLine SUM
      OQDTDT: tranferDate, //requestDate,
      OQGRWE: grossWeight, // OrderLine SUM
      OQTIZO: deliveryData[0].DELIVERY_HEAD.OQTIZO, //OATIZO, // OOHEAD.OATIZO
      OQDTDT: tranferDate, //requestDate, // OOHEAD requestDate
      OQDTHM: route[0].departureTime, //route.departureTime, // departureTime
      OQDOCR: deliveryData[0].DELIVERY_HEAD.OQDOCR, // 1
      OQDOCE: deliveryData[0].DELIVERY_HEAD.OQDOCE, // 1 ** 1 digit in Database TST
      OQDEWD: deliveryData[0].DELIVERY_HEAD.OQDEWD, // 0
      OQSEEQ: deliveryData[0].DELIVERY_HEAD.OQSEEQ, // 50
      OQIVSS: deliveryData[0].DELIVERY_HEAD.OQIVSS, // 0
      OQPRIO: deliveryData[0].DELIVERY_HEAD.OQPRIO, // 5
      // OQCUCL: "", //customer.customerChannel, // OCUSMA
      OQCSCD: deliveryData[0].DELIVERY_HEAD.OQCSCD, //customer.OKCSCD, // OCUSMA
      OQAGKY: `                                        ${deliveryData[0].DELIVERY_HEAD.OQAGKY}${warehouse}${policy.EDDPOL}${route[0].method}   ${routeCode}`, // emthy
      OQRGDT: formatDate(),
      OQRGTM: getCurrentTimeFormatted(),
      OQLMDT: formatDate(),
      OQCHNO: deliveryData[0].DELIVERY_HEAD.OQCHNO,
      OQCHID: deliveryData[0].DELIVERY_HEAD.OQCHID,
      OQSCES: deliveryData[0].DELIVERY_HEAD.OQSCES, //90
      OQLMTS: Date.now(),
    });

    // console.log(test);

    res.status(201).json({
      orderNo: orderNo,
      // item: itemsData,
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertDeliveryLine = async (req, res, next) => {
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
      // const jsonPath = path.join(__dirname, "../../", "Jsons", "delivery.json");
      // let deliveryData = [];
      // if (fs.existsSync(jsonPath)) {
      //   const jsonData = fs.readFileSync(jsonPath, "utf-8");
      //   deliveryData = JSON.parse(jsonData);
      // }
      // const deliveryData = getJsonData("delivery.json");
      // res.json(deliveryData)
      await DeliveryLine.create({
        coNo: item.coNo,
        URDLIX: item.runningNumberH,
        URRORC: deliveryData[0].DELIVERY_HEAD.OQRORC, // MHDISH
        URRIDN: item.orderNo,
        URRIDL: item.itemNo,
        URITNO: item.itemCode,
        URFACI: deliveryData[0].DELIVERY_LINE.URFACI, // json
        URTRQT: item.itemQty, // OrderLine qtyCTN (pcs)
        URSTCD: deliveryData[0].DELIVERY_LINE.URSTCD, // 1
        grossWeight: item.MRGRWE, // OrderLine
        netWeight: item.MRNEWE, // OrderLine
        // URALUN OrderLine
        URALUN: item.itemUnit,
        URRGDT: formatDate(),
        URRGTM: getCurrentTimeFormatted(),
        URLMDT: formatDate(),
        URCHNO: deliveryData[0].DELIVERY_LINE.URCHNO,
        URCHID: deliveryData[0].DELIVERY_LINE.URCHID,
        URLMTS: Date.now(),
        URSCES: deliveryData[0].DELIVERY_HEAD.OQSCES, // MHDISH
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
