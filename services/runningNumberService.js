const {
  NumberSeries,
  NumberSeriesInvoice,
} = require("../models/runningnumber");
const errorEndpoint = require("../middleware/errorEndpoint");

const path = require("path");
const currentFilePath = path.basename(__filename);

exports.runningNumber = async (data) => {
  try {
    const { series, seriesType, coNo } = data;
    const result = await NumberSeries.findOne({
      where: {
        coNo: coNo,
        series: series,
        seriesType: seriesType,
      },
    });
    return { status: 200, data: result };
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Running Number:", error);
  }
};

exports.runningNumberInvoice = async (data) => {
  try {
    const { series, year, coNo } = data;
    const result = await NumberSeriesInvoice.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: coNo,
        series: series,
        year: year,
      },
    });

    const numberInvoice = result.map((number) => {
      const prefix = number.prefix.trim();
      return {
        coNo: number.coNo,
        series: number.series,
        prefix: prefix,
        seriesName: number.seriesName,
        year: number.year,
        startNo: number.startNo,
        finalNo: number.finalNo,
        lastNo: parseInt(`${prefix}${number.lastNo}`),
      };
    });

    return { status: 200, data: numberInvoice };
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Running Number Invoice:", error);
  }
};

exports.updateRunningNumber = async (data, transaction) => {
  try {
    const { coNo, lastNo, seriesType, series } = data;
    const update = await NumberSeries.update(
      { lastNo: lastNo },
      {
        where: {
          coNo: coNo,
          series: series,
          seriesType: seriesType,
        },
        transaction,
      }
    );
    return { status: 200, data: update };
  } catch (error) {
    throw errorEndpoint(currentFilePath, "Update Running Number:", error);
  }
};

exports.updateRunningNumberInvoice = async (data) => {
  try {
    const { coNo, lastNo, year, series } = data;
    const update = await NumberSeriesInvoice.update(
      { lastNo: lastNo },
      {
        attributes: { exclude: ["id"] },
        where: {
          coNo: coNo,
          series: series,
          year: year,
        },
      }
    );
    return { status: 200, data: update };
  } catch (error) {
    throw errorEndpoint(
      currentFilePath,
      "Update Running Number Invoice:",
      error
    );
  }
};
