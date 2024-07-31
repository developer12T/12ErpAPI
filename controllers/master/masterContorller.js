const {
  ItemFac,
  ItemMaster,
  ItemUnit,
  Warehouse,
} = require("../../models/master");
const NumberSeries = require("../../models/runningnumber");
const { HOST } = require("../../config/index");
const axios = require("axios");

exports.index = async (req, res, next) => {};

exports.itemdetails = async (req, res, next) => {
  try {
    const itemFacObj = {};
    const itemUnitObj = {};
    let unitarr = [];
    let { itemCode } = req.body;
    const itemData = await ItemMaster.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemCode: itemCode,
      },
    });

    // Gather itemCode values to make a batch request
    itemCode = itemData.map((item) => item.itemCode.trim());

    const facData = await axios({
      method: "post",
      url: `${HOST}master/fac`,
      data: { itemCode },
    });

    facData.data.forEach((fac) => {
      itemFacObj[fac.itemCode] = fac.cost;
    });

    // res.json(facData.data);

    for (let i = 0; i < itemData.length; i++) {
      const itemUnitData = await ItemUnit.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { itemCode: itemData[i].itemCode, coNo: 410 },
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
      const itemCode = item.itemCode.trim();
      const itemName = item.itemName.trim();
      const itemType = item.itemType.trim();
      const MMITGR = item.MMITGR.trim();
      const MMITCL = item.MMITCL.trim();
      const itemGroup = item.itemGroup.trim();
      const cost = itemFacObj[itemCode] || 0;
      return {
        coNo: item.coNo,
        itemCode: itemCode,
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
    const { itemCode, qty } = req.body;
    const itemData = await ItemMaster.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        itemCode: itemCode,
      },
    });

    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      return {
        itemCode: itemCode,
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
    const { itemCode, qty } = req.body;
    const itemData = await ItemFac.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        itemCode: itemCode,
        coNo: 410,
      },
    });

    const items = itemData.map((item) => {
      const itemCode = item.itemCode.trim();
      return {
        itemCode: itemCode,
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
    const { series, seriesType, coNo } = req.body;
    const result = await NumberSeries.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: coNo,
        series: series,
        seriesType: seriesType,
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

exports.warehouse = async (req, res, next) => {
  try {
    // const { itemCode, qty } = req.body;
    const warehouse = await Warehouse.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        // itemCode: itemCode,
        coNo: 410,
      },
    });

    // const items = itemData.map((item) => {
    //   const itemCode = item.itemCode.trim();
    //   return {
    //     itemCode: itemCode,
    //     cost: Math.round(item.cost * qty * 1000000) / 1000000,
    //   };
    // });
    res.json(warehouse);
  } catch (error) {
    next(error);
  }
};
