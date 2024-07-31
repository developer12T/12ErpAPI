const { DeliverySH, DeliverySL } = require("../../models/delivery");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { sequelize } = require("../../config/m3db");
const fs = require("fs");
const path = require("path");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");

exports.index = async (req, res, next) => {};

exports.insertL = async (req, res, next) => {
  try {
    const items = req.body.items;
    for (let item of items) {
      const jsonPath = path.join(
        __dirname,
        "../../",
        "Jsons",
        "deliverySL.json"
      );
      let deliveryLData = [];
      if (fs.existsSync(jsonPath)) {
        const jsonData = fs.readFileSync(jsonPath, "utf-8");
        deliveryLData = JSON.parse(jsonData);
      }
      await DeliverySL.create({
        coNo: item.coNo,
        URDLIX: item.runningNumberH,
        URRORC: deliveryLData.URRORC,
        URRIDN: item.orderNo,
        URRIDL: item.itemNo,
        URITNO: item.itemCode,
        URFACI: deliveryLData.URFACI,
        URTRQT: deliveryLData.URTRQT,
        URSTCD: deliveryLData.URSTCD,
        URGRWE: deliveryLData.URGRWE,
        URNEWE: deliveryLData.URNEWE,
        URRGDT: formatDate(),
        URRGTM: getCurrentTimeFormatted(),
        URLMDT: formatDate(),
        URCHNO: deliveryLData.URCHNO,
        URCHID: deliveryLData.URCHID,
        URLMTS: Date.now(),
        URSCES: deliveryLData.URSCES,
      });

    }

    res.status(201).json("Created");
  } catch (error) {
    next(error);
  }
};

exports.insertH = async (req, res, next) => {
  try {
    const { coNo,warehouse, runningNumberH,orderNo } = req.body;

    const jsonPath = path.join(__dirname, "../../", "Jsons", "deliverySH.json");
    let deliveryHData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      deliveryHData = JSON.parse(jsonData);
    }
    await DeliverySH.create({
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: deliveryHData.OQDPOL,
      OQWHLO: warehouse,
      OQINOU: deliveryHData.OQINOU,
      OQCONA: deliveryHData.OQCONA,
      OQSDES: deliveryHData.OQSDES,
      OQDSDT: formatDate(),
      OQTRDT: formatDate(),
      OQTRTM: getCurrentTimeFormatted(),
      OQSROT: deliveryHData.OQSROT,
      OQROUT: deliveryHData.OQROUT,
      OQRORC: deliveryHData.OQRORC,
      OQTTYP: deliveryHData.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: deliveryHData.OQEDES,
      OQNEWE: deliveryHData.OQNEWE,
      OQGRWE: deliveryHData.OQGRWE,
      OQTIZO: deliveryHData.OQTIZO,
      OQDTDT: formatDate(),
      OQDOCR: deliveryHData.OQDOCR,
      OQDOCE: deliveryHData.OQDOCE,
      OQDEWD: deliveryHData.OQDEWD,
      OQSEEQ: deliveryHData.OQSEEQ,
      OQIVSS: deliveryHData.OQIVSS,
      OQPRIO: deliveryHData.OQPRIO,
      OQCSCD: deliveryHData.OQCSCD,
      OQAGKY: deliveryHData.OQAGKY,
      OQRGDT: formatDate(),
      OQRGTM: getCurrentTimeFormatted(),
      OQLMDT: formatDate(),
      OQCHNO: deliveryHData.OQCHNO,
      OQCHID: deliveryHData.OQCHID,
      OQSCES: deliveryHData.OQSCES,
      OQLMTS: Date.now(),
    });

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
