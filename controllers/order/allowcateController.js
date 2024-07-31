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
    const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "order.json");
    let allowcateJson = [];

    if (fs.existsSync(jsonPathOrder)) {
      const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
      allowcateJson = JSON.parse(jsonDataOrder);
    }

    for (let item of items) {
      await Allowcate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemNo: item.itemNo,
        MOPLDT: item.MOPLDT,
        MOTIHM: item.productNo,
        MOSTAT: item.orderStatus,
        MOPRIO: item.MOPRIO,
        MOORCA: 311,
        orderNo: item.orderNo,
        productNo: item.productNo,
        MORFTX: item.OKALCU + "=>" + item.customerNo,
        MORPRT: 1,
        MOTRQT: item.OBORQT * -1,
        MOALMT: 0,
        MOCALI: 5,
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
