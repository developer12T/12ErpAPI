const allocate = require("../../models/allocate");
const { getJsonData } = require("../../middleware/getJsonData");

exports.index = async (req, res, next) => {};

exports.insertAllocate = async (req, res, next) => {
  try {
    const items = req.body.items;
    const allocateJson = getJsonData("allocate.json");
    console.log(items.qtyPCS);

    for (let item of items) {
      await allocate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        MOPLDT: item.MOPLDT,
        MOTIHM: item.itemNo,
        MOSTAT: item.orderStatusLow,
        MOPRIO: 0,
        MOORCA: 311,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: "",
        MORPRT: allocateJson.MORPRT,
        MOTRQT: item.itemQty * -1,
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
