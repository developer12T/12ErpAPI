const { Policy, OOTYPE, MGTYPE } = require("../models/master");
const path = require("path");
const currentFilePath = path.basename(__filename);
const errorEndpoint = require("../middleware/errorEndpoint");
const { trimObjectStrings } = require("../utils/String");

exports.fetchPolicy = async (orderType) => {
  try {
    // const { orderType } = req.body;
    const policy = await OOTYPE.findOne({
      where: {
        OOORTP: orderType,
      },
    });

    const results = await Policy.findOne({
      where: {
        EDDPOL: policy.OODPOL,
        coNo: 410,
      },
    });
    if (results) {
      const response = trimObjectStrings(results.toJSON());
      return response;
    } else {
      const error = new Error("Not Found Address");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchPolicy", error);
  }
};

exports.fetchDistributionPolicy = async (mgType) => {
  try {
    const policy = await MGTYPE.findOne({
      where: {
        YXTRTP: mgType,
        YXCONO: 410,
      },
    });

    return policy;
  } catch (error) {
    throw errorEndpoint(currentFilePath, "fetchDistributionPolicy", error);
  }
};
