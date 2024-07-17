const Sale = require("../models/sale");
const { filterStringParentTH } = require("../middleware/filterString");

exports.index = async (req, res, next) => {
  try {
    // const { coNo, saleCode } = req.body;
    const saleDate = await Sale.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: "410",
        CTSTCO: "SMCD",
      },
    });

    const sales = saleDate.map((sale) => {
      const saleCode = sale.saleCode.trim();
      const saleName = sale.saleName.trim();
      const CTSTCO = sale.CTSTCO.trim();
      return {
        saleCode: saleCode,
        saleName: filterStringParentTH(saleName),
        CTSTCO: CTSTCO,
      };
    });
    res.json(sales);

    // console.log(filterStringParentTH(saleDate[0].saleNameFull));
  } catch (error) {
    next(error);
  }
};

exports.single = async (req, res, next) => {
  try {
    const { saleCode } = req.body;
    const saleDate = await Sale.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        coNo: "410",
        CTSTCO: "SMCD",
        saleCode: saleCode,
      },
    });
    const sales = saleDate.map((sale) => {
      const saleCode = sale.saleCode.trim();
      const saleName = sale.saleName.trim();
      const CTSTCO = sale.CTSTCO.trim();

      return {
        saleCode: saleCode,
        saleName: filterStringParentTH(saleName),
        CTSTCO: CTSTCO,
      };
    });
    res.json(sales);
  } catch (error) {
    next(error);
  }
};
