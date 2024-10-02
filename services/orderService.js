const DocumentType = require("../models/documenttype");
const path = require('path');
const currentFilePath = path.basename(__filename);

exports.documentType = async (req, res, next) => {
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
