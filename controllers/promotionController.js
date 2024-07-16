const Promotion = require("../models/promotion");

exports.index = async (req, res, next) => {
  const { promotionCode } = req.body;
  const promotionData = await Promotion.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: {
      promotionCode: promotionCode,
      FZCONO: "410",
    },
  });
  res.json(promotionData);
};

exports.update = async (req, res, next) => {
  const { promotionCode } = req.body;
  const promotionData = await Promotion.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: {
      promotionCode: promotionCode,
      FZCONO: "410",
    },
  });
  res.json(promotionData);
};

exports.delete = async (req, res, next) => {
  const { promotionCode } = req.body;
  const promotionData = await Promotion.findAll({
    attributes: {
      exclude: ["id"],
    },
    where: {
      promotionCode: promotionCode,
      FZCONO: "410",
    },
  });
  res.json(promotionData);
};
