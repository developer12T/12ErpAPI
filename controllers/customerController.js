const { Customer, Sale, Shipping } = require("../models/customer");
const { Sequelize, Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

exports.index = async (req, res, next) => {
  try {
    const { moneyChannel, customerNo, OKCFC1 } = req.body;
    const customersData = await Customer.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        customerPhone: "02-2211748",
        [Op.or]: [
          {
            customerStatus: "20",
            coNo: "410",
          },
        ],
        customerNo: {
          [Op.like]: `%${customerNo}%`,
        },
        moneyChannel: {
          [Op.like]: `%${moneyChannel}%`,
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
        where: { OPCUNO: customersData[i].customerNo },
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
        where: { CTSTKY: customersData[i].saleCode, CTSTCO: "SMCD" },
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
        // const saleCode = saleData[].customerNo.trim();
        salearr.push({
          OKSMCD: sales[i].CTSTKY,
          sale_name: sales[i].CTTX40,
        });
      }
    }

    const customers = customersData.map((customer) => {
      const customerNo = customer.customerNo.trim();
      const customerPoscode = customer.customerPoscode.trim();
      const customerPhone = customer.customerPhone.trim();
      const OKSDST = customer.OKSDST.trim();
      const saleTeam = customer.saleTeam.trim();
      const OKCFC1 = customer.OKCFC1.trim();
      const OKCFC3 = customer.OKCFC3.trim();
      const OKCFC6 = customer.OKCFC6.trim();
      const salePayer = customer.salePayer.trim();
      const taxno = customer.taxno.trim();

      return {
        customerNo: customerNo,
        customerStatus: customer.customerStatus,
        moneyChannel: customer.moneyChannel,
        customerName:
          moneyChannel == "102" || "103"
            ? customer.customerName + customer.customerAddress4
            : customer.customerName,
        coNo: customer.coNo,
        customerAddress1: customer.customerAddress1,
        customerAddress2: customer.customerAddress2,
        customerAddress3: customer.customerAddress3,
        customerAddress4: customer.customerAddress4,
        customerPoscode: customerPoscode,
        customerPhone: customerPhone,
        creditTerm: customer.creditTerm,
        coType: customer.coType,
        sdst: OKSDST,
        saleTeam: saleTeam,
        OKCFC1: OKCFC1,
        OKCFC3: OKCFC3,
        OKCFC6: OKCFC6,
        salePayer: salePayer,
        creditLimit: customer.creditLimit,
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
      customerNo,
      customerStatus,
      moneyChannel,
      customerName,
      customerAddress1,
      customerAddress2,
      customerAddress3,
      customerAddress4,
      customerPoscode,
      customerPhone,
      creditTerm,
      coType,
      warehouse,
      OKSDST,
      OKCFC1,
      OKCFC3,
      OKCFC6,
      saleTeam,
      saleCode,
    } = req.body;

    const updateFields = {};

    const customersData = await Customer.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        customerNo: customerNo,
        coNo: "410",
      },
    });
    // console.log(customersData);
    const customers = customersData.map((customer) => {
      const moneyChannel = customer.moneyChannel.trim();
      const customerPoscode = customer.customerPoscode.trim();
      const customerPhone = customer.customerPhone.trim();
      const creditTerm = customer.creditTerm.trim();
      const coType = customer.coType.trim();
      const warehouse = customer.warehouse.trim();
      const OKSDST = customer.OKSDST.trim();
      const saleTeam = customer.saleTeam.trim();
      const OKCFC1 = customer.OKCFC1.trim();
      const OKCFC3 = customer.OKCFC3.trim();
      const OKCFC6 = customer.OKCFC6.trim();
      const saleCode = customer.saleCode.trim();
      return {
        customerName: customer.customerName,
        customerStatus: customer.customerStatus,
        moneyChannel: moneyChannel,
        customerAddress1: customerAddress1,
        customerAddress2: customerAddress2,
        customerAddress3: customerAddress3,
        customerAddress4: customerAddress4,
        customerPoscode: customerPoscode,
        customerPhone: customerPhone,
        creditTerm: creditTerm,
        coType: coType,
        warehouse: warehouse,
        OKSDST: OKSDST,
        saleTeam: saleTeam,
        OKCFC1: OKCFC1,
        OKCFC3: OKCFC3,
        OKCFC6: OKCFC6,
        saleCode: saleCode,
      };
    });
    if (customers[0].customerName !== customerName) {
      updateFields.customerName = customerName;
    }
    if (customers[0].customerStatus !== customerStatus) {
      updateFields.customerStatus = customerStatus;
    }
    if (customers[0].moneyChannel !== moneyChannel) {
      updateFields.moneyChannel = moneyChannel;
    }
    if (customers[0].customerAddress1 !== customerAddress1) {
      updateFields.customerAddress1 = customerAddress1;
    }
    if (customers[0].customerAddress2 !== customerAddress2) {
      updateFields.customerAddress2 = customerAddress2;
    }
    if (customers[0].customerAddress3 !== customerAddress3) {
      updateFields.customerAddress3 = customerAddress3;
    }
    if (customers[0].customerAddress4 !== customerAddress4) {
      updateFields.customerAddress4 = customerAddress4;
    }
    if (customers[0].customerPoscode !== customerPoscode) {
      updateFields.customerPoscode = customerPoscode;
    }
    if (customers[0].customerPhone !== customerPhone) {
      updateFields.customerPhone = customerPhone;
    }
    if (customers[0].creditTerm !== creditTerm) {
      updateFields.creditTerm = creditTerm;
    }
    if (customers[0].coType !== coType) {
      updateFields.coType = coType;
    }
    if (customers[0].warehouse !== warehouse) {
      updateFields.warehouse = warehouse;
    }
    if (customers[0].OKSDST !== OKSDST) {
      updateFields.OKSDST = OKSDST;
    }
    if (customers[0].OKCFC1 !== OKCFC1) {
      updateFields.OKCFC1 = OKCFC1;
    }
    if (customers[0].OKCFC3 !== OKCFC3) {
      updateFields.OKCFC3 = OKCFC3;
    }
    if (customers[0].OKCFC6 !== OKCFC6) {
      updateFields.OKCFC6 = OKCFC6;
    }
    if (customers[0].saleTeam !== saleTeam) {
      updateFields.saleTeam = saleTeam;
    }
    if (customers[0].saleCode !== saleCode) {
      updateFields.saleCode = saleCode;
    }

    const [update] = await Customer.update(updateFields, {
      attributes: { exclude: ["id"] },
      where: {
        customerNo: customerNo,
        // customerStatus: "20",
        coNo: "410",
      },
    });
    console.log(update);
    if (update === 0) {
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

exports.insert = async (req, res, next) => {
  try {
    const {
      customerNo,
      customerStatus,
      customerName,
      moneyChannel,
      customerAddress1,
      customerAddress2,
      customerAddress3,
      customerAddress4,
      customerPoscode,
      customerPhone,
      warehouse,
      OKSDST,
      saleTeam,
      OKCFC1,
      OKCFC3,
      OKCFC6,
      salePayer,
      creditLimit,
      taxno,
      saleCode,
    } = req.body;

    const jsonPath = path.join(__dirname, "..", "Jsons", "customer.json");
    let existingData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }
    const customer = {
      customerNo: customerNo,
      coNo: existingData.OKCONO,
      customerStatus: customerStatus,
      moneyChannel: moneyChannel,
      coType: "021",
      customerName: customerName,
      customerAddress1: customerAddress1,
      customerAddress2: customerAddress2,
      customerAddress3: customerAddress3,
      customerAddress4: customerAddress4,
      customerPoscode: customerPoscode,
      customerPhone: customerPhone,
      warehouse: warehouse,
      OKSDST: OKSDST,
      saleTeam: saleTeam,
      OKCFC1: OKCFC1,
      OKCFC3: OKCFC3,
      OKCFC6: OKCFC6,
      salePayer: salePayer,
      creditLimit: creditLimit,
      taxno: taxno,
      saleCode: saleCode,
      OKCUTP: existingData.OKCUTP,
      OKCORG: existingData.OKCORG,
      creditTerm: existingData.OKTEPY,
      OKOT7: existingData.OKOT7,
      OKTEDL: existingData.OKTEDL,
      OKMODL: existingData.OKMODL,
      OKDIPC: existingData.OKDIPC,
      OKDIPC: existingData.OKDIPC,
      OKTXAP: existingData.OKTXAP,
      OKCUCD: existingData.OKCUCD,
      OKCRTP: existingData.OKCRTP,
      OKDTFM: existingData.OKDTFM,
      OKPRIC: existingData.OKPRIC,
      OKCSCD: existingData.OKCSCD,
      OKLHCD: existingData.OKLHCD,
      OKDOGR: existingData.OKDOGR,
      OKEDES: existingData.OKEDES,
      OKPYCD: existingData.OKPYCD,
      OKGRPY: existingData.OKGRPY,
      OKTINC: existingData.OKTINC,
      OKPRDL: existingData.OKPRDL,
      OKIVGP: existingData.OKIVGP,
      OKFACI: existingData.OKFACI,
      OKRESP: existingData.USER,
      OKUSR1: existingData.USER,
      OKUSR2: existingData.USER,
      OKUSR3: existingData.USER,
      OKDTE1: formatDate(),
      OKDTE2: formatDate(),
      OKDTE3: formatDate(),
      OKRGDT: formatDate(),
      OKRGTM: getCurrentTimeFormatted(),
      OKLMDT: formatDate(),
      OKCHID: existingData.USER,
      OKLMTS: Date.now(),
    };

    const query = `INSERT INTO [MVXJDTA].[OCUSMA] 
    (
[OKCUNO],
[OKSTAT],
[OKCUCL],
[OKCUNM],
[OKCONO],
[OKCUA1],
[OKCUA2],
[OKCUA3],
[OKCUA4],
[OKPONO],
[OKPHNO],
[OKTEPY],
[OKORTP],
[OKWHLO],
[OKSDST],
[OKCFC8],
[OKCFC1],
[OKCFC3],
[OKCFC6],
[OKPYNO],
[OKCRL2],
[OKVRNO],
[OKSMCD],
[OKRESP],
[OKUSR1],
[OKUSR2],
[OKUSR3],
[OKDTE1],
[OKDTE2],
[OKDTE3],
[OKRGDT],
[OKRGTM],
[OKLMDT],
[OKCHID],
[OKLMTS]
) 
OUTPUT 
VALUES 
(
:value1,
:value2,
:value3,
:value4,
:value5,
:value6,
:value7,
:value8,
:value9,
:value10,
:value11,
:value12,
:value13,
:value14,
:value15,
:value16,
:value17,
:value18,
:value19,
:value21,
:value22,
:value23,
:value24,
:value25,
:value26,
:value27,
:value28,
:value29,
:value30,
:value31,
:value32,
:value33,
:value34)`;

    const replacements = {
      value1: customerNo,
      value2: existingData.OKCONO,
      value3: customerStatus,
      value4: moneyChannel,
      value5: '021',
      value6: customerName,
      value7: customerAddress1,
      value8: customerAddress2,
      value9: customerAddress3,
      value10: customerAddress4,
      value11: customerPoscode,
      value12: customerPhone,
      value13: warehouse,
      value14: OKSDST,
      value15: saleTeam,
      value16: OKCFC1,
      value17: OKCFC3,
      value18: OKCFC6,
      value19: salePayer,
      value20: creditLimit,
      value21: taxno,
      value22: saleCode,
      value23: taxno,
      value24: saleCode,
      value25: existingData.OKCUTP,
      value26: "11002",
      value27: "11002",
      value28: "11002",
      value29: "11002",
      value30: "11002",
      value31: "11002",
      value32: "11002",
      value33: "11002",
      value34: "11002",
    };

    const result = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.INSERT
  }); 
    // existingData.push(addressData);

    // console.log(existingData.OKEDES);
    console.log(customer);
    // const customerData = exclude(customer, ["id"]);

    // existingData.push(addressData);

    // fs.writeFileSync(jsonPath, JSON.stringify(existingData, null, 2), "utf-8");
    // const customerData = excludeKeys(customer, ["id"]);
    // const created = await Customer.create(customerData);
    // res.json(created);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { moneyChannel, OKCUNO, OKCFC1, OKCUNM, OKALCU } = req.body;
    await Customer.update(
      { customerName: OKCUNM },
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

function excludeKeys(obj, keys) {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

function formatDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function getCurrentTimeFormatted() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}
