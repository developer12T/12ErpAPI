// Models
const Allocate = require("../../models/allocate");
// Utils
const { getJsonData } = require("../../utils/getJsonData");
// Middleware
const errorEndpoint = require("../../middleware/errorEndpoint");
const path = require("path");
const currentFilePath = path.basename(__filename);

exports.allocateInsert = async (items, transaction) => {
  try {
    const allocateJson = getJsonData("allocate.json");
    for (let item of items) {
      await Allocate.create(
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
          MOTRQT: item.qtyQT * -1,
          MOALMT: allocateJson.MOALMT,
          MOCALI: allocateJson.MOCALI,
          MOLMTS: Date.now(),
        },
        { transaction }
      );
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "allocateInsert", error);
  }
};
exports.getAllocate = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    const allocateData = await Allocate.findAll({
      where: {
        orderNo: orderNo,
      },
    });
    const response = allocateData.map((item) => {
      const itemCode = item.itemCode.trim();
      return {
        coNo: item.coNo,
        warehouse: item.warehouse,
        itemCode: itemCode,
        
        MOPLDT: item.MOPLDT,
        MOTIHM: item.MOTIHM,
        MOSTAT: item.MOSTAT,
        MOPRIO: item.MOPRIO,
        MOORCA: item.MOORCA,
        orderNo: item.orderNo,
        itemNo: item.itemNo,
        MORFTX: item.MORFTX,
        MORPRT: item.MORPRT,
        MOTRQT: item.MOTRQT,
        MOALMT: item.MOALMT,
        MOCALI: item.MOCALI,
        MOLMTS: item.MOLMTS,
      };
    });
    res.status(200).json(response);;
  } catch (error) {
    next(error);
  }
};
