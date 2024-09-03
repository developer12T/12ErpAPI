const Document = require("../../models/document");
const { getJsonData } = require("../../middleware/getJsonData");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");

const { fetchDocumentType } = require("../../middleware/apiMaster");

exports.index = async (req, res, next) => {};

exports.insert = async (req, res, next) => {
  try {
    const { orderType, orderNo, coNo } = req.body;
    // let documentTypes = await axios({
    //   method: "post",
    //   url: `${HOST}master/documenttype/single`,
    //   data: { orderType: orderType },
    // });
    const documentTypes = await fetchDocumentType(orderType);
    const documentJson = getJsonData("document.json");

    // const jsonPathOrder = path.join(__dirname, "../../", "Jsons", "document.json");
    // let documentJson = [];

    // if (fs.existsSync(jsonPathOrder)) {
    //   const jsonDataOrder = fs.readFileSync(jsonPathOrder, "utf-8");
    //   documentJson = JSON.parse(jsonDataOrder);
    // }
    // res.json(documentTypes.data);
    for (let documentType of documentTypes) {
      await Document.create({
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
      });
    }

    res.status(201).json({
      message: "Created",
    });
  } catch (error) {
    next(error);
  }
};
