const DocumentType = require("../../models/documenttype");

exports.indexdoc = async (req, res, next) => {
  try {
    const data = await DocumentType.findAll({
      where: {
        coNo: 410,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.singledoc = async (req, res, next) => {
  try {
    const { orderType } = req.body;
    const data = await DocumentType.findAll({
      where: {
        coNo: 410,
        orderType: orderType,
      },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};
