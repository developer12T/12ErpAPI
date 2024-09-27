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
} = require("../../middleware/apiMaster");
const { fetchRoutes } = require("../../middleware/apiRoutes");
const deliveryData = getJsonData("delivery.json");

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
    } = req.body;

    //validation
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   const error = new Error("Data is Incorrect");
    //   error.statusCode = 422;
    //   error.validation = errors.array();
    //   throw error;
    // }

    const policy = await fetchPolicyDistribution(orderType);

    await DeliveryHead.create({
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: policy.EDDPOL, // POLICY
      OQWHLO: warehouse,
      OQINOU: deliveryData[0].HEAD.OQINOU,
      OQCONA: towarehouse, //OOHEAD.OAWHLO
      // OQCOAA: "ID",
      // OQCOAF: "ID",
      // OQCONB: warehouse, //OOHEAD.OAWHLO
      OQSDES: "TH00000", //route.place, // ROUTE PLACE
      OQDSDT: tranferDate, //requestDate, //OOHEAD OARLDT requestDate
      OQDSHM: 0, // departureTime
      OQTRDT: tranferDate, //OOHEAD OAORDT
      OQTRTM: getCurrentTimeFormatted(), //OOHEAD
      OQSROT: "CT213", //route.routeCode, // ROUTE
      OQSROD: 0, //route.routeDeparture, // ROUTE routeDeparture
      OQROUT: "CT213", //route.routeCode, // ROUTE
      // OQRODN: 0, //route.routeDeparture, // ROUTE routeDeparture
      // OQMODL: 0, //customer.OKMODL, empty
      // OQMODF: 0, //customer.OKMODL, empty
      // OQTEDL: 0, //customer.OKTEDL, empty
      // OQTEDF: 0, //customer.OKTEDL, empty
      OQRORC: 5, // deliveryData[0].HEAD.OQRORC, // 3 to 5
      // OQTTYP
      OQTTYP: 51, //deliveryData[0].HEAD.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: "TH00000", //route.place, // ROUTE PLACE
      //OQPUTP
      //OQPUSN
      //OQBLOP
      //OQRLFA
      //OQRLTD
      OQPGRS: deliveryData[0].HEAD.OQPGRS,
      OQPIST: deliveryData[0].HEAD.OQPIST,
      OQECAR: 0, //customer.OKECAR,
      OQPONO: 0, //shinpping.shippingPoscode,
      OQULZO: 0, //shinpping.shippingRoute,
      OQFWNS: 0, //route.forwarding,
      OQFWNO: 0, //route.forwarding,
      OQIRST: deliveryData[0].HEAD.OQIRST,
      //OQPCKA
      //OQPLSX
      OQNEWE: 0, // netWeight, // OrderLine SUM
      OQDTDT: tranferDate, //requestDate,
      OQGRWE: grossWeight, // OrderLine SUM
      OQTIZO: 0, //OATIZO, // OOHEAD.OATIZO
      OQDTDT: "20240603", //requestDate, // OOHEAD requestDate
      OQDTHM: 2359, //route.departureTime, // departureTime
      OQDOCR: deliveryData[0].HEAD.OQDOCR, // 1
      OQDOCE: deliveryData[0].HEAD.OQDOCE, // 1 ** 1 digit in Database TST
      OQDEWD: deliveryData[0].HEAD.OQDEWD, // 0
      OQSEEQ: deliveryData[0].HEAD.OQSEEQ, // 50
      // OQIVSS: deliveryData[0].HEAD.OQIVSS, // 0
      OQPRIO: deliveryData[0].HEAD.OQPRIO, // 5
      OQCUCL: "", //customer.customerChannel, // OCUSMA
      OQCSCD: "", //customer.OKCSCD, // OCUSMA
      OQAGKY: deliveryData[0].HEAD.OQAGKY, // emthy
      OQRGDT: formatDate(),
      OQRGTM: getCurrentTimeFormatted(),
      OQLMDT: formatDate(),
      OQCHNO: deliveryData[0].HEAD.OQCHNO,
      OQCHID: deliveryData[0].HEAD.OQCHID,
      OQSCES: deliveryData[0].HEAD.OQSCES, //90
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
        URRORC: deliveryData[0].HEAD.OQRORC, // MHDISH
        URRIDN: item.orderNo,
        URRIDL: item.itemNo,
        URITNO: item.itemCode,
        URFACI: deliveryData[0].LINE.URFACI, // json
        URTRQT: item.itemQty, // OrderLine qtyCTN (pcs)
        URSTCD: deliveryData[0].LINE.URSTCD, // 1
        grossWeight: item.MRGRWE, // OrderLine
        // netWeight: item.netWeightSingle, // OrderLine
        // URALUN OrderLine
        URALUN: item.itemUnit,
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
