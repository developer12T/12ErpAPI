const DocumentType = require("../models/documenttype");
const { OOTYPE, MGTYPE } = require("../models/master");
const path = require("path");
const currentFilePath = path.basename(__filename);
const errorEndpoint = require("../middleware/errorEndpoint");

exports.getDocumentType = async (orderType) => {
  try {
    const response = await DocumentType.findAll({
      where: {
        coNo: 410,
        orderType: orderType,
      },
    });
    return response;
  } catch (error) {
    throw errorEndpoint(
      currentFilePath,
      "getDocumentType",
      error
    );
  }
};

exports.getSeries = async (orderType) => {
  try {
    const response = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });
    return response;
  } catch (error) {
    throw errorEndpoint(currentFilePath, "getSeries", error);
  }
};
