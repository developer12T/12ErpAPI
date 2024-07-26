const { ItemFac, ItemMaster, ItemUnit } = require("../../models/master");
const { HOST } = require("../../config/index");
const axios = require("axios");
const { Result } = require("express-validator");

exports.index = async (req, res, next) => {};

exports.fac = async (req, res, next) => {
  try {
    const { itemNo } = req.body;
    const itemFacData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNo,
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

    const itemFacData = await ItemUnit.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNo,
      },
    });
    // const result = itemFacData.map((item) => {
    //   const itemNo = item.itemNo.trim();

    //   return { itemNo: itemNo };
    // });

    res.json(itemFacData);
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
