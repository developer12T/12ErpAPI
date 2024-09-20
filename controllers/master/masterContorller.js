const {
  ItemFac,
  ItemMaster,
  ItemUnit,
  Warehouse,
  Policy,
  OOTYPE,
  MGTYPE,
} = require("../../models/master");
const {
  NumberSeries,
  NumberSeriesInvoice,
} = require("../../models/runningnumber");
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
        where: { itemCode: itemData[i].itemCode, coNo: 410, facType: 1 },
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
      const itemDescription = item.itemDescription.trim();
      const itemType = item.itemType.trim();
      const MMITGR = item.MMITGR.trim();
      const itemClass = item.itemClass.trim();
      const itemGroup = item.itemGroup.trim();
      const cost = itemFacObj[itemCode] || 0;
      return {
        coNo: item.coNo,
        itemCode: itemCode,
        status: item.status,
        itemName: itemName,
        itemDescription: itemDescription,
        MMITGR: MMITGR,
        MMITCL: itemClass,
        itemType: itemType,
        itemGroup: itemGroup,
        basicUnit:item.MMUNMS,
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

exports.calWeight = async (req, res, next) => {
  try {
    const { itemCode, qty } = req.body;
    let itemData = await ItemMaster.findOne({
      where: {
        itemCode: itemCode,
      },
    });
    itemData = {
      itemCode: itemData.itemCode.trim(),
      status: itemData.status,
      netWeight: Number(Number(itemData.netWeight * qty).toFixed(3)),
      grossWeight: Number(Number(itemData.grossWeight * qty).toFixed(3)),
    };
    res.json(itemData);
  } catch (error) {
    next(error);
  }
};

exports.calCost = async (req, res, next) => {
  try {
    const { itemCode, qty } = req.body;
    let itemData = await ItemFac.findOne({
      where: {
        itemCode: itemCode,
        coNo: 410,
      },
    });
    itemData = {
      itemCode: itemData.itemCode.trim(),
      cost: Number(Number(itemData.cost * qty).toFixed(6)),
    };
    res.json(itemData);
  } catch (error) {
    next(error);
  }
};

exports.runningNumber = async (req, res, next) => {
  try {
    const { series, seriesType, coNo } = req.body;
    const result = await NumberSeries.findOne({
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

exports.runningNumberInvoice = async (req, res, next) => {
  try {
    const { series, year, coNo } = req.body;
    const result = await NumberSeriesInvoice.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: coNo,
        series: series,
        year: year,
      },
    });
    const numberInvoice = result.map((number) => {
      const prefix = number.prefix.trim();
      return {
        coNo: number.coNo,
        series: number.series,
        prefix: prefix,
        seriesName: number.seriesName,
        year: number.year,
        startNo: number.startNo,
        finalNo: number.finalNo,
        lastNo: parseInt(`${prefix}${number.lastNo}`),
      };
    });
    res.json(numberInvoice);
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

exports.updateRunningNumberInvoice = async (req, res, next) => {
  try {
    const { coNo, lastNo, year, series } = req.body;
    const update = await NumberSeriesInvoice.update(
      { lastNo: lastNo },
      {
        attributes: { exclude: ["id"] },
        where: {
          coNo: coNo,
          series: series,
          year: year,
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

exports.singlepolicy = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    const policy = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });

    let results = await Policy.findOne({
      where: {
        EDDPOL: policy.OODPOL,
        coNo: 410,
      },
    });
    results = {
      coNo: results.coNo,
      EDDPOL: results.EDDPOL,
      EDTX40: results.EDTX40,
      EDTX15: results.EDTX15.trim(),
      EDTRLV: results.EDTRLV,
    };

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.distributionpolicy = async (req, res, next) => {
  try {
    const { mgType } = req.body;
    const policy = await MGTYPE.findOne({
      where: {
        YXTRTP: mgType,
        YXCONO: 410,
      },
    });
    // res.status(200).json(policy);

    let results = await Policy.findOne({
      where: {
        EDDNID: policy.YXNBID,
        coNo: 410,
      },
    });
    // res.status(200).json(results);
    results = {
      coNo: results.coNo,
      EDDPOL: results.EDDPOL,
      EDTX40: results.EDTX40,
      EDTX15: results.EDTX15.trim(),
      EDTRLV: results.EDTRLV,
    };

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.singleordertype = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    const response = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
