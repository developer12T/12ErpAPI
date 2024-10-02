const { ItemFac, ItemMaster, ItemUnit } = require("../models/master");
const errorEndpoint = require("../middleware/errorEndpoint");
const { HOST } = require("../config/index");
const axios = require("axios");

const path = require("path");
const currentFilePath = path.basename(__filename);

exports.itemdetails = async (itemCode) => {
  try {
    const itemFacObj = {};
    const itemUnitObj = {};
    let unitarr = [];
    // let { itemCode } = data;

    const itemData = await ItemMaster.findAll({
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
    
    // const facData = await ItemFac.findAll({
    //   where: {
    //     itemCode,
    //   },
    // });

    facData.data.forEach((fac) => {
      itemFacObj[fac.itemCode] = fac.cost;
    });

    for (let i = 0; i < itemData.length; i++) {
      const itemUnitData = await ItemUnit.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { itemCode: itemData[i].itemCode, coNo: 410, facType: 1 },
      });

      itemUnitData.forEach((unit) => {
        unitarr.push({
          facType: unit.facType,
          factor: unit.factor,
          unit: unit.unit,
        });
      });
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
      };
    });

    return { status: 200, data: items };
  } catch (error) {
    // Enhanced error handling
    throw errorEndpoint(currentFilePath, "Item Detail:", error);
  }
};

exports.calWeight = async (data) => {
  try {
    const { itemCode, qty } = data;
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

    return { status: 200, data: itemData };
  } catch (error) {
    // Enhanced error handling
    throw errorEndpoint(currentFilePath, "Calulate Weight:", error);
  }
};

exports.calCost = async (data) => {
  try {
    const { itemCode, qty } = data;
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

    return { status: 200, data: itemData };
  } catch (error) {
    // Enhanced error handling
    throw errorEndpoint(currentFilePath, "Calulate Cost:", error);
  }
};
