const { Balance, Locate, ItemMaster } = require("../../models/master");
const axios = require("axios");
const { HOST } = require("../../config/index");
const { sequelize } = require("../../config/m3db");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");

exports.index = async (req, res, next) => {};

exports.balance = async (req, res, next) => {
  try {
    const { warehouse, itemCode } = req.body;
    const BalanceData = await Balance.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        warehouse: warehouse,
        itemCode: {
          [Op.like]: `%${itemCode}%`,
        },
        coNo: 410,
      },
    });
    res.json(BalanceData);
  } catch (error) {
    next(error);
  }
};

exports.locate = async (req, res, next) => {
  try {
    const { warehouse, itemCode } = req.body;
    const LocateData = await Locate.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        warehouse: warehouse,
        itemCode: itemCode,
        coNo: 410,
      },
    });
    res.json(LocateData);
  } catch (error) {
    next(error);
  }
};

exports.stock = async (req, res, next) => {
  try {
    const locateData = {};
    const { warehouse } = req.body;
    const BalanceData = await Balance.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        warehouse: warehouse,
        coNo: 410,
      },
    });

    for (let i = 0; i < BalanceData.length; i++) {
      locateData[BalanceData[i].itemCode] = [];

      // let locate = await axios({
      //   method: "post",
      //   url: `${HOST}master/locate`,
      //   data: {
      //     warehouse: BalanceData[i].warehouse,
      //     itemCode: BalanceData[i].itemCode,
      //   },
      // });

      const LocateData = await Locate.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { itemCode: BalanceData[i].itemCode },
      });

      for (let j = 0; j < LocateData.length; j++) {
        locateData[BalanceData[i].itemCode].push({
          lot: BalanceData[j].lot,
        });
      }

      // console.log(locate.data)
      // for (let j = 0; j < locate.data.length; j++) {
      //   locateData[BalanceData[i].itemCode].push({
      //     lot: locate[j].data.lot,
      //   });
      // }
    }
    // console.log(locateData);
    // res.json(locateData);
    const stocks = BalanceData.map((stock) => {
      const locate = locateData[itemCode] || [];
      return {
        locate: locate,
      };
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
};

exports.stocksingle = async (req, res, next) => {
  try {
    let locatearr = [];
    const Data = {};
    const { warehouse, itemCode } = req.body;
    const BalanceData = await Balance.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        warehouse: warehouse,
        itemCode: itemCode,
        coNo: 410,
      },
    });
    await axios({
      method: "post",
      url: `${HOST}master/locate`,
      data: { warehouse: warehouse, itemCode: itemCode },
    });
  } catch (error) {
    next(error);
  }
};
