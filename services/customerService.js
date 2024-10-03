const Customer = require("../models/customer");
const Shipping = require("../models/shipping");
const Sale = require("../models/sale");
const path = require("path");
const currentFilePath = path.basename(__filename);
const {
  formatPhoneNumber,
  filterStringParentTH,
} = require("../utils/filterString");

exports.getCustomer = async (customerNo) => {
  try {
    const customersData = await Customer.findOne({
      where: { customerStatus: 20, coNo: 410, customerNo },
    });
    const shippingarr = [];
    const salearr = [];

    const shippingData = await Shipping.findAll({
      where: { customerNo: customersData.customerNo, coNo: "410" },
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

    const saleData = await Sale.findAll({
      where: { saleCode: customersData.saleCode, CTSTCO: "SMCD", coNo: 410 },
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

    const customers = {
      coNo: customersData.coNo,
      customerStatus: customersData.customerStatus,
      customerNo: customersData.customerNo.trim(),
      customerChannel: customersData.customerChannel,
      customerName:
        customersData.customerChannel == "102" ||
        customersData.customerChannel == "103"
          ? customersData.customerName + customersData.customerAddress4
          : customersData.customerName,
      customerAddress1: customersData.customerAddress1,
      customerAddress2: customersData.customerAddress2,
      customerAddress3: customersData.customerAddress3,
      customerAddress4: customersData.customerAddress4,
      customerPoscode: customersData.customerPoscode.trim(),
      customerPhone: customersData.customerPhone.trim(),
      creditTerm: customersData.creditTerm,
      orderType: customersData.orderType,
      zone: customersData.saleZone.trim(),
      saleTeam: customersData.saleTeam.trim(),
      saleCode: customersData.saleCode.trim(),
      salePayer: customersData.salePayer.trim(),
      OKCFC1: customersData.OKCFC1.trim(),
      OKCFC3: customersData.OKCFC3.trim(),
      OKCFC6: customersData.OKCFC6.trim(),
      creditLimit: customersData.creditLimit,
      taxno: customersData.taxno.trim(),
      OKCSCD: customersData.OKCSCD.trim(),
      OKECAR: customersData.OKECAR,
      OKFACI: customersData.OKFACI.trim(),
      OKINRC: customersData.OKINRC.trim(),
      OKCUCD: customersData.OKCUCD.trim(),
      OKALCU: customersData.OKALCU.trim(),
      OKPYCD: customersData.OKPYCD,
      OKMODL: customersData.OKMODL,
      OKTEDL: customersData.OKTEDL,
      shippings: shippingarr,
      sale: salearr,
    };

    if (!customers) {
      throw { statusCode: 404, message: "Not Found" };
    } 

    return customers;
  } catch (error) {
    // Throw the error with the current file path and error details
    const enhancedError = new Error(
      `Error in ${currentFilePath}, function 'getCustomer': ${error.message}`
    );
    enhancedError.status = error.status || 500;
    enhancedError.stack = error.stack; // Preserve the original stack trace
    throw enhancedError;
  }
};

exports.getShipping = async (data) => {
  try {
    const { customerNo, addressID } = data;
    let shippingData = await Shipping.findOne({
      where: {
        coNo: 410,
        customerNo,
        addressID,
      },
    });
    shippingData = {
      coNo: shippingData.coNo,
      customerNo: shippingData.customerNo.trim(),
      shippingRoute: shippingData.shippingRoute,
      addressID: shippingData.addressID,
      customerName: shippingData.customerName,
      shippingAddress1: shippingData.shippingAddress1,
      shippingAddress2: shippingData.shippingAddress2,
      shippingAddress3: shippingData.shippingAddress3,
      shippingPoscode: shippingData.shippingPoscode.trim(),
      shippingPhone: formatPhoneNumber(shippingData.shippingPhone),
    };
    return shippingData;
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
