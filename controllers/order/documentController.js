// Models
const Document = require("../../models/document");
// Service
const { getDocumentType } = require("../../services/orderService");
// Utils
const { getJsonData } = require("../../utils/getJsonData");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../utils/getDateTime");
// Middleware
const errorEndpoint = require("../../middleware/errorEndpoint");
const path = require("path");
const currentFilePath = path.basename(__filename);
exports.documentInsert = async (data, transaction) => {
  try {
    const { orderType, orderNo, coNo } = data;
    const documentTypes = await getDocumentType(orderType);
    const documentJson = getJsonData("document.json");

    for (let documentType of documentTypes) {
      await Document.create(
        {
          coNo: coNo,
          orderNo: orderNo,
          OFDONR: documentType.UODONR,
          OFDOTP: documentType.UODOTP,
          OFNOEX: documentType.UONOEX,
          OFDOCD: documentType.UODOCD,
          OFDODT: formatDate(),
          OFTXID: documentType.UOTXID,
          OFRGDT: formatDate(),
          OFRGTM: getCurrentTimeFormatted(),
          OFLMDT: formatDate(),
          OFCHNO: documentType.UOCHNO,
          OFCHID: documentJson.OFCHID,
        },
        {
          transaction,
        }
      );
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Document", error);
  }
};


