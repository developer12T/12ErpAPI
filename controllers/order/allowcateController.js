const Allowcate = require("../../models/allowcate");
const { getJsonData } = require("../../middleware/getJsonData");

exports.index = async (req, res, next) => {};

exports.insert = async (req, res, next) => {
  try {
    const items = req.body.items;
    const allowcateJson = getJsonData("allowcate.json");
    for (let item of items) {
      await Allowcate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        MOPLDT: item.MOPLDT,
        MOTIHM: item.itemNo,
        MOSTAT: item.orderStatus,
        MOPRIO: item.MOPRIO,
        MOORCA: allowcateJson.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: item.OKALCU + "    " + item.customerNo,
        MORPRT: allowcateJson.MORPRT,
        MOTRQT: item.qtyPCS * -1,
        MOALMT: allowcateJson.MOALMT,
        MOCALI: allowcateJson.MOCALI,
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
