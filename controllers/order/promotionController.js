const Promotion = require("../../models/promotion");

exports.index = async (req, res, next) => {
  const promotionData = await Promotion.findAll({
    where: {
      FZCONO: "410",
    },
  });
  res.json(promotionData);
};

exports.update = async (req, res, next) => {
  const { promotionCode } = req.body;
  const updateFields = {};
  const update = await Promotion.update(updateFields, {
    attributes: { exclude: ["id"] },
    where: {
      customerNo: customerNo,
      // customerStatus: "20",
      coNo: "410",
    },
  });
  if (update === 0) {
    res.status(304);
  } else {
    res.status(202).json({
      message: "Accepted",
    });
  }
};

exports.single = async (req, res, next) => {
  const { promotionCode } = req.body;
  const promotionData = await Promotion.findOne({
    where: {
      promotionCode: promotionCode,
      FZCONO: "410",
    },
  });
  res.json(promotionData);
};

exports.insert = async (req, res, next) => {
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

exports.deleted = async (req, res, next) => {
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
