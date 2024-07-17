const NumberSeries = require("../models/runningnumber");
const { Op } = require("sequelize");

exports.index = async (req, res, next) => {
  try {
    const { series, seriesType, seriesName, coNo } = req.body;
    const result = await NumberSeries.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: coNo,
        series: series,
        seriesType: seriesType,
        // seriesName: seriesName,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { series, seriestype, companycode } = req.body;
    const result = await NumberSeries.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        [Op.or]: [
          {
            companycode: companycode,
            series: series,
            seriestype: seriestype,
          },
          {
            seriesname: {
              [Op.like]: `%${seriesname}%`,
            },
          },
        ],
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
