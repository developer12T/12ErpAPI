const { Balance, Locate } = require("../models/master");

const { Op } = require("sequelize");

exports.fetchStockAll = async (warehouse) => {
  try {
    const locateData = {};
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
      locateData[BalanceData[i].itemCode.trim()] = [];
      const locate = await Locate.findAll({
        where: {
          warehouse: warehouse,
          itemCode: BalanceData[i].itemCode.trim(),
          coNo: 410,
        },
      });

      if (locate.length > 0) {
        const location = locate[0].location.trim();
        locateData[BalanceData[i].itemCode].push({
          location: location,
          lot: locate[0].lot,
          itemOnHand: locate[0].itemOnHand,
          itemallocated: locate[0].itemallocated, // Assuming promotionName is a property of PromotionData
        });
      } else {
        console.log(`No promotion data found for`);
      }
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
    return stocks;
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchStockAll", error);
  }
};

exports.fetchStock = async (data) => {
  try {
    let locatearr = [];
    const { warehouse, itemCode } = data;
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
    const locate = await Locate.findAll({
      where: {
        warehouse: warehouse,
        itemCode: itemCode.trim(),
        coNo: 410,
      },
    });

    for (let i = 0; i < locate.length; i++) {
      const location = locate[i].location.trim();
      locatearr.push({
        location: location,
        lot: locate[i].lot,
        itemOnHand: locate[i].itemOnHand,
        itemallocated: locate[i].itemallocated,
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
    return stocks;
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchStockAll", error);
  }
};
