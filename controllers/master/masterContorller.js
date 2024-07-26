const { ItemFac, ItemMaster, ItemUnit } = require("../../models/master");
const NumberSeries = require("../../models/runningnumber");
const { HOST } = require("../../config/index");
const axios = require("axios");

exports.index = async (req, res, next) => {};

exports.itemdetails = async (req, res, next) => {
  try {
    const itemFacObj = {};
    const itemUnitObj = {};
    let unitarr = [];
    let { itemNo } = req.body;
    const itemData = await ItemMaster.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo: itemNo,
      },
    });

    // Gather itemNo values to make a batch request
    itemNo = itemData.map((item) => item.itemNo.trim());

    const facData = await axios({
      method: "post",
      url: `${HOST}master/fac`,
      data: { itemNo },
    });

    facData.data.forEach((fac) => {
      itemFacObj[fac.itemNo] = fac.cost;
    });

    // res.json(facData.data);

    for (let i = 0; i < itemData.length; i++) {
      const itemUnitData = await ItemUnit.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { itemNo: itemData[i].itemNo, coNo: 410 },
        // group: ["MMFUDS"],
      });
      for (let j = 0; j < itemUnitData.length; j++) {
        unitarr.push({
          facType: itemUnitData[j].facType,
          factor: itemUnitData[j].factor,
          unit: itemUnitData[j].unit,
        });
      }
    }

    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      const itemName = item.itemName.trim();
      const itemType = item.itemType.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      const cost = itemFacObj[itemNo] || 0;
      return {
        coNo: item.coNo,
        itemNo: itemNo,
        status: item.status,
        itemName: itemName,
        MMITGR: MMITGR,
        MMITCL: MMITCL,
        itemType: itemType,
        itemGroup: itemGroup,
        cost: cost,
        netWeight: item.netWeight,
        grossWeight: item.grossWeight,
        unit: unitarr,
      };
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.calWight = async (req, res, next) => {
  try {
    const { itemNo, qty } = req.body;
    const itemData = await ItemMaster.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        itemNo: itemNo,
      },
    });

    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      return {
        itemNo: itemNo,
        status: item.status,
        netWight: Math.round(item.netWight * qty * 100000) / 100000,
        grossWight: Math.round(item.grossWight * qty * 100000) / 100000,
      };
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.calCost = async (req, res, next) => {
  try {
    const { itemNo, qty } = req.body;
    const itemData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        itemNo: itemNo,
        coNo: 410,
      },
    });

    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      return {
        itemNo: itemNo,
        cost: Math.round(item.cost * qty * 1000000) / 1000000,
      };
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.runningNumber = async (req, res, next) => {
  try {
    const { series, seriesType, seriesName, coNo } = req.body;
    const result = await NumberSeries.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: coNo,
        series: series,
        seriesType: seriesType,
        // seriesName: seriesName,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateRunningNumber = async (req, res, next) => {
  try {
    const { coNo, lastNo, seriesType, series } = req.body;
    const update = await NumberSeries.update(
      { lastNo: lastNo },
      {
        attributes: { exclude: ["id"] },
        where: {
          coNo: coNo,
          series: series,
          seriesType: seriesType,
        },
      }
    );
    res.json(update);
  } catch (error) {
    next(error);
  }
};
