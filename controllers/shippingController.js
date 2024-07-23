const Shipping = require("../models/shipping");
const { Sequelize, Op, where } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../middleware/getDateTime");
const {
  filterStringEN,
  filterStringNumber,
} = require("../middleware/filterString");
exports.index = async (req, res, next) => {
  try {
    const { customerNo, OPADID } = req.body;
    const shippingData = await Shipping.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: { customerNo: customerNo, coNo: "410" },
    });
    const shippings = shippingData.map((shipping) => {
      const customerNo = shipping.customerNo.trim();
      const shippingPoscode = shipping.shippingPoscode.trim();
      const shippingPhone = shipping.shippingPhone.trim();
      return {
        coNo: shipping.coNo,
        customerNo: customerNo,
        OPADID: shipping.OPADID,
        customerName: shipping.customerName,
        shippingAddress1: shipping.shippingAddress1,
        shippingAddress2: shipping.shippingAddress2,
        shippingAddress3: shipping.shippingAddress3,
        shippingPoscode: shippingPoscode,
        shippingPhone: shippingPhone,
      };
    });
    res.json(shippings);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updateFields = {};
    const {
      customerNo,
      OPADID,
      customerName,
      shippingAddress1,
      shippingAddress2,
      shippingAddress3,
      shippingPoscode,
      shippingPhone,
    } = req.body;
    const shippingData = await Shipping.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: { customerNo: customerNo, OPADID: OPADID, coNo: "410" },
    });
    const shippings = shippingData.map((shipping) => {
      const customerNo = shipping.customerNo.trim();
      const shippingPoscode = shipping.shippingPoscode.trim();
      const shippingPhone = shipping.shippingPhone.trim();
      return {
        coNo: shipping.coNo,
        customerNo: customerNo,
        OPADID: shipping.OPADID,
        customerName: shipping.customerName,
        shippingAddress1: shipping.shippingAddress1,
        shippingAddress2: shipping.shippingAddress2,
        shippingAddress3: shipping.shippingAddress3,
        shippingPoscode: shippingPoscode,
        shippingPhone: shippingPhone,
      };
    });
    if (shippings[0].customerNo !== customerNo) {
      updateFields.customerNo = customerNo;
    }
    if (shippings[0].customerName !== customerName) {
      updateFields.customerName = customerName;
    }
    if (shippings[0].OPADID !== OPADID) {
      updateFields.OPADID = OPADID;
    }
    if (shippings[0].shippingAddress1 !== shippingAddress1) {
      updateFields.shippingAddress1 = shippingAddress1;
    }
    if (shippings[0].shippingAddress2 !== shippingAddress2) {
      updateFields.shippingAddress2 = shippingAddress2;
    }
    if (shippings[0].shippingAddress3 !== shippingAddress3) {
      updateFields.shippingAddress3 = shippingAddress3;
    }
    if (shippings[0].shippingPoscode !== shippingPoscode) {
      updateFields.shippingPoscode = shippingPoscode;
    }
    if (shippings[0].shippingPhone !== shippingPhone) {
      updateFields.shippingPhone = shippingPhone;
    }
    const [update] = await Shipping.update(updateFields, {
      attributes: { exclude: ["id"] },
      where: {
        customerNo: customerNo,
        OPADID: OPADID,
        coNo: "410",
      },
    });
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
      // OPADID,
      customerName,
      shippingAddress1,
      shippingAddress2,
      shippingAddress3,
      shippingPoscode,
      shippingPhone,
      OPULZO,
    } = req.body;

    const query = `
INSERT INTO [MVXJDTA].[OCUSAD] 
  ([OPCONO],
  [OPCUNO],
  [OPADRT],
  [OPADID],
  [OPCUNM],
  [OPCUA1],
  [OPCUA2],
  [OPCUA3],
  [OPCUA4],
  [OPPONO],
  [OPMODL],
  [OPTEDL],
  [OPPHNO],
  [OPCSCD],
  [OPEDES],
  [OPULZO],
  [OPGEOC],
  [OPFVDT],
  [OPLVDT],
  [OPDTID],
  [OPBCKO],
  [OPPADL],
  [OPRGDT],
  [OPRGTM],
  [OPLMDT],
  [OPCHNO],
  [OPCHID],
  [OPLMTS]
  ) VALUES (
     :coNO,
     :customerNo,
     :OPADRT,
     :OPADID,
     :customerName,
     :shippingAddress1,
     :shippingAddress2,
     :shippingAddress3,
     :shippingAddress4,
     :shippingPoscode,
     :OPMODL,
     :OPTEDL,
     :shippingPhone,
     :OPCSCD,
     :OPEDES,
     :OPULZO,
     :OPGEOC,
     :OPFVDT,
     :OPLVDT,
     :OPDTID,
     :OPBCKO,
     :OPPADL,
     :OPRGDT,
     :OPRGTM,
     :OPLMDT,
     :OPCHNO,
     :OPCHID,
     :OPLMTS)`;
    const jsonPath = path.join(__dirname, "..", "Jsons", "shipping.json");
    let existingData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }

    const shinppingData = await Shipping.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        customerNo: customerNo,
        coNo: "410",
        // addressID: "INVTSP",
      },
    });

    // res.json(shinppingData);
    let checkShipping = "INVTSP";
    let shinppingNum = 0;
    let OPADID = "";

    for (let shinpping of shinppingData) {
      if (filterStringEN(shinpping.addressID) === "SHIP") {
        checkShipping = "SHIP";
        if (shinppingNum < parseInt(filterStringNumber(shinpping.addressID))) {
          shinppingNum = parseInt(filterStringNumber(shinpping.addressID));
        }
      }
    }
    OPADID = `${checkShipping}${shinppingNum + 1}`;

    const replacements = {
      coNO: existingData.OPCONO, // OPCONO,
      customerNo: customerNo, // OPCUNO
      OPADRT: existingData.OPADRT, // OPPART
      OPADID: OPADID, // OPADID
      customerName: customerName, // OPCUNM
      shippingAddress1: shippingAddress1, // OPCUA1
      shippingAddress2: shippingAddress2, // OPCUA2
      shippingAddress3: shippingAddress3, // OPCUA3
      shippingAddress4: shippingAddress3, // OKCUA4
      shippingPoscode: shippingPoscode, // OPPONO
      // OPEALO: existingData.OPEALO, // OPEALO
      // OPECAR: '', // OPECAR
      // OPRONO: '', // OPRONO
      OPMODL: existingData.OPMODL, // OPMODL
      OPTEDL: existingData.OPTEDL, // OPTEDL
      shippingPhone: shippingPhone, // OPPHNO
      OPCSCD: existingData.OPCSCD, // OPCSCD
      OPEDES: existingData.OPEDES, // OPEDES
      // OPRODN: '', // OPRODN
      OPULZO: OPULZO, // OPULZO
      OPGEOC: existingData.OPGEOC, // OPGEOC
      OPFVDT: existingData.OPFVDT, // OPFVDT
      OPLVDT: existingData.OPLVDT, // OPLVDT
      OPDTID: existingData.OPDTID, // OPDTID
      OPBCKO: existingData.OPBCKO, // OPBCKO
      OPPADL: existingData.OPPADL, // OPPADL
      OPRGDT: formatDate(), // OPRGDT
      OPRGTM: getCurrentTimeFormatted(), // OPRGTM
      OPLMDT: formatDate(), // OPLMDT
      OPCHNO: existingData.OPCHNO, // OPCHNO
      OPCHID: existingData.OPCHID, // OPCHID
      OPLMTS: Date.now(), // OPLMTS
    };

    const result = await sequelize.query(query, {
      replacements,
      type: sequelize.QueryTypes.INSERT,
    });
    // res.status(201).json(replacements);

    res.status(201).json({
      message: "Insert Success",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleted = async (req, res, next) => {
  try {
    const { customerNo, addressID, coNo } = req.body;
    const deleted = await Shipping.update(
      { coNo: coNo },
      {
        attributes: { exclude: ["id"] },
        where: {
          coNo: `${coNo * -1}`,
          customerNo: customerNo,
          addressID: addressID,
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
