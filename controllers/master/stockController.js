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
        itemCode: {
          [Op.and]: [
            { [Op.notLike]: "ZNS%" },
            { [Op.notLike]: "800%" },
            { [Op.notLike]: "PRO%" },
            { [Op.notLike]: "DIS%" },
          ],
        },
      },
    });
    // res.json(BalanceData);

    for (let i = 0; i < BalanceData.length; i++) {
      locateData[BalanceData[i].itemCode] = [];

      const locate = await axios({
        method: "post",
        url: `${HOST}master/locate`,
        data: { warehouse: warehouse, itemCode: itemCode },
      });

      for (let i = 0; i < locate.data.length; i++) {
        locateData[BalanceData[i].itemCode].pushh({
          location: locate.data[i].location,
          lot: locate.data[i].lot,
          itemOnHand: locate.data[i].itemOnHand,
          itemAllowcated: locate.data[i].itemAllowcated,
        });
      }

      // const LocateData = await Locate.findAll({
      //   attributes: {
      //     exclude: ["id"],
      //   },
      //   where: {
      //     itemCode: BalanceData[i].itemCode,
      //     warehouse: BalanceData[i].warehouse,
      //   },
      // });
      // for (let j = 0; j < LocateData.length; j++) {
      //   locateData[BalanceData[i].itemCode].push({
      //     location: LocateData[j].location,
      //     lot: LocateData[j].lot,
      //     itemOnHand: LocateData[j].itemOnHand,
      //     itemAllowcated: LocateData[j].itemAllowcated,
      //   });
      // }
    }
    const stocks = BalanceData.map((stock) => {
      const locate = locateData[stock.itemCode] || [];
      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: stock.itemCode,
        itemPcs: stock.itemPcs,
        allowcateMethod: stock.allowcateMethod,
        itemAllowcated: stock.itemAllowcated,
        itemAllowcatable: stock.itemAllowcatable,
        lot: locate,
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
    const locate = await axios({
      method: "post",
      url: `${HOST}master/locate`,
      data: { warehouse: warehouse, itemCode: itemCode },
    });

    for (let i = 0; i < locate.data.length; i++) {
      locatearr.push({
        location: locate.data[i].location,
        lot: locate.data[i].lot,
        itemOnHand: locate.data[i].itemOnHand,
        itemAllowcated: locate.data[i].itemAllowcated,
      });
    }
    const stocks = BalanceData.map((stock) => {
      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: stock.itemCode,
        itemPcs: stock.itemPcs,
        allowcateMethod: stock.allowcateMethod,
        itemAllowcated: stock.itemAllowcated,
        itemAllowcatable: stock.itemAllowcatable,
        lot: locatearr,
      };
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
};
