const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { HOST } = require("../../config/index");
const axios = require("axios");
const { PrepareInvoA, PrepareInvoB } = require("../../models/prepareinvoice");
const now = new Date();
const currentYear = now.getFullYear();
exports.index = async (req, res, next) => {};

exports.insertA = async (req, res, next) => {
  try {
    const items = req.body.items;
    let productNo = 1;
    // const prepareData = items.map((item) => {
    //   const result = {
    //     ...item, // Spread the properties of the original item
    //     productNo: productNo, // Add the productNo property
    //   };
    //   productNo++;
    //   return result;
    // });

    // res.json(prepareData);
    for (let item of items) {
      let calWight = await axios({
        method: "post",
        url: `${HOST}master/calwight`,
        data: {
          itemNo: item.itemNo,
          qty: item.qty,
        },
      });
      let calCost = await axios({
        method: "post",
        url: `${HOST}master/calcost`,
        data: {
          itemNo: item.itemNo,
          qty: item.qty,
        },
      });
      let itemData = await axios({
        method: "post",
        url: `${HOST}master/itemsingle`,
        data: {
          itemNo: item.itemNo,
        },
      });
      let itemUnitData = await axios({
        method: "post",
        url: `${HOST}master/unit`,
        data: {
          itemNo: item.itemNo,
          unit: item.unit,
          facTyitempe: 1,
        },
      });
      let customerData = await axios({
        method: "post",
        url: `${HOST}customer/single`,
        data: {
          customerNo: item.customerNo,
        },
      });
      await PrepareInvoA.create({
        coNo: item.coNo,
        OUDIVI: item.coNo,
        OUFACI: item.OBDIVI,
        orderNo: item.orderNo,
        productNo: item.productNo,
        OUOSSQ: 1,
        OUOSDT: formatDate(),
        OUOSPE: 202112,
        customerNo: item.customerNo,
        customerChannel: customerData.data[0].customerChannel,
        OUCUST: 100000001,
        orderType: item.orderType,
        payer: item.payer,
        OUCUCD: "THB",
        saleCode: customerData.data[0].saleCode,
        OUCSCD: "TH ",
        OUFRE1: "YSEND",
        warehouse: item.warehouse,
        itemNo: item.itemNo,
        OUITGR: itemData.data[0].MMITGR,
        itemType: itemData.data[0].itemType,
        OUITCL: itemData.data[0].MMITCL,
        OUORST: item.orderStatus,
        OUORQT: itemUnitData.data[0].factor * item.qty,
        OUORQA: item.qty,
        unit: item.unit,
        OUCOFA: 1,
        OUDMCF: 1,
        OUSPUN: item.unit,
        OUORQS: 2,
        OUSTUN: item.unit,
        OUORQB: 2,
        grossWight: calWight.data[0].grossWight,
        netWight: calWight.data[0].netWight,
        OUDCCD: 2,
        OUSAPR: 70,
        OUGRPR: 140,
        OUSAAM: 140,
        OUPRMO: 8,
        OUDISY: "CREDIT 18 ",
        OUDWDT: formatDate(),
        OUCODT: formatDate(),
        OUUCOS: calCost.data[0].cost,
        OUUCCD: 1,
        OUUNMS: item.unit,
        OUORTK: 1,
        addressID: item.addressID,
        OUINRC: 100000001,
        OURGDT: formatDate(),
        OURGTM: 501,
        OULMDT: formatDate(),
        OUCHNO: 2,
        OUCHID: "MVXSECOFR ",
        OULMTS: Date.now(),
        OUACOS: 73,
        OUTEPY: 30,
        OUDECU: 100000001,
        OURQWH: 904,
      });
    }
    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertB = async (req, res, next) => {
  try {
    const items = req.body.items;
    for (let item of items) {
      let calWight = await axios({
        method: "post",
        url: `${HOST}master/calwight`,
        data: {
          itemNo: item.itemNo,
          qty: item.qty,
        },
      });
      let calCost = await axios({
        method: "post",
        url: `${HOST}master/calcost`,
        data: {
          itemNo: item.itemNo,
          qty: item.qty,
        },
      });
      let itemData = await axios({
        method: "post",
        url: `${HOST}master/itemsingle`,
        data: {
          itemNo: item.itemNo,
        },
      });
      let itemUnitData = await axios({
        method: "post",
        url: `${HOST}master/unit`,
        data: {
          itemNo: item.itemNo,
          unit: item.unit,
          facTyitempe: 1,
        },
      });
      let customerData = await axios({
        method: "post",
        url: `${HOST}customer/single`,
        data: {
          customerNo: item.customerNo,
        },
      });

      await PrepareInvoB.create({
        coNo: item.coNo,
        UCDIVI: item.OBDIVI,
        UCFACI: item.OBFACI,
        orderNo: item.orderNo,
        UCDLIX: 256144,
        productNo: item.productNo,
        UCIVNO: 121024301,
        UCORDT: formatDate(),
        UCDWDT: formatDate(),
        UCCODT: formatDate(),
        UCDLDT: formatDate(),
        UCIVDT: formatDate(),
        UCYEA4: currentYear,
        UCACDT: formatDate(),
        customerNo: item.customerNo,
        customerChannel: customerData.data[0].customerChannel,
        UCCUST: 100000001,
        orderType: item.orderType,
        payer: item.payer,
        UCCUCD: "THB",
        UCRAIN: 1,
        UCDMCU: 1,
        saleCode: 11000,
        UCCSCD: "TH ",
        UCFRE1: "YSEND",
        warehouse: item.warehouse,
        itemNo: item.itemNo,
        UCITGR: itemData.data[0].MMITGR,
        itemType: itemData.data[0].itemType,
        UCITCL: itemData.data[0].MMITCL,
        UCSTUN: item.unit,
        UCALUN: item.unit,
        UCSPUN: item.unit,
        UCPRMO: 8,
        UCDISY: "CREDIT 18 ",
        UCUCCD: 1,
        UCORTK: 1,
        addressID: item.addressID,
        UCIVQT: 2,
        UCOFQS: 2,
        UCIVQA: 2,
        UCIVQS: 2,
        UCORQT: 2,
        UCORQS: 2,
        UCORQA: 2,
        UCORQB: 2,
        grossWight: calWight.data[0].grossWight,
        netWight: calWight.data[0].netWight,
        UCSAAM: 140,
        UCSGAM: 163,
        UCCUAM: 140,
        UCUCOS: 73,
        UCDCOS: 73,
        UCDDF1: -1,
        UCDDF4: 1,
        UCTDEL: 1,
        UCTORL: 1,
        UCRQTY: 1,
        UCMPRO: 1,
        UCINRC: 100000001,
        UCROUT: "NKP007",
        UCRODN: 24,
        UCRGDT: formatDate(),
        UCRGTM: 3046,
        UCLMDT: formatDate(),
        UCCHNO: 4,
        UCCHID: "MVXSECOFR ",
        UCINPX: currentYear + 543,
        UCEXIN: 2564121024300,
        UCLMTS: Date.now(),
        UCACOS: 73,
        UCTEPY: 30,
        UCDECU: 100000001,
        UCRQWH: 904,
      });
    }

    res.status(201).json("Created");
  } catch (error) {
    next(error);
  }
};
