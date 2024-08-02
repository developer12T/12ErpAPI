const Allowcate = require("../../models/allowcate");
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

exports.insert = async (req, res, next) => {
  try {
    const items = req.body.items;
    const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "allowcate.json");
    let allowcateJson = [];

    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      allowcateJson = JSON.parse(jsonDataOrder);
    }

    for (let item of items) {
      await Allowcate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        MOPLDT: item.MOPLDT,
        MOTIHM: item.itemNo,
        MOSTAT: item.orderStatus,
        MOPRIO: item.MOPRIO,
        MOORCA: allowcateJson.MOORCA,
        orderNo:item.orderNo,
        itemNo: item.itemNo,
        MORFTX: item.OKALCU + "    " + item.customerNo,
        MORPRT: allowcateJson.MORPRT,
        MOTRQT: item.qtyPCS * -1,
        MOALMT: allowcateJson.MOALMT,
        MOCALI: allowcateJson.MOCALI,
        MOLMTS: Date.now(),
      });
    }
    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};
