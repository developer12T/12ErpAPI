const { ItemFac, ItemMaster, ItemUnit } = require("../../models/master");
const { HOST } = require("../../config/index");
const axios = require("axios");
const { Result } = require("express-validator");

exports.index = async (req, res, next) => {};

exports.fac = async (req, res, next) => {
  try {
    const { itemCode } = req.body;
    const itemData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
      },
    });
    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      return {
        itemCode: itemCode,
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
    const { itemCode, unit } = req.body;

    const itemData = await ItemUnit.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
        unit: unit,
        facType: 1,
      },
    });
    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      const unit = item.unit.trim();
      return {
        itemCode: itemCode,
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

exports.unitmin = async (req, res, next) => {
  try {
    const { itemCode } = req.body;

    const min = await ItemUnit.min("factor", {
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
      },
    });

    const itemData = await ItemUnit.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: min,
      },
    });
    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      const unit = item.unit.trim();
      return {
        itemCode: itemCode,
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

exports.unitmax = async (req, res, next) => {
  try {
    const { itemCode } = req.body;

    const max = await ItemUnit.max("factor", {
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
      },
    });

    const itemData = await ItemUnit.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: max,
      },
    });
    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      const unit = item.unit.trim();
      return {
        itemCode: itemCode,
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
    const { itemCode } = req.body;
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
      const itemCode = item.itemCode.trim();
      const itemName = item.itemName.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      return {
        itemCode: itemCode,
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
    const { itemCode } = req.body;
    const itemData = await ItemMaster.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
      },
    });
    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      const itemName = item.itemName.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      return {
        itemCode: itemCode,
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
