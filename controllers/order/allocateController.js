const allocate = require("../../models/allocate");
const { getJsonData } = require("../../middleware/getJsonData");
const { sequelize } = require("../../config/m3db");

exports.index = async (req, res, next) => {};

exports.insert = async (req, res, next) => {
  // let transaction;
  try {
    const items = req.body.items;
    const allocateJson = getJsonData("allocate.json");
    // console.log(items.qtyPCS);
    // transaction = await sequelize.transaction();
    for (let item of items) {
      await allocate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        MOPLDT: item.MOPLDT,
        MOTIHM: item.OBDSHM,
        MOSTAT: item.orderStatusLow,
        MOPRIO: item.MOPRIO,
        MOORCA: allocateJson.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: item.OKALCU + "    " + item.customerNo,
        MORPRT: allocateJson.MORPRT,
        MOTRQT: item.qtyPCS * -1,
        MOALMT: allocateJson.MOALMT,
        MOCALI: allocateJson.MOCALI,
        MOLMTS: Date.now(),
      });
    }

    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};

exports.allocateItem = async (items, transaction) => {
  // let transaction;
  try {
    const allocateJson = getJsonData("allocate.json");
    for (let item of items) {
      await allocate.create(
        {
          coNo: item.coNo,
          warehouse: item.warehouse,
          itemCode: item.itemCode,
          MOPLDT: item.MOPLDT,
          MOTIHM: item.OBDSHM,
          MOSTAT: item.orderStatusLow,
          MOPRIO: item.MOPRIO,
          MOORCA: allocateJson.MOORCA,
          orderNo: item.orderNo,
          itemNo: item.itemNo,
          MORFTX: item.OKALCU + "    " + item.customerNo,
          MORPRT: allocateJson.MORPRT,
          MOTRQT: item.qtyPCS * -1,
          MOALMT: allocateJson.MOALMT,
          MOCALI: allocateJson.MOCALI,
          MOLMTS: Date.now(),
          // awdawd:dawd
        },
        { transaction }
      );
    }
  } catch (error) {
    throw error;
  }
};
