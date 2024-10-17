// Models
const { DeliveryHead, DeliveryLine } = require("../../models/delivery");
// Service
const { fetchRouteCode } = require("../../services/routeService");
const { fetchDistributionPolicy } = require("../../services/policyService");
// Utils
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../utils/getDateTime");
const { getJsonData } = require("../../utils/getJsonData");
// Json
const deliveryData = getJsonData("distribution.json");
// Middleware
const errorEndpoint = require("../../middleware/errorEndpoint");
const path = require("path");
const currentFilePath = path.basename(__filename);

exports.distributionDeliveryHead = async (data, transaction) => {
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
    } = data;

    const route = await fetchRouteCode(routeCode);
    const policy = await fetchDistributionPolicy(orderType);

    // res.status(200).json(route)
    let deliveryobj = {
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: policy.YXDPOL, // POLICY
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
      OQRORC: String(policy.YXTTYP).slice(0, 1), // deliveryData[0].DELIVERY_HEAD.OQRORC, // 3 to 5
      OQTTYP: String(policy.YXTTYP), //deliveryData[0].DELIVERY_HEAD.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: deliveryData[0].DELIVERY_HEAD.OQEDES, //route.place, // ROUTE PLACE
      //OQPUTP
      //OQPUSN
      //OQBLOP
      //OQRLFA
      //OQRLTD
      OQPGRS: deliveryData[0].DELIVERY_HEAD.OQPGRS, // 00
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
      OQTIZO: deliveryData[0].DELIVERY_HEAD.OQTIZO, 
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
      OQAGKY: `                                        ${
        deliveryData[0].DELIVERY_HEAD.OQINOU
      }${String(policy.YXTTYP).slice(0, 1)}${warehouse}${policy.YXDPOL}${
        route[0].method
      }   ${routeCode}`, // emthy
      OQRGDT: formatDate(),
      OQRGTM: getCurrentTimeFormatted(),
      OQLMDT: formatDate(),
      OQCHNO: deliveryData[0].DELIVERY_HEAD.OQCHNO,
      OQCHID: deliveryData[0].DELIVERY_HEAD.OQCHID,
      OQSCES: deliveryData[0].DELIVERY_HEAD.OQSCES, //90
      OQLMTS: Date.now(),
    };
    switch (orderType.slice(0, 1)) {
      case "T":
        await DeliveryHead.create(deliveryobj, {
          transaction,
        });
        break;
      case "I":
        deliveryobj.OQDEWD = "3";
        await DeliveryHead.create(deliveryobj, {
          transaction,
        });
        break;
      case "R":
        deliveryobj.OQINOU = "2";
        deliveryobj.OQDEWD = "4";
        await DeliveryHead.create(deliveryobj, {
          transaction,
        });
        break;
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Distribution Delivery Head:", error);
  }
};

exports.distributionDeliveryLine = async (data, transaction) => {
  try {
    const items = data;
    for (let item of items) {
      await DeliveryLine.create(
        {
          coNo: item.coNo,
          URDLIX: item.runningNumberH,
          URRORC: deliveryData[0].DELIVERY_HEAD.OQRORC, // MHDISH
          URRIDN: item.orderNo,
          URRIDL: item.itemNo,
          URITNO: item.itemCode,
          URFACI: deliveryData[0].DELIVERY_LINE.URFACI, // json
          URTRQT: item.itemQty, // OrderLine qty (pcs)
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
        },
        {
          transaction,
        }
      );
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Distribution Delivery Line:", error);
  }
};
