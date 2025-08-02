// Models
const { DeliveryHead, DeliveryLine } = require('../../models/delivery')
// Service
const {
  fetchShipping,
  fetchCustomer
} = require('../../services/customerService')
const { fetchPolicy } = require('../../services/policyService')
const { fetchRoute } = require('../../services/routeService')
// Utils
const { trimObjectStrings } = require('../../utils/String')
const {
  formatDate,
  getCurrentTimeFormatted
} = require('../../utils/getDateTime')
const { getJsonData } = require('../../utils/getJsonData')
// Json
const deliveryData = getJsonData('delivery.json')
// Middleware
const errorEndpoint = require('../../middleware/errorEndpoint')
const path = require('path')
const currentFilePath = path.basename(__filename)

exports.index = async (req, res, next) => {}

exports.getDeliveryHead = async (req, res, next) => {
  try {
    const { orderNo } = req.body
    const headData = await DeliveryHead.findOne({
      where: {
        coNo: 410,
        OQRIDN: orderNo
      }
    })
    if (headData) {
      const response = trimObjectStrings(headData.toJSON())
      res.status(200).json(response)
    } else {
      const error = new Error('Not Found Address')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
}

exports.getDeliveryLine = async (req, res, next) => {
  try {
    const { orderNo } = req.body
    const lineData = await DeliveryLine.findAll({
      where: {
        coNo: 410,
        URRIDN: orderNo
      }
    })
    const response = lineData.map(item => trimObjectStrings(item.toJSON()))
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

exports.deliveryHeadInsert = async (data, transaction) => {
  try {
    const {
      coNo,
      warehouse,
      runningNumberH,
      orderNo,
      orderType,
      customerNo,
      addressID,
      grossWeight,
      netWeight,
      orderDate,
      requestDate
    } = data
    const policy = await fetchPolicy(orderType)
    const customer = await fetchCustomer(customerNo)
    const shinpping = await fetchShipping({
      customerNo: customerNo,
      addressID: addressID
    })

    // console.log('Customer_DAWD' + policy)
    const route = await fetchRoute(shinpping.shippingRoute)
    
    await DeliveryHead.create(
      {
        coNo: coNo,
        OQDLIX: runningNumberH,
        OQDPOL: policy.EDDPOL, // POLICY
        OQWHLO: warehouse,
        OQINOU: deliveryData[0].HEAD.OQINOU,
        OQCONA: customerNo, //OOHEAD.OAWHLO
        OQCOAA: addressID,
        OQCOAF: addressID,
        OQCONB: warehouse, //OOHEAD.OAWHLO
        OQSDES: route.place, // ROUTE PLACE
        OQDSDT: requestDate, //OOHEAD OARLDT requestDate
        OQDSHM: route.departureTime, // departureTime
        OQTRDT: orderDate, //OOHEAD OAORDT
        OQTRTM: getCurrentTimeFormatted(), //OOHEAD
        OQSROT: route.routeCode, // ROUTE
        OQSROD: route.routeDeparture, // ROUTE routeDeparture
        OQROUT: route.routeCode, // ROUTE
        OQRODN: route.routeDeparture, // ROUTE routeDeparture
        OQMODL: customer.OKMODL,
        OQMODF: customer.OKMODL,
        OQTEDL: customer.OKTEDL,
        OQTEDF: customer.OKTEDL,
        OQRORC: deliveryData[0].HEAD.OQRORC, // 3
        OQTTYP: deliveryData[0].HEAD.OQTTYP,
        OQAGKY: `                                        ${deliveryData[0].HEAD.OQINOU}${deliveryData[0].HEAD.OQRORC}${warehouse}${policy.EDDPOL}${customer.OKMODL}${customer.OKTEDL}${route.routeCode}`,
        OQRIDN: orderNo,
        OQEDES: route.place, // ROUTE PLACE
        //OQPUTP
        //OQPUSN
        //OQBLOP
        OQRLFA: policy.EDRLFA,
        OQRLTD: policy.EDRLTD,
        OQPGRS: deliveryData[0].HEAD.OQPGRS,
        OQPIST: deliveryData[0].HEAD.OQPIST,
        OQECAR: customer.OKECAR,
        OQPONO: shinpping.shippingPoscode,
        OQULZO: shinpping.shippingRoute,
        OQFWNS: route.forwarding,
        OQFWNO: route.forwarding,
        OQIRST: deliveryData[0].HEAD.OQIRST,
        //OQPCKA
        //OQPLSX
        OQNEWE: netWeight, // OrderLine SUM
        OQGRWE: grossWeight, // OrderLine SUM
        OQTIZO: deliveryData[0].HEAD.OQTIZO, // OOHEAD.OATIZO
        OQDTDT: requestDate, // OOHEAD requestDate
        OQDTHM: route.departureTime, // departureTime
        OQDOCR: policy.EDDOCR, // 1
        OQDOCE: deliveryData[0].HEAD.OQDOCE, // 1 ** 1 digit in Database TST
        OQDEWD: deliveryData[0].HEAD.OQDEWD, // 0
        OQSEEQ: policy.EDSEEQ, // 50
        // OQIVSS: deliveryData[0].HEAD.OQIVSS, // 0
        OQPRIO: deliveryData[0].HEAD.OQPRIO, // 5
        OQCUCL: customer.customerChannel, // OCUSMA
        OQCSCD: customer.OKCSCD, // OCUSMA
        OQRGDT: formatDate(),
        OQRGTM: getCurrentTimeFormatted(),
        OQLMDT: formatDate(),
        OQCHNO: deliveryData[0].HEAD.OQCHNO,
        OQCHID: deliveryData[0].HEAD.OQCHID,
        OQSCES: deliveryData[0].HEAD.OQSCES, //90
        OQLMTS: Date.now()
      },
      {
        transaction
      }
    )
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'deliveryHeadInsert', error)
  }
}

exports.deliveryLineInsert = async (itemData, transaction) => {
  // let transaction;
  try {
    // transaction = await sequelize.transaction();
    const items = itemData

    for (let item of items) {
      await DeliveryLine.create(
        {
          coNo: item.coNo,
          URDLIX: item.runningNumberH,
          URRORC: deliveryData[0].HEAD.OQRORC, // MHDISH
          URRIDN: item.orderNo,
          URRIDL: item.itemNo,
          URITNO: item.itemCode,
          URFACI: deliveryData[0].LINE.URFACI, // json
          URTRQT: item.qtyQT, // OrderLine qty (pcs)
          URSTCD: item.OBSTCD, // 1
          grossWeight: item.grossWeightSingle, // OrderLine
          netWeight: item.netWeightSingle, // OrderLine
          // URALUN OrderLine
          URALUN: item.unit,
          URRGDT: formatDate(),
          URRGTM: getCurrentTimeFormatted(),
          URLMDT: formatDate(),
          URCHNO: deliveryData[0].LINE.URCHNO,
          URCHID: deliveryData[0].LINE.URCHID,
          URLMTS: Date.now(),
          URSCES: deliveryData[0].HEAD.OQSCES // MHDISH
        },
        {
          transaction
        }
      )
    }
    // res.status(201).json({ message: "Created" });
  } catch (error) {
    throw errorEndpoint(currentFilePath, 'deliveryLineInsert', error)
    // next(error);
  }
}
