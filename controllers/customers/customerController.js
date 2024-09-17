const Customer = require("../../models/customer");
const Shipping = require("../../models/shipping");
const Sale = require("../../models/sale");
const { Op } = require("sequelize");
const axios = require("axios");
const { HOST } = require("../../config/index");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const fs = require("fs");
const path = require("path");
const { filterStringParentTH } = require("../../middleware/filterString");
const { decryptData, encryptData } = require("../../middleware/hashData");

exports.index = async (req, res, next) => {
  try {
    const { customerChannel, customerNo, OKCFC1 } = req.body;
    const customersData = await Customer.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        [Op.or]: [
          {
            customerStatus: "20",
            coNo: "410",
          },
        ],
        customerNo: {
          [Op.like]: `%${customerNo}%`,
        },
        customerChannel: {
          [Op.like]: `%${customerChannel}%`,
        },
        OKCFC1: {
          [Op.like]: `%${OKCFC1}%`,
        },
      },
    });

    if (!customersData.length) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }

    const customers = customersData.map((customer) => ({
      customerNo: customer.customerNo?.trim() || "",
      customerStatus: customer.customerStatus,
      customerChannel: customer.customerChannel,
      customerName: customer.customerName?.trim() || "",
      coNo: customer.coNo,
      customerAddress1: customer.customerAddress1,
      customerAddress2: customer.customerAddress2,
      customerAddress3: customer.customerAddress3,
      customerAddress4: customer.customerAddress4,
      customerPoscode: customer.customerPoscode?.trim() || "",
      customerPhone: customer.customerPhone?.trim() || "",
      creditTerm: customer.creditTerm,
      orderType: customer.orderType,
      zone: customer.saleZone?.trim() || "",
      saleTeam: customer.saleTeam?.trim() || "",
      OKCFC1: customer.OKCFC1?.trim() || "",
      OKCFC3: customer.OKCFC3?.trim() || "",
      OKCFC6: customer.OKCFC6?.trim() || "",
      salePayer: customer.salePayer?.trim() || "",
      creditLimit: customer.creditLimit,
      taxno: customer.taxno?.trim() || "",
      shipping: [],
      sale: [],
    }));

    for (const customer of customers) {
      const shippingData = await Shipping.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { customerNo: customer.customerNo, coNo: "410" },
      });

      if (shippingData.length) {
        for (const shipping of shippingData) {
          customer.shipping.push({
            addressID: shipping.addressID,
            customerName: shipping.customerName,
            shippingAddress1: shipping.shippingAddress1?.trim() || "",
            shippingAddress2: shipping.shippingAddress2?.trim() || "",
            shippingAddress3: shipping.shippingAddress3?.trim() || "",
            shippingPoscode: shipping.shippingPoscode?.trim() || "",
            shippingPhone: shipping.shippingPhone?.trim() || "",
          });
        }
      }
    }

    for (const customer of customers) {
      const saleData = await Sale.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { saleCode: customer.customerNo, CTSTCO: "SMCD" },
      });

      if (saleData.length) {
        for (const sale of saleData) {
          customer.sale.push({
            saleCode: sale.saleCode?.trim() || "",
            saleName: filterStringParentTH(sale.saleName || "").trim(),
          });
        }
      }
    }

    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

