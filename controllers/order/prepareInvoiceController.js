const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { HOST } = require("../../config/index");
const axios = require("axios");
const { PrepareInvoA, PrepareInvoB } = require("../../models/prepareinvoice");
const now = new Date();
const currentYear = now.getFullYear();
const fs = require("fs");
const path = require("path");
const { totalNonVat, nonVat } = require("../../middleware/calVat");

exports.index = async (req, res, next) => {};

exports.insertA = async (req, res, next) => {
  try {
    const items = req.body.items;

    const jsonPathOrder = path.join(
      __dirname,
      "../../",
      "Jsons",
      "prepareinvoice.json"
    );
    let prepareJson = [];

    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      prepareJson = JSON.parse(jsonDataOrder);
    }
    for (let item of items) {
      let itemData = await axios({
        method: "post",
        url: `${HOST}master/itemdetails`,
        data: {
          itemCode: item.itemCode,
        },
      });

      let itemUnitMinData = await axios({
        method: "post",
        url: `${HOST}master/unitmin`,
        data: {
          itemCode: item.itemCode,
        },
      });

      let itemUnitMaxData = await axios({
        method: "post",
        url: `${HOST}master/unitmax`,
        data: {
          itemCode: item.itemCode,
        },
      });
      

      let customerData = await axios({
        method: "post",
        url: `${HOST}customer/single`,
        data: {
          customerNo: item.customerNo,
        },
      });

      // console.log(nonVat(item.OBUCOS * item.qtyCTN));

      await PrepareInvoA.create({
        coNo: item.coNo,
        OUDIVI: item.OBDIVI,
        OUFACI: "F10",
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        OUOSSQ: prepareJson[0].HEAD.OUOSSQ,
        OUOSDT: item.orderDate, // OOHEAD.OAORDT
        OUOSPE: parseInt(item.orderDate.toString().slice(0, 6)), // OOHEAD.OAORDT 6 digit font
        customerNo: item.customerNo,
        customerChannel: customerData.data[0].customerChannel, // OrderLine *ไม่มีใน OrderLine และ OOHEAD
        OUCUST: item.customerNo, // customerNo
        orderType: item.orderType, //
        payer: item.payer,
        OUCUCD: item.OACUCD, // OOHEAD
        saleCode: customerData.data[0].saleCode, // OOHEAD
        // OUSDST
        OUCSCD: item.OBORCO, // OOHEAD   **OOHEAD but OrderLine.OBORCO
        OUFRE1: item.OAFRE1, // OOHEAD
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        OUITGR: itemData.data[0].MMITGR,
        itemType: itemData.data[0].itemType,
        OUITCL: itemData.data[0].MMITCL,
        OUORST: item.orderStatus,
        OUORQT: item.qtyPCS, // OrderLine QT = PCS
        OUORQA: item.qtyCTN,
        unit: item.unit,
        OUCOFA: item.OBCOFA, // OrderLine
        OUDMCF: prepareJson[0].HEAD.OUDMCF, // 1
        OUSPUN: itemUnitMaxData.data[0].unit, // Bigest
        OUORQS: item.qtyCTN, // OrderLine CTN
        OUSTUN: itemUnitMinData.data[0].unit, // ** smallest
        grossWeight: item.grossWeight, // OrderLine
        netWeight: item.netWeight, // OrderLine
        OUDCCD: prepareJson[0].HEAD.OUDCCD, // 2
        OUSAPR: nonVat(item.price), //non vat OrderLine.OBSAPR
        OUGRPR: nonVat(item.price * item.qtyCTN), //non vat OrderLine OBNEPR
        OUSAAM: nonVat(item.netPrice * item.qtyCTN), //OrderLine OBLNAM
        OUPRMO: prepareJson[0].HEAD.OUPRMO, // 8
        OUDISY: item.OUDISY, //OOHEAD
        // add OrderLine OBDIC 1-6 use 2,5 other defult 1
        // OUDIA2  OrderLine non vat OBDIA2 * OBORQA
        // OUOFRA  OrderLine non vat OBDIA2 * OBORQA
        // OrderLine non vat OBDIA2 * OBORQA
        OUDIA2: nonVat(item.discount * item.qtyCTN), //OrderLine non vat OBDIA2 * OBORQA
        OUOFRA: nonVat(item.discount * item.qtyCTN),
        OUDWDT: item.requesetDate, //OOHEAD OARLDT
        OUCODT: item.requesetDate, //OOHEAD OARLDT
        OUUCOS: item.costPCS, //OrderLine OBUCOS * OBORQT
        OUUCCD: prepareJson[0].HEAD.OUUCCD, // 1
        OUUNMS: itemUnitMinData.data[0].unit, // หน่วยเล็กสุดของ item
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
        OUTEPY: customerData.data[0].creditTerm, //OCUSMA
        OUDECU: item.customerNo, // customer
        OURQWH: item.warehouse, // warehouse
      });
    }
    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
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
//           qtyCTN: item.qtyCTN,
//         },
//       });
//       let calCost = await axios({
//         method: "post",
//         url: `${HOST}master/calcost`,
//         data: {
//           itemCode: item.itemCode,
//           qtyCTN: item.qtyCTN,
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
//         UCITGR: itemData.data[0].MMITGR,
//         itemType: itemData.data[0].itemType,
//         UCITCL: itemData.data[0].MMITCL,
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
//         UCRqtyCTN: 1,
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
