const Customer = require("../models/customer");
const Shipping = require("../models/shipping");
const Sale = require("../models/sale");
const { filterStringParentTH } = require("../../utils/filterString");
const path = require('path');
const currentFilePath = path.basename(__filename);

exports.customer = async (data) => {
  try {
    const { customerNo } = data;

    const customersData = await Customer.findAll({
      attributes: { exclude: ["id"] },
      where: { customerStatus: 20, coNo: 410, customerNo },
    });

    const shippingarr = [];
    const salearr = [];

    for (const customer of customersData) {
      const shippingData = await Shipping.findAll({
        attributes: { exclude: ["id"] },
        where: { customerNo: customer.customerNo, coNo: "410" },
      });

      shippingData.forEach((shipping) => {
        shippingarr.push({
          addressID: shipping.addressID,
          customerName: shipping.customerName,
          shippingAddress1: shipping.shippingAddress1.trim(),
          shippingAddress2: shipping.shippingAddress2.trim(),
          shippingAddress3: shipping.shippingAddress3.trim(),
          shippingPoscode: shipping.shippingPoscode.trim(),
          shippingPhone: shipping.shippingPhone.trim(),
        });
      });
    }

    for (const customer of customersData) {
      const saleData = await Sale.findAll({
        attributes: { exclude: ["id"] },
        where: { saleCode: customer.saleCode, CTSTCO: "SMCD", coNo: 410 },
      });

      const sales = saleData.map((sale) => ({
        saleCode: sale.saleCode.trim(),
        saleName: filterStringParentTH(sale.saleName.trim()),
      }));

      sales.forEach((sale) => {
        salearr.push({
          saleCode: sale.saleCode,
          sale_name: sale.saleName,
        });
      });
    }

    const customers = customersData.map((customer) => ({
      coNo: customer.coNo,
      customerStatus: customer.customerStatus,
      customerNo: customer.customerNo.trim(),
      customerChannel: customer.customerChannel,
      customerName:
        customer.customerChannel == "102" || customer.customerChannel == "103"
          ? customer.customerName + customer.customerAddress4
          : customer.customerName,
      customerAddress1: customer.customerAddress1,
      customerAddress2: customer.customerAddress2,
      customerAddress3: customer.customerAddress3,
      customerAddress4: customer.customerAddress4,
      customerPoscode: customer.customerPoscode.trim(),
      customerPhone: customer.customerPhone.trim(),
      creditTerm: customer.creditTerm,
      orderType: customer.orderType,
      zone: customer.saleZone.trim(),
      saleTeam: customer.saleTeam.trim(),
      saleCode: customer.saleCode.trim(),
      salePayer: customer.salePayer.trim(),
      OKCFC1: customer.OKCFC1.trim(),
      OKCFC3: customer.OKCFC3.trim(),
      OKCFC6: customer.OKCFC6.trim(),
      creditLimit: customer.creditLimit,
      taxno: customer.taxno.trim(),
      OKCSCD: customer.OKCSCD.trim(),
      OKECAR: customer.OKECAR,
      OKFACI: customer.OKFACI.trim(),
      OKINRC: customer.OKINRC.trim(),
      OKCUCD: customer.OKCUCD.trim(),
      OKALCU: customer.OKALCU.trim(),
      OKPYCD: customer.OKPYCD,
      OKMODL: customer.OKMODL,
      OKTEDL: customer.OKTEDL,
      shippings: shippingarr,
      sale: salearr,
    }));

    if (!customers.length) {
      throw { statusCode: 404, message: "Not Found" };
    }

    return { status: 200, data: customers };
  } catch (error) {
    // Throw the error with the current file path and error details
    const enhancedError = new Error(
      `Error in ${currentFilePath}, function 'customer': ${error.message}`
    );
    enhancedError.status = error.status || 500;
    enhancedError.stack = error.stack; // Preserve the original stack trace
    throw enhancedError;
  }
};
