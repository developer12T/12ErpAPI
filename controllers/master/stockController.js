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
        itemCode: itemCode.trim(),
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
            { [Op.ne]: null },
            { [Op.ne]: "" },
            // { [Op.eq]: "600102390" },
            { [Op.notLike]: "ZNS%" },
            { [Op.notLike]: "800%" },
            { [Op.notLike]: "PRO%" },
            { [Op.notLike]: "DIS%" },
            { [Op.notLike]: "100            " },
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
        data: { warehouse: warehouse, itemCode: BalanceData[i].itemCode },
      });

      if (locate.data.length > 0) {
        const location = locate.data[0].location.trim();
        locateData[BalanceData[i].itemCode].push({
          location: location,
          lot: locate.data[0].lot,
          itemOnHand: locate.data[0].itemOnHand,
          itemallocated: locate.data[0].itemallocated, // Assuming promotionName is a property of PromotionData
        });
      } else {
        console.log(`No promotion data found for`);
      }

      // for (let i = 0; i < locate.data.length; i++) {
      //   const location = locate.data[i].location.trim();
      //   locateData[BalanceData[i].itemCode].push({
      //     location: location,
      //     lot: locate.data[i].lot,
      //     itemOnHand: locate.data[i].itemOnHand,
      //     itemallocated: locate.data[i].itemallocated,
      //   });
      // }

      // console.log(locate);
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
      //     itemallocated: LocateData[j].itemallocated,
      //   });
      // }
    }

    const stocks = BalanceData.map((stock) => {
      const locate = locateData[stock.itemCode] || [];
      const itemCode = stock.itemCode.trim();
      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: itemCode,
        itemPcs: stock.itemPcs,
        allocateMethod: stock.allocateMethod,
        itemallocated: stock.itemallocated,
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
      const location = locate.data[i].location.trim();
      locatearr.push({
        location: location,
        lot: locate.data[i].lot,
        itemOnHand: locate.data[i].itemOnHand,
        itemallocated: locate.data[i].itemallocated,
      });
    }
    const stocks = BalanceData.map((stock) => {
      const itemCode = stock.itemCode.trim();
      return {
        coNo: stock.coNo,
        warehouse: stock.warehouse,
        itemCode: itemCode,
        itemPcs: stock.itemPcs,
        allocateMethod: stock.allocateMethod,
        itemallocated: stock.itemallocated,
        itemAllowcatable: stock.itemAllowcatable,
        lot: locatearr,
      };
    });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
};
