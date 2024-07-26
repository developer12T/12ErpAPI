const { ItemFac, ItemMaster, ItemUnit } = require("../../models/master");
const { HOST } = require("../../config/index");
const axios = require("axios");
const { Result } = require("express-validator");

exports.index = async (req, res, next) => {};

exports.fac = async (req, res, next) => {
  try {
    const { itemNo } = req.body;
    const itemData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNo,
      },
    });
    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      return {
        itemNo: itemNo,
        M9FACI: item.M9FACI,
        cost: item.cost,
      };
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.unit = async (req, res, next) => {
  try {
    const { itemNo, unit } = req.body;

    const itemData = await ItemUnit.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNo,
        unit: unit,
        facType: 1,
      },
    });
    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      const unit = item.unit.trim();
      return {
        itemNo: itemNo,
        facType: item.facType,
        factor: item.factor,
        unit: unit,
      };
    });
    res.json(items);
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
    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      const itemName = item.itemName.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      return {
        itemNo: itemNo,
        status: item.status,
        itemName: itemName,
        itemType: item.itemType,
        MMITGR: MMITGR,
        MMITCL: MMITCL,
        itemGroup: itemGroup,
        netWight: item.netWight,
        grossWight: item.grossWight,
      };
    });
    res.json(items);
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
        itemNo: itemNo,
      },
    });
    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      const itemName = item.itemName.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      return {
        itemNo: itemNo,
        status: item.status,
        itemName: itemName,
        itemType: item.itemType,
        MMITGR: MMITGR,
        MMITCL: MMITCL,
        itemGroup: itemGroup,
        netWight: item.netWight,
        grossWight: item.grossWight,
      };
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};
