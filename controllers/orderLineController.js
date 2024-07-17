const OLINE = require("../models/orderline");

exports.line = async (req, res, next) => {
  try {
    const { orderNo } = req.body;
    const orderLineData = await OLINE.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        orderNo: orderNo,
      },
    });
    res.json(orderLineData);
  } catch (error) {
    next(error);
  }
};
