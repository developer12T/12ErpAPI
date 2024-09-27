const allocate = require("../../models/allocate");
const { getJsonData } = require("../../middleware/getJsonData");
const { formatDate } = require("../../middleware/getDateTime");

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
        MOPLDT: formatDate(),
        MOTIHM: allocateJson.MOTIHM, // departure time
        MOSTAT: item.itemStatus,
        MOPRIO: allocateJson.MOPRIO,
        MOORCA: 511, //allocateJson.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: `${item.warehouse}=>${item.towarehouse}`,
        MORPRT: allocateJson.MORPRT,
        MOTRQT: item.itemQty * -1,
        MOALMT: 2,//allocateJson.MOALMT,
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
