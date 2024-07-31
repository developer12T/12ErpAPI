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
        URRORC: deliveryLData.URRORC, // MHDISH 
        URRIDN: item.orderNo,
        URRIDL: item.itemNo,
        URITNO: item.itemCode,
        URFACI: deliveryLData.URFACI, // json
        URTRQT: deliveryLData.URTRQT, // ooline qty (pcs)
        URSTCD: deliveryLData.URSTCD, // 1
        URGRWE: deliveryLData.URGRWE, // OOLINE
        URNEWE: deliveryLData.URNEWE, // OOLINE
        // URALUN OOLINE

        URRGDT: formatDate(),
        URRGTM: getCurrentTimeFormatted(),
        URLMDT: formatDate(),
        URCHNO: deliveryLData.URCHNO,
        URCHID: deliveryLData.URCHID,
        URLMTS: Date.now(),
        URSCES: deliveryLData.URSCES, // MHDISH
      });
    }
    res.status(201).json("Created");
  } catch (error) {
    next(error);
  }
};

exports.insertH = async (req, res, next) => {
  try {
    const { coNo, warehouse, runningNumberH, orderNo } = req.body;

    const jsonPath = path.join(__dirname, "../../", "Jsons", "deliverySH.json");
    let deliveryHData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      deliveryHData = JSON.parse(jsonData[0].HEAD);
    }
    await DeliverySH.create({
      coNo: coNo,
      OQDLIX: runningNumberH,
      OQDPOL: deliveryHData.OQDPOL, // POLICY
      OQWHLO: warehouse,
      OQINOU: deliveryHData.OQINOU,
      OQCONA: warehouse, //OOHEAD.OAWHLO
      OQSDES: deliveryHData.OQSDES,  // ROUTE PLACE
      OQDSDT: formatDate(),  //OOHEAD OARLDT requestDate
      OQTRDT: formatDate(),  //OOHEAD OAORDT
      
      OQTRTM: getCurrentTimeFormatted(), //OOHEAD
      OQSROT: deliveryHData.OQSROT, // ROUTE
      OQROUT: deliveryHData.OQROUT, // ROUTE
      OQRORC: deliveryHData.OQRORC, // 3
      // OQDSHM:// departureTime
      // OQDTHM             // departureTime       
      OQTTYP: deliveryHData.OQTTYP,
      OQRIDN: orderNo,
      OQEDES: deliveryHData.OQEDES, // ROUTE PLACE
      OQNEWE: deliveryHData.OQNEWE, // OOLINE SUM
      OQGRWE: deliveryHData.OQGRWE, // OOLINE SUM
      OQTIZO: deliveryHData.OQTIZO, // OOHEAD.OATIZO
      OQDTDT: formatDate(), // OOHEAD requestDate
      OQDOCR: deliveryHData.OQDOCR, // 1
      OQDOCE: deliveryHData.OQDOCE, // 11
      OQDEWD: deliveryHData.OQDEWD, // 0
      OQSEEQ: deliveryHData.OQSEEQ, // 50
      OQIVSS: deliveryHData.OQIVSS, // 2
      OQPRIO: deliveryHData.OQPRIO, // 5
      OQCSCD: deliveryHData.OQCSCD, // OCUSMA
      OQCUCL: deliveryHData.OQCUCL, // OCUSMA
      OQECAR: deliveryHData.OQECAR, // OCUSMA
    
      OQPONO: deliveryHData.OQPONO, // OCUSAD
      OQULZO: deliveryHData.OQULZO, // OCUSAD 
      // OQFWNS Route forwarding
      // OQFWNO Route forwarding
      // OQAGKY: deliveryHData.OQAGKY,  emthy

      OQRGDT: formatDate(), 
      OQRGTM: getCurrentTimeFormatted(),  
      OQLMDT: formatDate(),  
      OQCHNO: deliveryHData.OQCHNO,
      OQCHID: deliveryHData.OQCHID,
      OQSCES: deliveryHData.OQSCES, //90
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
