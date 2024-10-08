// Models
const { PrepareInvoA, PrepareInvoB } = require("../../models/prepareinvoice");
// Utils
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../utils/getDateTime");
const { nonVat } = require("../../utils/calVat");
const { getJsonData } = require("../../utils/getJsonData");
const { trimObjectStrings } = require("../../utils/String");
// Middleware
const errorEndpoint = require("../../middleware/errorEndpoint");
const path = require("path");
const currentFilePath = path.basename(__filename);
exports.index = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    const itemData = await PrepareInvoA.findAll({
      where: {
        coNo: 410,
        orderNo: orderNo,
      },
    });
    const response = itemData.map((item) => trimObjectStrings(item.toJSON()));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
exports.prepareInvoiceInsertA = async (itemData, transaction, next) => {
  // let transaction;
  try {
    // transaction = await sequelize.transaction();
    const items = itemData;
    let prepareJson = getJsonData("prepareinvoice.json");
    // let prepareJson;
    for (let item of items) {
      await PrepareInvoA.create(
        {
          coNo: item.coNo,
          OUDIVI: item.OBDIVI,
          OUFACI: prepareJson[0].HEAD.OUFACI,
          orderNo: item.orderNo,
          itemNo: item.itemNo,
          OUOSSQ: prepareJson[0].HEAD.OUOSSQ,
          OUOSDT: item.orderDate, // OOHEAD.OAORDT
          OUOSPE: parseInt(item.orderDate.toString().slice(0, 6)), // OOHEAD.OAORDT 6 digit font
          customerNo: item.customerNo,
          customerChannel: item.customerChannel, // OrderLine *ไม่มีใน OrderLine และ OOHEAD
          OUCUST: item.customerNo, // customerNo
          orderType: item.orderType, //
          payer: item.payer,
          OUCUCD: item.OACUCD, // OOHEAD
          saleCode: item.OBSMCD, // OOHEAD
          OUSDST: item.zone,
          OUCSCD: item.OBORCO, // OOHEAD   **OOHEAD but OrderLine.OBORCO
          OUFRE1: item.OAFRE1, // OOHEAD
          warehouse: item.warehouse,
          itemCode: item.itemCode,
          OUITGR: item.OUITGR,
          itemType: item.itemType,
          OUITCL: item.OUITCL,
          OUORST: item.orderStatusLow,
          OUORQT: item.qtyQT, // OrderLine QT = PCS
          OUORQA: item.qty,
          unit: item.unit,
          OUCOFA: item.OBCOFA, // OrderLine
          OUDMCF: prepareJson[0].HEAD.OUDMCF, // 1
          OUSPUN: item.OBSPUN, // Bigest
          OUORQS: item.qty, // OrderLine CTN
          OUSTUN: item.OUSTUN, // ** smallest
          grossWeight: item.grossWeight, // OrderLine
          netWeight: item.netWeight, // OrderLine
          OUDCCD: prepareJson[0].HEAD.OUDCCD, // 2
          OUSAPR: nonVat(item.price), //non vat OrderLine.OBSAPR
          OUGRPR: nonVat(item.price * item.qty), //non vat OrderLine OBNEPR
          OUSAAM: nonVat(item.netPrice * item.qty), //OrderLine OBLNAM
          OUPRMO: prepareJson[0].HEAD.OUPRMO, // 8
          OUDISY: prepareJson[0].HEAD.OUDISY, //OOHEAD
          // add OrderLine OBDIC 1-6 use 2,5 other defult 1
          // OUDIA2  OrderLine non vat OBDIA2 * OBORQA
          // OUOFRA  OrderLine non vat OBDIA2 * OBORQA
          // OrderLine non vat OBDIA2 * OBORQA
          OUDIA2: nonVat(item.discount * item.qty), //OrderLine non vat OBDIA2 * OBORQA
          OUOFRA: nonVat(item.discount * item.qty),
          OUDWDT: item.requestDate, //OOHEAD OARLDT
          OUCODT: item.requestDate, //OOHEAD OARLDT
          OUUCOS: item.costPCS.toFixed(2), //OrderLine OBUCOS * OBORQT
          OUUCCD: prepareJson[0].HEAD.OUUCCD, // 1
          OUUNMS: item.OUSTUN, // หน่วยเล็กสุดของ item
          OUORTK: prepareJson[0].HEAD.OUORTK, // 1
          addressID: item.addressID,
          OUSDEP: "",
          OUBUAR: "",
          OUINRC: item.customerNo, // customer
          OURGDT: formatDate(),
          OURGTM: getCurrentTimeFormatted(),
          OULMDT: formatDate(),
          OUCHNO: prepareJson[0].HEAD.OUCHNO, // 1
          OUCHID: prepareJson[0].HEAD.OUCHID,
          // OUCAWE
          OULMTS: Date.now(),
          OUACOS: item.costPCS, //OrderLine OBUCOS * OBORQT
          OUTEPY: item.OBTEPY, //OCUSMA
          OUDECU: item.customerNo, // customer
          OURQWH: item.warehouse, // warehouse
        },
        {
          transaction,
        }
      );
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Prepare Invoice:", error);
  }
};

// exports.insertB = async (req, res, next) => {
//   try {
//     const items = req.body.items;
//     for (let item of items) {
//       let calWeight = await axios({
//         method: "post",
//         url: `${HOST}master/calWeight`,
//         data: {
//           itemCode: item.itemCode,
//           qty: item.qty,
//         },
//       });
//       let calCost = await axios({
//         method: "post",
//         url: `${HOST}master/calcost`,
//         data: {
//           itemCode: item.itemCode,
//           qty: item.qty,
//         },
//       });
//       let itemData = await axios({
//         method: "post",
//         url: `${HOST}master/itemsingle`,
//         data: {
//           itemCode: item.itemCode,
//         },
//       });
//       let itemUnitData = await axios({
//         method: "post",
//         url: `${HOST}master/unit`,
//         data: {
//           itemCode: item.itemCode,
//           unit: item.unit,
//           facTyitempe: 1,
//         },
//       });
//       let customerData = await axios({
//         method: "post",
//         url: `${HOST}customer/single`,
//         data: {
//           customerNo: item.customerNo,
//         },
//       });

//       await PrepareInvoB.create({
//         coNo: item.coNo,
//         UCDIVI: item.OBDIVI,
//         UCFACI: item.OBFACI,
//         orderNo: item.orderNo,
//         UCDLIX: 256144,
//         itemNo: item.itemNo,
//         UCIVNO: 121024301,
//         UCORDT: formatDate(),
//         UCDWDT: formatDate(),
//         UCCODT: formatDate(),
//         UCDLDT: formatDate(),
//         UCIVDT: formatDate(),
//         UCYEA4: currentYear,
//         UCACDT: formatDate(),
//         customerNo: item.customerNo,
//         customerChannel: customerData.data[0].customerChannel,
//         UCCUST: 100000001,
//         orderType: item.orderType,
//         payer: item.payer,
//         UCCUCD: "THB",
//         UCRAIN: 1,
//         UCDMCU: 1,
//         saleCode: 11000,
//         UCCSCD: "TH ",
//         UCFRE1: "YSEND",
//         warehouse: item.warehouse,
//         itemCode: item.itemCode,
//         UCITGR: itemData.data[0].itemGroup,
//         itemType: itemData.data[0].itemType,
//         UCITCL: itemData.data[0].itemClass,
//         UCSTUN: item.unit,
//         UCALUN: item.unit,
//         UCSPUN: item.unit,
//         UCPRMO: 8,
//         UCDISY: "CREDIT 18 ",
//         UCUCCD: 1,
//         UCORTK: 1,
//         addressID: item.addressID,
//         UCIVQT: 2,
//         UCOFQS: 2,
//         UCIVQA: 2,
//         UCIVQS: 2,
//         UCORQT: 2,
//         UCORQS: 2,
//         UCORQA: 2,
//         UCORQB: 2,
//         grossWeight: calWeight.data[0].grossWeight,
//         netWeight: calWeight.data[0].netWeight,
//         UCSAAM: 140,
//         UCSGAM: 163,
//         UCCUAM: 140,
//         UCUCOS: 73,
//         UCDCOS: 73,
//         UCDDF1: -1,
//         UCDDF4: 1,
//         UCTDEL: 1,
//         UCTORL: 1,
//         UCRqty: 1,
//         UCMPRO: 1,
//         UCINRC: 100000001,
//         UCROUT: "NKP007",
//         UCRODN: 24,
//         UCRGDT: formatDate(),
//         UCRGTM: 3046,
//         UCLMDT: formatDate(),
//         UCCHNO: 4,
//         UCCHID: "MVXSECOFR ",
//         UCINPX: currentYear + 543,
//         UCEXIN: 2564121024300,
//         UCLMTS: Date.now(),
//         UCACOS: 73,
//         UCTEPY: 30,
//         UCDECU: 100000001,
//         UCRQWH: 904,
//       });
//     }

//     res.status(201).json("Created");
//   } catch (error) {
//     next(error);
//   }
// };
