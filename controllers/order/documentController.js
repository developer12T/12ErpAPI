const Document = require("../../models/document");
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
    const { orderType, orderNo } = req.body;
    let documentTypes = await axios({
      method: "post",
      url: `${HOST}master/documenttype/single`,
      data: { orderType: orderType },
    });
    for (let documentType of documentTypes.data) {
      await Document.create({
        coNo: 410,
        OFDIVI: "   ",
        orderNo: orderNo,
        OFDONR: documentType.UODONR,
        OFDOVA: "  ",
        OFDOTP: 0,
        OFNOEX: documentType.UONOEX,
        OFDOCD: 0,
        OFDODT: 0,
        OFTXID: 0,
        OFRGDT: formatDate(),
        OFRGTM: getCurrentTimeFormatted(),
        OFLMDT: formatDate(),
        OFCHNO: documentType.UONOEX,
        OFCHID: "MVXSECOFR ",
      });
    }

    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};
