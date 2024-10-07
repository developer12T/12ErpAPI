// Models
const { CIADDR } = require("../../models/distribution");
// Utils
const { trimObjectStrings } = require("../../utils/String");
// Middleware
const path = require("path");
const currentFilePath = path.basename(__filename);
const errorEndpoint = require("../../middleware/errorEndpoint");

exports.getAddress = async (req, res, next) => {
  try {
    const { addressCode } = req.body;
    const address = await CIADDR.findOne({
      where: {
        coNo: 410,
        OAADK1: addressCode,
      },
    });
    if (address) {
      const response = trimObjectStrings(address.toJSON());
      res.status(200).json(response);
    } else {
      const error = new Error("Not Found Address");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchAddress", error);
  }
};

exports.getDistributionAddress = async (addressCode) => {
  try {
    const address = await CIADDR.findOne({
      where: {
        coNo: 410,
        OAADK1: addressCode,
      },
    });
    if (address) {
      const trimmedAddress = trimObjectStrings(address.toJSON());
      res.json(trimmedAddress);
    } else {
      const error = new Error("Not Found Address");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchDistributionAddress", error);
  }
};
