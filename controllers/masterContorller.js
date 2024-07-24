const { ItemFac, ItemMaster, ItemUnit } = require("../models/master");
const { HOST } = require("../config/index");
const axios = require("axios");

exports.index = async (req, res, next) => {};
exports.itemdetails = async (req, res, next) => {
  try {
    const itemFacObj = {};
    const itemUnitObj = {};
    let unitarr = [];
    const { itemNo } = req.body;
    const itemData = await ItemMaster.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: 410,
        itemNo:itemNo
      },
    });

    // Gather itemNo values to make a batch request
    const itemNos = itemData.map((item) => item.itemNo.trim());

    const { data } = await axios({
      method: "post",
      url: `http://localhost:3000/master/fac`,
      data: { itemNos },
    });

    data.forEach((fac) => {
      itemFacObj[fac.itemNo] = fac.cost;
    });

    // res.json(itemFacObj);

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
          unit: itemUnitData[j].unit,
          factor: itemUnitData[j].factor,
        });
      }
    }

    const items = itemData.map((item) => {
      const itemNo = item.itemNo.trim();
      const itemName = item.itemName.trim();
      const itemType = item.itemType.trim();
      const itemGroup = item.itemGroup.trim();
      const cost = itemFacObj[item.itemNo] || 0;
      return {
        coNo: item.coNo,
        itemNo: itemNo,
        status: item.status,
        itemName: itemName,
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

exports.itemsingle = async (req, res, next) => {
  try {
    const itemData = await ItemMaster.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        itemNo: itemNo,
        coNo: 410,
      },
    });
    res.json(itemData);
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
    const { series, seriestype, companycode } = req.body;
    const result = await NumberSeries.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        [Op.or]: [
          {
            companycode: companycode,
            series: series,
            seriestype: seriestype,
          },
          {
            seriesname: {
              [Op.like]: `%${seriesname}%`,
            },
          },
        ],
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
