const Sale = require("../../models/sale");
const { filterStringParentTH } = require("../../utils/String");

exports.getSaleAll = async (req, res, next) => {
  try {
    // const { coNo, saleCode } = req.body;
    const saleDate = await Sale.findAll({
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

exports.getSale = async (req, res, next) => {
  try {
    const { saleCode } = req.body;
    const saleDate = await Sale.findAll({
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
    res.json(sales[0]);
  } catch (error) {
    next(error);
  }
};
