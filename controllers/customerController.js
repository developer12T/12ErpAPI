const { Customer, Sale, Shipping } = require("../models/customer");
const { Sequelize, Op } = require("sequelize");

exports.index = async (req, res, next) => {
  try {
    const { OKCUCL, customer_no, OKCFC1 } = req.body;
    const customersData = await Customer.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        customer_phone: "02-2211748",
        customer_status: "20",
        co_code: "410",
      },
    });
    let shippingarr = [];
    let salearr = [];

    for (let i = 0; i < customersData.length; i++) {
      const shippingData = await Shipping.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { OPCUNO: customersData[i].customer_code },
        // group: ["MMFUDS"],
      });
      for (let i = 0; i < shippingData.length; i++) {
        shippingarr.push({
          OPADID: shippingData[i].OPADID,
          OPCUNM: shippingData[i].OPCUNM,
        });
      }
    }

    for (let i = 0; i < customersData.length; i++) {
      const saleData = await Sale.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { CTSTKY: customersData[i].sale_code },
        // group: ["MMFUDS"],
      });
      const sales = saleData.map((sale) => {
        const sale_code = sale.CTSTKY.trim();
        return {
          CTSTKY: sale_code,
          CTTX40: sale.CTTX40,
        };
      });
      for (let i = 0; i < sales.length; i++) {
        // const sale_code = saleData[].customer_code.trim();
        salearr.push({
          OKSMCD: sales[i].CTSTKY,
          sale_name: sales[i].CTTX40,
        });
      }
    }

    const customers = customersData.map((customer) => {
      const customer_code = customer.customer_code.trim();
      const customer_poscode = customer.customer_poscode.trim();
      const customer_phone = customer.customer_phone.trim();
      const sdst = customer.sdst.trim();
      const customer_team = customer.customer_team.trim();
      const OKCFC1 = customer.OKCFC1.trim();
      const OKCFC3 = customer.OKCFC3.trim();
      const OKCFC6 = customer.OKCFC6.trim();
      const sales_payer = customer.sales_payer.trim();
      //   const credit_limit = customer.credit_limit.trim();
      const taxno = customer.taxno.trim();
      return {
        customer_code: customer_code,
        customer_status: customer.customer_status,
        money_type: customer.warehouse,
        customer_name: customer.customer_name,
        co_code: customer.co_code,
        customer_address1: customer.customer_address1,
        customer_address2: customer.customer_address2,
        customer_address3: customer.customer_address3,
        customer_poscode: customer_poscode,
        customer_phone: customer_phone,
        credit_term: customer.credit_term,
        co_type: customer.co_type,
        sdst: sdst,
        customer_team: customer_team,
        OKCFC1: OKCFC1,
        OKCFC3: OKCFC3,
        OKCFC6: OKCFC6,
        sales_payer: sales_payer,
        credit_limit: customer.credit_limit,
        taxno: taxno,
        shipping: shippingarr,
        sale: salearr,
      };
    });

    res.json(customers);
  } catch (error) {
    next(error);
  }
};
