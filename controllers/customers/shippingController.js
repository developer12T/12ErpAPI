const Shipping = require("../../models/shipping");
const { Sequelize, Op, where } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../../config/m3db");
const {
  formatDate,
  getCurrentTimeFormatted,
} = require("../../middleware/getDateTime");
const {
  filterStringEN,
  filterStringNumber,
} = require("../../middleware/filterString");

exports.index = async (req, res, next) => {
  try {
    const { customerNo, addressID } = req.body;
    const shippingData = await Shipping.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        customerNo,
        coNo: "410",
      },
    });

    const shippings = shippingData.map((shipping) => ({
      coNo: shipping.coNo,
      customerNo: shipping.customerNo.trim(),
      addressID: shipping.addressID,
      customerName: shipping.customerName,
      shippingAddress1: shipping.shippingAddress1,
      shippingAddress2: shipping.shippingAddress2,
      shippingAddress3: shipping.shippingAddress3,
      shippingPoscode: shipping.shippingPoscode.trim(),
      shippingPhone: shipping.shippingPhone.trim(),
    }));

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
      addressID,
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
      where: { customerNo: customerNo, addressID: addressID, coNo: "410" },
    });
    const shippings = shippingData.map((shipping) => {
      const customerNo = shipping.customerNo.trim();
      const shippingPoscode = shipping.shippingPoscode.trim();
      const shippingPhone = shipping.shippingPhone.trim();
      return {
        coNo: shipping.coNo,
        customerNo: customerNo,
        addressID: shipping.addressID,
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
    if (shippings[0].addressID !== addressID) {
      updateFields.addressID = addressID;
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
        addressID: addressID,
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
    const shippings = req.body.shippings;
    // console.log(shippings);

    // const {
    //   customerNo,
    //   customerName,
    //   shippingAddress1,
    //   shippingAddress2,
    //   shippingAddress3,
    //   shippingAddress4,
    //   shippingPhone,
    //   shippingPoscode,
    //   shippingRoute,
    // } = req.body;

    const jsonPath = path.join(__dirname, "../../", "Jsons", "shipping.json");
    let existingData = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      existingData = JSON.parse(jsonData);
    }

    for (let shipping of shippings) {
      const shinppingData = await Shipping.findAll({
        attributes: {
          exclude: ["id"],
        },
        where: {
          customerNo: shipping.customerNo,
          coNo: 410,
        },
      });

      let checkShipping = "SHIP";
      let shinppingNum = 0;
      let addressID = "";

      if (shinppingData.length > 0) {
        for (let shinpping of shinppingData) {
          if (filterStringEN(shinpping.addressID) === "SHIP") {
            checkShipping = "SHIP";
            if (
              shinppingNum < parseInt(filterStringNumber(shinpping.addressID))
            ) {
              shinppingNum = parseInt(filterStringNumber(shinpping.addressID));
            }
          } else {
            checkShipping = "SHIP";
          }
        }
      }
      addressID = `${checkShipping}${shinppingNum + 1}`;

      await Shipping.create({
        coNo: existingData.OPCONO, // OPCONO,
        customerNo: shipping.customerNo, // OPCUNO
        OPADRT: existingData.OPADRT, // OPPART
        addressID: addressID, // addressID
        customerName: shipping.customerName, // OPCUNM
        shippingAddress1: shipping.shippingAddress1, // OPCUA1
        shippingAddress2: shipping.shippingAddress2, // OPCUA2
        shippingAddress3: shipping.shippingAddress3, // OPCUA3
        shippingAddress4: shipping.shippingAddress4, // OKCUA4
        shippingPoscode: shipping.shippingPoscode, // OPPONO
        // OPEALO: existingData.OPEALO, // OPEALO
        // OPECAR: '', // OPECAR
        // OPRONO: '', // OPRONO
        OPMODL: existingData.OPMODL, // OPMODL
        OPTEDL: existingData.OPTEDL, // OPTEDL
        shippingPhone: shipping.shippingPhone, // OPPHNO
        OPCSCD: existingData.OPCSCD, // OPCSCD
        OPEDES: existingData.OPEDES, // OPEDES
        // OPRODN: '', // OPRODN
        shippingRoute: shipping.shippingRoute, // OPULZO
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
      });
    }
    res.status(201).json({
      message: "Insert Success",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleted = async (req, res, next) => {
  try {
    const {
      customerNumber: customerNumber,
      addressID: addressID,
      companyNumber: companyNumber,
    } = req.body;

    const deleted = await Shipping.update(
      { companyNumber: companyNumber * -1 },
      {
        attributes: { exclude: ["id"] },
        where: {
          companyNumber,
          customerNumber,
          addressID,
        },
      }
    );

    if (deleted[0] === 1) {
      res.status(202).json({ message: "Deleted" });
    } else {
      res.status(304).json({ message: "Not Modified" });
    }
  } catch (error) {
    next(error);
  }
};

exports.single = (io) => async (req, res, next) => {
  try {
    const { customerNo, addressID } = req.body;
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
      shippingPhone: shippingData.shippingPhone.trim(),
    };

    io.emit("shippingData", shippingData);
    res.json(shippingData);
  } catch (error) {
    next(error);
  }
};