exports.single = async (req, res, next) => {
  try {
    const { customerNo } = req.body;
    const customersData = await Customer.findAll({
      //   limit: 10,
      attributes: {
        exclude: ["id"],
      },
      where: {
        customerStatus: 20,
        coNo: 410,
        customerNo: customerNo,
      },
    });

    let shippingarr = [];
    let salearr = [];

    for (let i = 0; i < customersData.length; i++) {
      const shippingData = await Shipping.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: { customerNo: customersData[i].customerNo, coNo: "410" },
        // group: ["MMFUDS"],
      });
      for (let i = 0; i < shippingData.length; i++) {
        shippingarr.push({
          addressID: shippingData[i].addressID,
          customerName: shippingData[i].customerName,
          shippingAddress1: shippingData[i].shippingAddress1,
          shippingAddress2: shippingData[i].shippingAddress2,
          shippingAddress3: shippingData[i].shippingAddress3,
          shippingPoscode: shippingData[i].shippingPoscode,
          shippingPhone: shippingData[i].shippingPhone,
        });
      }
    }

    const shippings = shippingarr.map((shipping) => {
      const shippingPoscode = shipping.shippingPoscode.trim();
      const shippingPhone = shipping.shippingPhone.trim();
      const shippingAddress1 = shipping.shippingAddress1.trim();
      const shippingAddress2 = shipping.shippingAddress2.trim();
      const shippingAddress3 = shipping.shippingAddress3.trim();
      return {
        addressID: shipping.addressID,
        customerName: shipping.customerName,
        shippingAddress1: shippingAddress1,
        shippingAddress2: shippingAddress2,
        shippingAddress3: shippingAddress3,
        shippingPoscode: shippingPoscode,
        shippingPhone: shippingPhone,
      };
    });

    for (let i = 0; i < customersData.length; i++) {
      const saleData = await Sale.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          saleCode: customersData[i].saleCode,
          CTSTCO: "SMCD",
          coNo: 410,
        },
        // group: ["MMFUDS"],
      });
      const sales = saleData.map((sale) => {
        const OKSMCD = sale.saleCode.trim();
        const saleName = sale.saleName.trim();
        return {
          saleCode: OKSMCD,

          saleName: filterStringParentTH(saleName),
        };
      });
      for (let i = 0; i < sales.length; i++) {
        // const saleCode = saleData[].customerNo.trim();
        salearr.push({
          saleCode: sales[i].saleCode,
          sale_name: sales[i].saleName,
        });
      }
    }

    const customers = customersData.map((customer) => {
      const customerNo = customer.customerNo.trim();
      const customerPoscode = customer.customerPoscode.trim();
      const customerPhone = customer.customerPhone.trim();
      const saleZone = customer.saleZone.trim();
      const saleTeam = customer.saleTeam.trim();
      const OKCFC1 = customer.OKCFC1.trim();
      const OKCFC3 = customer.OKCFC3.trim();
      const OKCFC6 = customer.OKCFC6.trim();
      const OKCSCD = customer.OKCSCD.trim();
      const salePayer = customer.salePayer.trim();
      const taxno = customer.taxno.trim();
      const saleCode = customer.saleCode.trim();
      const OKFACI = customer.OKFACI.trim();
      const OKINRC = customer.OKINRC.trim();
      const OKCUCD = customer.OKCUCD.trim();
      const OKALCU = customer.OKALCU.trim();
      // const OKPYCD = customer.OKPYCD.trim();
      // const taxno = customer.taxno.trim();
      return {
        coNo: customer.coNo,
        customerStatus: customer.customerStatus,
        customerNo: customerNo,
        customerChannel: customer.customerChannel,
        customerName:
          customer.customerChannel == "102" || "103"
            ? customer.customerName + customer.customerAddress4
            : customer.customerName,
        customerAddress1: customer.customerAddress1,
        customerAddress2: customer.customerAddress2,
        customerAddress3: customer.customerAddress3,
        customerAddress4: customer.customerAddress4,
        customerPoscode: customerPoscode,
        customerPhone: customerPhone,
        creditTerm: customer.creditTerm,
        orderType: customer.orderType,
        zone: saleZone,
        saleTeam: saleTeam,
        saleCode: saleCode,
        salePayer: salePayer,
        OKCFC1: OKCFC1,
        OKCFC3: OKCFC3,
        OKCFC6: OKCFC6,
        creditLimit: customer.creditLimit,
        taxno: taxno,
        OKCSCD: OKCSCD,
        OKECAR: customer.OKECAR,
        OKFACI: OKFACI,
        OKINRC: OKINRC,
        OKCUCD: OKCUCD,
        OKALCU: OKALCU,
        OKPYCD: customer.OKPYCD,
        OKMODL: customer.OKMODL,
        OKTEDL: customer.OKTEDL,
        shippings: shippings,
        sale: salearr,
      };
    });

    if (!customers.length) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      customerNo,
      customerStatus,
      customerChannel,
      // customerName,
      customerAddress1,
      customerAddress2,
      customerAddress3,
      // customerAddress4,
      customerPoscode,
      customerPhone,
      creditTerm,
      orderType,
      warehouse,
      OKSDST,
      OKCFC1,
      OKCFC3,
      OKCFC6,
      saleTeam,
      saleCode,
    } = req.body;
    let { customerAddress4, customerName } = req.body;

    const updateFields = {};

    const customersData = await Customer.findAll({
      where: {
        customerNo: customerNo,
        coNo: 410,
      },
    });

    // console.log(customersData);
    const customers = customersData.map((customer) => {
      // const customerChannel = customer.customerChannel.trim();
      // const customerPoscode = customer.customerPoscode.trim();
      // const customerPhone = customer.customerPhone.trim();
      // const creditTerm = customer.creditTerm.trim();
      // const orderType = customer.orderType.trim();
      // const warehouse = customer.warehouse.trim();
      // const OKSDST = customer.OKSDST.trim();
      // const saleTeam = customer.saleTeam.trim();
      // const OKCFC1 = customer.OKCFC1.trim();
      // const OKCFC3 = customer.OKCFC3.trim();
      // const OKCFC6 = customer.OKCFC6.trim();
      // const saleCode = customer.saleCode.trim();
      return {
        customerName: customer.customerName,
        customerStatus: customer.customerStatus,
        customerChannel: customer.customerChannel,
        customerAddress1: customer.customerAddress1,
        customerAddress2: customer.customerAddress2,
        customerAddress3: customer.customerAddress3,
        customerAddress4: customer.customerAddress4,
        customerPoscode: customer.customerPoscode,
        customerPhone: customer.customerPhone,
        creditTerm: customer.creditTerm,
        orderType: customer.orderType,
        warehouse: customer.warehouse,
        OKSDST: customer.OKSDST,
        saleTeam: customer.saleTeam,
        OKCFC1: customer.OKCFC1,
        OKCFC3: customer.OKCFC3,
        OKCFC6: customer.OKCFC6,
        saleCode: customer.saleCode,
      };
    });
    if (customers[0].customerName !== customerName) {
      updateFields.customerName = customerName;
    }
    if (customers[0].customerStatus !== customerStatus) {
      updateFields.customerStatus = customerStatus;
    }
    if (customers[0].customerChannel !== customerChannel) {
      updateFields.customerChannel = customerChannel;
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
    if (customers[0].orderType !== orderType) {
      updateFields.orderType = orderType;
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



    if ((customerName.trim().length > 36 && customerChannel == !105) || 103) {
      updateFields.customerAddress4 = customerName.trim().slice(35);
      updateFields.customerName = customerName.trim().slice(0, 35);
    }

    const update = await Customer.update(updateFields, {
      where: {
        customerNo: customerNo,
        // customerStatus: "20",
        coNo: "410",
      },
    });
    // console.log(update);
    if (update === 0) {
      res.status(304);
    } else {
      res.status(202).json({
        message: "Accepted",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.insert = (io) => {
  return async (req, res, next) => {
    try {
      const {
        Hcase,
        customerNo,
        customerStatus,
        customerChannel,
        customerAddress1,
        customerAddress2,
        customerAddress3,
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
        saleZone,
      } = req.body;

      let { customerAddress4, customerName } = req.body;
      const shippings = req.body.shippings;

      if ((customerName.trim().length > 36 && customerChannel == !105) || 103) {
        customerAddress4 = customerName.trim().slice(35);
        customerName = customerName.trim().slice(0, 35);
      }

      const jsonPath = path.join(__dirname, "../../", "Jsons", "customer.json");
      let existingData = [];
      if (fs.existsSync(jsonPath)) {
        const jsonData = fs.readFileSync(jsonPath, "utf-8");
        existingData = JSON.parse(jsonData);
      }

      const customer = {
        coNo: existingData.OKCONO, // OKCONO
        // OKDIVI
        customerStatus: customerStatus, // OKSTAT
        customerNo: customerNo, // OKCUNO,

        customerChannel: customerChannel, // OKCUCL
        // OKCUTP
        // OKALCU
        orderType: "021", // OKORTP
        customerName: customerName, // OKCUNM
        customerAddress1: customerAddress1, // OKCUA1
        customerAddress2: customerAddress2, // OKCUA2
        customerAddress3: customerAddress3, // OKCUA3
        customerAddress4: customerAddress4, // OKCUA4
        // OKADID
        customerPhone: customerPhone, // OKPHNO
        // OKTREF
        customerPoscode: customerPoscode, // OKPONO

        warehouse: warehouse, // OKWHLO
        OKSDST: OKSDST, // OKSDST
        saleTeam: saleTeam, // OKCFC8
        OKCFC1: OKCFC1, // OKCFC1
        OKCFC3: OKCFC3, // OKCFC3
        OKCFC6: OKCFC6, // OKCFC6
        salePayer: salePayer, // OKPYNO
        creditLimit: creditLimit, // OKCRL2
        taxno: taxno, // OKVRNO
        saleCode: saleCode, // OKSMCD
        OKCUTP: existingData.OKCUTP, // OKCUTP
        OKCORG: existingData.OKCORG, // OKCORG
        creditTerm: existingData.OKTEPY, // OKTEPY
        OKOT75: existingData.OKOT75, // OKOT75
        OKTEDL: existingData.OKTEDL, // OKTEDL
        OKMODL: existingData.OKMODL, // OKMODL
        OKDIPC: existingData.OKDIPC, // OKDIPC
        OKTXAP: existingData.OKTXAP, // OKTXAP
        OKCUCD: existingData.OKCUCD, // OKCUCD
        OKCRTP: existingData.OKCRTP, // OKCRTP
        OKDTFM: existingData.OKDTFM, // OKDTFM
        OKPRIC: existingData.OKPRIC, // OKPRIC
        OKCSCD: existingData.OKCSCD, // OKCSCD
        OKLHCD: existingData.OKLHCD, // OKLHCD
        OKDOGR: existingData.OKDOGR, // OKDOGR
        OKEDES: existingData.OKEDES, // OKEDES
        OKPYCD: existingData.OKPYCD, // OKPYCD
        OKGRPY: existingData.OKGRPY, // OKGRPY
        OKTINC: existingData.OKTINC, // OKTINC
        OKPRDL: existingData.OKPRDL, // OKPRDL
        OKIVGP: existingData.OKIVGP, // OKIVGP
        OKFACI: existingData.OKFACI, // OKFACI
        OKRESP: existingData.USER, // OKRESP
        OKUSR1: existingData.USER, // OKUSR1
        OKUSR2: existingData.USER, // OKUSR2
        OKUSR3: existingData.USER, // OKUSR3
        OKDTE1: formatDate(), // OKDTE1
        OKDTE2: formatDate(), // OKDTE2
        OKDTE3: formatDate(), // OKDTE3
        OKRGDT: formatDate(), // OKRGDT
        OKRGTM: getCurrentTimeFormatted(), // OKRGTM
        OKLMDT: formatDate(), // OKLMDT
        OKCHID: existingData.USER, // OKCHID
        OKLMTS: Date.now(), // OKLMTS
        saleZone: saleZone,
      };
      if (Hcase === 1) {
        await Customer.create(customer);
      }
      let shippingData = shippings.map((shipping) => {
        return {
          customerNo: customerNo,
          customerName: customerName,
          shippingAddress1: shipping.shippingAddress1,
          shippingAddress2: shipping.shippingAddress2,
          shippingAddress3: shipping.shippingAddress3,
          shippingAddress4:
            customerChannel == 102 || customerChannel == 103
              ? customerAddress4 || shipping.shippingAddress4
              : shipping.shippingAddress4,
          shippingPoscode: shipping.shippingPoscode,
          shippingPhone: shipping.shippingPhone,
          shippingRoute: shipping.shippingRoute,
          shippingRoute: shipping.shippingRoute,
        };
      });
      // Insert Shipping
      await axios({
        method: "post",
        url: `${HOST}shinpping/insert`,
        data: {
          shippings: shippingData,
        },
      });

      io.emit("shippingData", shippingData);
      io.emit("customerData", customer);
      res.status(201).json({
        message: "Created",
      });
    } catch (error) {
      next(error);
    }
  };
};

exports.saleZone = (io) => {
  return async (req, res, next) => {
    try {
      const { saleZone } = req.body;
      const customersData = await Customer.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          customerStatus: 20,
          coNo: 410,
          saleZone: saleZone,
        },
      });
      const customers = customersData.map((customer) => {
        const customerNo = customer.customerNo.trim();
        const customerPoscode = customer.customerPoscode.trim();
        const customerPhone = customer.customerPhone.trim();
        const saleZone = customer.saleZone.trim();
        const saleTeam = customer.saleTeam.trim();
        const OKCFC1 = customer.OKCFC1.trim();
        const OKCFC3 = customer.OKCFC3.trim();
        const OKCFC6 = customer.OKCFC6.trim();
        const salePayer = customer.salePayer.trim();
        const taxno = customer.taxno.trim();
        const OKALCU = customer.OKALCU.trim();
        return {
          customerNoHash: encryptData(customerNo),
          customerNo: decryptData(encryptData(customerNo)),
          customerStatus: customer.customerStatus,
          customerChannel: customer.customerChannel,
          customerName:
            customer.customerChannel == "102" || "103"
              ? customer.customerName + customer.customerAddress4
              : customer.customerName,
          OKALCU: OKALCU,
          coNo: customer.coNo,
          customerAddress1: customer.customerAddress1,
          customerPoscode: customerPoscode,
          customerPhone: customerPhone,
          creditTerm: customer.creditTerm,
          orderType: customer.orderType,
          zone: saleZone,
          saleTeam: saleTeam,
          OKCFC1: OKCFC1,
          OKCFC3: OKCFC3,
          OKCFC6: OKCFC6,
          salePayer: salePayer,
          creditLimit: customer.creditLimit,
          taxno: taxno,
        };
      });

      if (!customers.length) {
        const error = new Error("Not Found");
        error.statusCode = 404;
        throw error;
      }
      // Emit data via Socket.io
      io.emit("customerData", customers);
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  };
};

exports.deleted = async (req, res, next) => {
  try {
    const { customerNo, coNo } = req.body;
    // res.status(204);
    const deleted = await Customer.update(
      { coNo: `${coNo * -1}` },
      {
   
        where: {
          coNo: coNo,
          customerNo: customerNo,
        },
      }
    );
    if (deleted[0] === 1) {
      res.status(202).json({
        message: "Deleted",
      });
    } else {
      res.status(304).json({
        message: "Not Modified",
      });
    }
  } catch (error) {
    next(error);
  }
};
