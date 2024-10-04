const {
  ItemFac,
  ItemMaster,
  Warehouse,
  Policy,
  OOTYPE,
  MGTYPE,
} = require("../../models/master");
const {
  NumberSeries,
  NumberSeriesInvoice,
} = require("../../models/runningnumber");

exports.getCalWeight = async (req, res, next) => {
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

exports.getCalCost = async (req, res, next) => {
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

exports.getRunningNumber = async (req, res, next) => {
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

exports.getRunningNumberInvoice = async (req, res, next) => {
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

exports.postUpdateRunningNumber = async (req, res, next) => {
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

exports.postUpdateRunningNumberInvoice = async (req, res, next) => {
  try {
    const { coNo, lastNo, year, series } = req.body;
    const update = await NumberSeriesInvoice.update(
      { lastNo: lastNo },
      {
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

exports.getWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findAll({
      where: {
        coNo: 410,
      },
    });
    res.json(warehouse);
  } catch (error) {
    next(error);
  }
};

exports.getPolicy = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    const policy = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });

    const results = await Policy.findOne({
      where: {
        EDDPOL: policy.OODPOL,
        coNo: 410,
      },
    });

    if (results) {
      const response = trimObjectStrings(results.toJSON());
      res.status(200).json(response);
    } else {
      const error = new Error("Not Found Address");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.getDistributionpolicy = async (req, res, next) => {
  try {
    const { mgType } = req.body;
    const policy = await MGTYPE.findOne({
      where: {
        YXTRTP: mgType,
        YXCONO: 410,
      },
    });
    res.status(200).json(policy);
  } catch (error) {
    next(error);
  }
};

exports.getOrdertype = async (req, res, next) => {
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

exports.getItemAll = async (req, res, next) => {
  try {
    const itemData = await ItemMaster.findAll({
      where: {
        coNo: 410,
      },
    });
    const response = itemData.map((item) => trimObjectStrings(item.toJSON()));
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.getItemDetails = async (req, res, next) => {
  try {
    const itemFacObj = {};
    let unitarr = [];
    let { itemCode } = req.body;
    const maxUnitfactor = await ItemUnit.max("factor", {
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
      },
    });
    const maxUnitData = await ItemUnit.findOne({
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: maxUnitfactor,
      },
    });
    const minUnitfactor = await ItemUnit.min("factor", {
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
      },
    });

    const minUnitData = await ItemUnit.findOne({
      where: {
        coNo: 410,
        itemCode: itemCode,
        facType: 1,
        factor: minUnitfactor,
      },
    });

    const itemData = await ItemMaster.findAll({
      where: {
        coNo: 410,
        itemCode: itemCode,
      },
    });

    // Gather itemCode values to make a batch request
    itemCode = itemData.map((item) => item.itemCode.trim());
    const facDatas = await ItemFac.findAll({
      where: {
        coNo: 410,
        itemCode: itemCode,
      },
    });

    const facData = facDatas.map((item) => {
      const itemCode = item.itemCode.trim();
      return {
        itemCode: itemCode,
        M9FACI: item.M9FACI,
        cost: item.cost,
      };
    });

    facData.forEach((fac) => {
      itemFacObj[fac.itemCode] = fac.cost;
    });

    for (let i = 0; i < itemData.length; i++) {
      const itemUnitData = await ItemUnit.findAll({
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
        itemClass: itemClass,
        itemType: itemType,
        itemGroup: itemGroup,
        basicUnit: item.MMUNMS,
        cost: cost,
        netWeight: item.netWeight,
        grossWeight: item.grossWeight,
        unit: unitarr,
        minUnit: {
          facType: minUnitData.facType,
          factor: minUnitData.factor,
          unit: minUnitData.unit,
        },
        maxUnit: {
          facType: maxUnitData.facType,
          factor: maxUnitData.factor,
          unit: maxUnitData.unit,
        },
      };
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};
