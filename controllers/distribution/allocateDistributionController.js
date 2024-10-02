const allocate = require("../../models/allocate");
const { getJsonData } = require("../../utils/getJsonData");
const { formatDate } = require("../../utils/getDateTime");
const { getCurrentTimeFormatted } = require("../../utils/getDateTime");
const errorEndpoint = require("../../middleware/errorEndpoint");
const path = require("path");
const currentFilePath = path.basename(__filename);

exports.index = async (req, res, next) => {};

exports.distributionAllocate = async (data, orderType, transaction) => {
  try {
    const items = data;
    const allocateJson = getJsonData("distribution.json");
    // console.log(items.qtyPCS);
    switch (orderType.slice(0, 1)) {
      case "T":
        for (let item of items) {
          await allocate.create(
            {
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
            },
            {
              transaction,
            }
          );

          await allocate.create(
            {
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
            },
            {
              transaction,
            }
          );
        }
        break;
      case "I":
        for (let item of items) {
          await allocate.create(
            {
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
            },
            {
              transaction,
            }
          );
        }
        break;
      case "R":
        break;
      default:
        break;
    }
  } catch (error) {
  
    throw errorEndpoint(currentFilePath, "Distribution Allocate:", error);
  }
};
