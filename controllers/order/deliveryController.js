const DeliverySH = require("../../models/deliveryhead");
const DeliverySL = require("../../models/deliveryline");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { sequelize } = require("../../config/m3db");
const fs = require("fs");
const path = require("path");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const { log } = require("console");

exports.index = async (req, res, next) => {};

exports.insertL = async (req, res, next) => {
  try {
    const running = await axios({
      method: "post",
      url: `${HOST}master/runningNumber/`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
        seriesName: "0",
      },
    });

    const runningNumber = running.data[0].lastNo + 1;

    await axios({
      method: "post",
      url: `${HOST}master/runningNumber/update`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
        seriesName: "0",
        lastNo: runningNumber,
      },
    });
    console.log(runningNumber);

    const jsonPath = path.join(__dirname, "../../", "Jsons", "deliverySL.json");
    let deliveryLData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      deliveryLData = JSON.parse(jsonData);
    }

    const insert = await DeliverySL.create({
      coNo: 410,
      URDLIX: runningNumber,
      URRORC: deliveryLData.URRORC,
      URRIDN: formatDate(),
      URRIDL: deliveryLData.URRIDL,
      URITNO: 10010401016,
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

    res.status(201).json("Accept");
  } catch (error) {
    next(error);
  }
};

exports.insertH = async (req, res, next) => {
  try {
    const {} = req.body;
    const running = await axios({
      method: "post",
      url: `${HOST}master/runningNumber/`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
        seriesName: "0",
      },
    });

    const runningNumber = running.data[0].lastNo + 1;

    await axios({
      method: "post",
      url: `${HOST}master/runningNumber/update`,
      data: {
        coNo: 410,
        series: "B",
        seriesType: "07",
        seriesName: "0",
        lastNo: runningNumber,
      },
    });
    console.log(runningNumber);

    const jsonPath = path.join(__dirname, "../../", "Jsons", "deliverySH.json");
    let deliveryHData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      deliveryHData = JSON.parse(jsonData);
    }
    const insert = await DeliverySH.create({
      coNo: 380,
      OQDLIX: runningNumber,
      OQDPOL: deliveryHData.OQDPOL,
      OQWHLO: 101,
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
      OQRIDN: 20414757,
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

    res.status(201).json("Accept");
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {};
