const { ItemFac, ItemMaster, ItemUnit } = require("../models/master");
const { HOST } = require("../config/index");
const axios = require("axios");

exports.index = async (req, res, next) => {};

exports.fac = async (req, res, next) => {
  try {
    const { itemNos } = req.body;
    const itemFacData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNos,
      },
    });

    res.json(itemFacData);
  } catch (error) {
    next(error);
  }
};

exports.unit = async (req, res, next) => {
  try {
    const { itemNo } = req.body;
    const itemUintData = await ItemUnit.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
      },
    });
    res.json(itemUintData);
  } catch (error) {
    next(error);
  }
};

exports.items = async (req, res, next) => {
  try {
    const { itemNo } = req.body;
    const itemData = await ItemMaster.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
      },
    });
    res.json(itemData);
  } catch (error) {
    next(error);
  }
};

exports.itemsingle = async (req, res, next) => {
    try {
      const { itemNo } = req.body;
      const itemData = await ItemMaster.findAll({
        //   limit: 10,
        attributes: {
          exclude: ["id"],
        },
        where: {
          coNo: 410,
        },
      });
      res.json(itemData);
    } catch (error) {
      next(error);
    }
  };
