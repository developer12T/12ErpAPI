const allocate = require("../../models/allocate");
const { getJsonData } = require("../../middleware/getJsonData");
const { formatDate } = require("../../middleware/getDateTime");
const { getCurrentTimeFormatted } = require("../../middleware/getDateTime");

exports.index = async (req, res, next) => {};

exports.insertAllocate = async (req, res, next) => {
  try {
    const items = req.body.items;
    const allocateJson = getJsonData("distribution.json");
    // console.log(items.qtyPCS);

    for (let item of items) {
      await allocate.create({
        coNo: item.coNo,
        warehouse: item.towarehouse,
        itemCode: item.itemCode,
        MOPLDT: formatDate(),
        MOTIHM: getCurrentTimeFormatted().slice(0, -2), // departure time
        MOSTAT: item.itemStatus,
        MOPRIO: allocateJson[0].ALLOCATE.MOPRIO,
        MOORCA: allocateJson[0].ALLOCATE.MOORCA_TO, //allocateJson[0].ALLOCATE.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: `${item.warehouse}=>${item.towarehouse}`,
        MORPRT: allocateJson[0].ALLOCATE.MORPRT,
        MOTRQT: item.itemQty,
        MOALMT: allocateJson[0].ALLOCATE.MOALMT_TO, //allocateJson[0].ALLOCATE.MOALMT,
        MOCALI: allocateJson[0].ALLOCATE.MOCALI,
        MOLMTS: Date.now(),
      });

      await allocate.create({
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: item.itemCode,
        MOPLDT: formatDate(),
        MOTIHM: getCurrentTimeFormatted().slice(0, -2), // departure time
        MOSTAT: item.itemStatus,
        MOPRIO: allocateJson[0].ALLOCATE.MOPRIO,
        MOORCA: allocateJson[0].ALLOCATE.MOORCA_FROM, //allocateJson[0].ALLOCATE.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: `${item.warehouse}=>${item.towarehouse}`,
        MORPRT: allocateJson[0].ALLOCATE.MORPRT,
        MOTRQT: item.itemQty * -1,
        MOALMT: allocateJson[0].ALLOCATE.MOALMT_FROM, //allocateJson[0].ALLOCATE.MOALMT,
        MOCALI: allocateJson[0].ALLOCATE.MOCALI,
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
