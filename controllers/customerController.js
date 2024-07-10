const { Customer, Sale, Shipping } = require("../models/customer");
const { Sequelize, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

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
        [Op.or]: [
          {
            customer_status: "20",
            co_code: "410",
          },
        ],
        customer_code: {
          [Op.like]: `%${customer_no}%`,
        },
        OKCUCL: {
          [Op.like]: `%${OKCUCL}%`,
        },
        OKCFC1: {
          [Op.like]: `%${OKCFC1}%`,
        },
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
        where: { CTSTKY: customersData[i].sale_code, CTSTCO: "SMCD" },
        // group: ["MMFUDS"],
      });
      const sales = saleData.map((sale) => {
        const OKSMCD = sale.CTSTKY.trim();
        return {
          CTSTKY: OKSMCD,
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
      const OKSDST = customer.OKSDST.trim();
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
        OKCUCL: customer.OKCUCL,
        customer_name:
          OKCUCL == "102" || "103"
            ? customer.customer_name + customer.customer_address4
            : customer.customer_name,
        co_code: customer.co_code,
        customer_address1: customer.customer_address1,
        customer_address2: customer.customer_address2,
        customer_address3: customer.customer_address3,
        customer_address4: customer.customer_address4,
        customer_poscode: customer_poscode,
        customer_phone: customer_phone,
        credit_term: customer.credit_term,
        co_type: customer.co_type,
        sdst: OKSDST,
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

    if (!customers.length) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }

    res.json(customers);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      customer_no,
      customer_status,
      OKCUCL,
      customer_name,
      customer_address1,
      customer_address2,
      customer_address3,
      customer_address4,
      customer_poscode,
      customer_phone,
      credit_term,
      co_type,
      warehouse,
      OKSDST,
      OKCFC1,
      OKCFC3,
      OKCFC6,
      sale_team,
      sale_code,
    } = req.body;

    const updateFields = {};

    if (customer_name !== null && customer_name !== undefined) {
      updateFields.customer_name = customer_name;
    }
    if (
      (customer_status !== null && customer_status !== undefined) ||
      customer_status !== ""
    ) {
      updateFields.customer_status = customer_status;
    }
    if ((OKCUCL !== null && OKCUCL !== undefined) || customer_status !== "") {
      updateFields.OKCUCL = OKCUCL;
    }
    if (customer_address1 !== null && customer_address1 !== undefined || customer_status !== "") {
      updateFields.customer_address1 = customer_address1;
    }
    if (customer_address2 !== null && customer_address2 !== undefined || customer_status !== "")  {
      updateFields.customer_address2 = customer_address2;
    }
    if (customer_address3 !== null && customer_address3 !== undefined || customer_status !== "") {
      updateFields.customer_address3 = customer_address3;
    }
    if (customer_address4 !== null && customer_address4 !== undefined || customer_status !== "") {
      updateFields.customer_address4 = customer_address4;
    }
    if (customer_poscode !== null && customer_poscode !== undefined || customer_status !== "") {
      updateFields.customer_poscode = customer_poscode;
    }
    if (customer_phone !== null && customer_phone !== undefined || customer_status !== "") {
      updateFields.customer_phone = customer_phone;
    }
    if (credit_term !== null && credit_term !== undefined || customer_status !== "") {
      updateFields.credit_term = credit_term;
    }
    if (co_type !== null && co_type !== undefined || customer_status !== "") {
      updateFields.co_type = co_type;
    }
    if (warehouse !== null && warehouse !== undefined || customer_status !== "") {
      updateFields.warehouse = warehouse;
    }
    if (OKSDST !== null && OKSDST !== undefined || customer_status !== "") {
      updateFields.OKSDST = OKSDST;
    }
    if (OKCFC1 !== null && OKCFC1 !== undefined || customer_status !== "") {
      updateFields.OKCFC1 = OKCFC1;
    }
    if (OKCFC3 !== null && OKCFC3 !== undefined || customer_status !== "") {
      updateFields.OKCFC3 = OKCFC3;
    }
    if (OKCFC6 !== null && OKCFC6 !== undefined || customer_status !== "") {
      updateFields.OKCFC6 = OKCFC6;
    }
    if (sale_team !== null && sale_team !== undefined) {
      updateFields.sale_team = sale_team;
    }
    if (sale_code !== null && sale_code !== undefined) {
      updateFields.sale_code = sale_code;
    }
    const update = await Customer.update(updateFields, {
      attributes: { exclude: ["id"] },
      where: {
        customer_code: customer_no,
        customer_status: "20",
        co_code: "410",
      },
    });
    console.log(update[0] === 0);
    if (update[0] === 0) {
      const error = new Error("Not Found Update");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json({
        message: "Update Success",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { OKCUCL, OKCUNO, OKCFC1, OKCUNM, OKALCU } = req.body;
    await Customer.update(
      { customer_name: OKCUNM },
      {
        where: {
          lastName: null,
        },
      }
    );
  } catch (error) {
    next(error);
  }
};
