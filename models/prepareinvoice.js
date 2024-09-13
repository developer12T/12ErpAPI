const { sequelize, DataTypes } = require("../config/m3db");

const PrepareInvoA = sequelize.define(
  "OSASTD",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      field: "OUCONO",
      validate: {
        isNumeric: {
          msg: "Company No must contain only numbers", // Ensure the value is numeric
        },
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Company No must be exactly 3 digits");
          }
        },
      },
    },
    OUDIVI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUDIVI",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OUDIVI must be exactly 3 digits");
          }
        },
      },
    },
    OUFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUFACI",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OUDIVI must be exactly 3 digits");
          }
        },
      },
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUORNO",
      primaryKey: true,
      validate: {
        len: {
          args: [0, 10],
          msg: "Order No must be 0-10 digits long",
        },
      },
    },
    itemNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPONR",
      validate: {
        len: {
          args: [0, 5],
          msg: "Item No must be 0-5 digits long",
        },
        isNumeric: {
          msg: "Item No must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUOSSQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSSQ",
      validate: {
        len: {
          args: [0, 5],
          msg: "OUOSSQ must be 0-5 digits long",
        },
        isNumeric: {
          msg: "OUOSSQ must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUOSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSDT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OUOSDT must be exactly 8 digits");
          }
        },
        isNumeric: {
          msg: "OUOSDT must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUOSPE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSPE",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 6) {
            throw new Error("OUOSDT must be exactly 6 digits");
          }
        },
        isNumeric: {
          msg: "OUOSPE must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    customerNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUNO",
      validate: {
        len: {
          args: [0, 10],
          msg: "Customer No must be 0-10 digits long",
        },
      },
    },
    customerChannel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUCL",
      validate: {
        len: {
          args: [0, 3],
          msg: "Customer No must be 0-3 digits long",
        },
      },
    },
    OUCUST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUST",
      validate: {
        len: {
          args: [0, 10],
          msg: "OUCUST must be 0-10 digits long",
        },
      },
    },
    orderType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORTP",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUCUST must be 0-3 digits long",
        },
      },
    },
    payer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPYNO",
      validate: {
        len: {
          args: [0, 10],
          msg: "payer must be 0-10 digits long",
        },
      },
    },
    OUCUCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCUCD",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUCUCD must be 0-3 digits long",
        },
      },
    },
    saleCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSMCD",
      validate: {
        len: {
          args: [0, 10],
          msg: "Sale Code must be 0-10 digits long",
        },
      },
    },
    OUCSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCSCD",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUCSCD must be 0-3 digits long",
        },
      },
    },
    OUFRE1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUFRE1",
      validate: {
        len: {
          args: [0, 5],
          msg: "OUFRE1 must be 0-5 digits long",
        },
      },
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUWHLO",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Warehouse must be exactly 3 digits");
          }
        },
      },
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUITNO",
      validate: {
        len: {
          args: [0, 15],
          msg: "Item Code must be 0-15 digits long",
        },
      },
    },
    OUITGR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUITGR",
      validate: {
        len: {
          args: [0, 8],
          msg: "OUITGR must be 0-8 digits long",
        },
      },
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUITTY",
      validate: {
        len: {
          args: [0, 3],
          msg: "Item Type must be 0-3 digits long",
        },
      },
    },
    OUITCL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUITCL",
      validate: {
        len: {
          args: [0, 5],
          msg: "OUITCL must be 0-5 digits long",
        },
      },
    },
    OUORST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORST",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 2) {
            throw new Error("OUORST must be exactly 2 digits");
          }
        },
      },
    },
    OUORQT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQT",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUORQT must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUORQT must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUORQA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQA",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUORQA must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUORQA must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUALUN",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("Unit must be exactly 3 digits");
          }
        },
      },
    },
    OUCOFA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCOFA",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUCOFA must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUCOFA must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUDMCF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDMCF",
      validate: {
        len: {
          args: [0, 1],
          msg: "OUDMCF must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OUDMCF must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUSPUN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUSPUN",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OUSPUN must be exactly 3 digits");
          }
        },
      },
    },
    OUORQS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQS",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUDMCF must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUDMCF must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUSTUN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSTUN",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 3) {
            throw new Error("OUSPUN must be exactly 3 digits");
          }
        },
      },
    },
    OUORQB: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQB",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUORQB must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUORQB must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    grossWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUGRWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Gross Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Gross Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    netWeight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUNEWE",
      validate: {
        len: {
          args: [0, 9],
          msg: "Net Weight must be 0-9 digits long",
        },
        isNumeric: {
          msg: "Net Weight must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUDCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDCCD",
      validate: {
        len: {
          args: [0, 1],
          msg: "OUDCCD must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OUDCCD must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUSAPR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSAPR",
      validate: {
        len: {
          args: [0, 17],
          msg: "OUSAPR must be 0-17 digits long",
        },
        isNumeric: {
          msg: "OUSAPR must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUGRPR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUGRPR",
      validate: {
        len: {
          args: [0, 17],
          msg: "OUGRPR must be 0-17 digits long",
        },
        isNumeric: {
          msg: "OUGRPR must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUSAAM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSAAM",
      validate: {
        len: {
          args: [0, 17],
          msg: "OUSAAM must be 0-17 digits long",
        },
        isNumeric: {
          msg: "OUSAAM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUPRMO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPRMO",
      validate: {
        len: {
          args: [0, 1],
          msg: "OUPRMO must be 0-1 digits long",
        },
      },
    },
    OUDISY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUDISY",
      validate: {
        len: {
          args: [0, 10],
          msg: "OUDISY must be 0-10 digits long",
        },
      },
    },
    OUDWDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDWDT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OUDWDT must be exactly 8 digits");
          }
        },
        isNumeric: {
          msg: "OUSAAM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUCODT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCODT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OUDWDT must be exactly 8 digits");
          }
        },
        isNumeric: {
          msg: "OUSAAM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUUCOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUUCOS",
      validate: {
        len: {
          args: [0, 17],
          msg: "OUUCOS must be 0-17 digits long",
        },
        isNumeric: {
          msg: "OUUCOS must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUUCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUUCCD",
      validate: {
        len: {
          args: [0, 1],
          msg: "OUUCCD must be 0-1 digits long",
        },
        isNumeric: {
          msg: "OUUCCD must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUUNMS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUUNMS",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUUNMS must be 0-3 digits long",
        },
      },
    },
    OUORTK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORTK",
      validate: {
        len: {
          args: [0, 1],
          msg: "OUORTK must be 0-1 digits long",
        },
      },
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUADID",
      validate: {
        len: {
          args: [0, 6],
          msg: "Adress ID must be 0-6 digits long",
        },
      },
    },
    OUINRC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUINRC",
      validate: {
        len: {
          args: [0, 10],
          msg: "OUINRC must be 0-10 digits long",
        },
      },
    },
    OURGDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURGDT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OURGDT must be exactly 8 digits");
          }
        },
        isNumeric: {
          msg: "OURGDT must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OURGTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURGTM",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 6) {
            throw new Error("OURGTM must be exactly 6 digits");
          }
        },
        isNumeric: {
          msg: "OURGTM must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OULMDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OULMDT",
      validate: {
        isLenghtRequired(value) {
          // Custom validator to ensure exactly 8 digits
          if (value.toString().length !== 8) {
            throw new Error("OULMDT must be exactly 8 digits");
          }
        },
        isNumeric: {
          msg: "OULMDT must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUCHNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCHNO",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUCHNO must be 0-3 digits long",
        },
        isNumeric: {
          msg: "OUCHNO must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCHID",
      validate: {
        len: {
          args: [0, 10],
          msg: "OUCHID must be 0-10 digits long",
        },
      },
    },
    OULMTS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OULMTS",
      validate: {
        len: {
          args: [0, 18],
          msg: "OULMTS must be 0-18 digits long",
        },
        isNumeric: {
          msg: "OULMTS must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUACOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUACOS",
      validate: {
        len: {
          args: [0, 17],
          msg: "OUACOS must be 0-17 digits long",
        },
        isNumeric: {
          msg: "OUACOS must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUTEPY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUTEPY",
      validate: {
        len: {
          args: [0, 3],
          msg: "OUTEPY must be 0-3 digits long",
        },
      },
    },
    OUDECU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDECU",
      validate: {
        len: {
          args: [0, 10],
          msg: "OUDECU must be 0-10 digits long",
        },
      },
    },
    OURQWH: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURQWH",
      validate: {
        len: {
          args: [0, 3],
          msg: "OURQWH must be 0-3 digits long",
        },
        
      },
    },
    OUOFRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOFRA",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUOFRA must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUOFRA must contain only numbers", // Ensure the value is numeric
        },
      },
    },
    OUDIA2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDIA2",
      validate: {
        len: {
          args: [0, 15],
          msg: "OUDIA2 must be 0-15 digits long",
        },
        isNumeric: {
          msg: "OUDIA2 must contain only numbers", // Ensure the value is numeric
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

const PrepareInvoB = sequelize.define(
  "OSBSTD",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCONO",
      primaryKey: true,
    },
    UCDIVI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCDIVI",
      primaryKey: true,
    },
    UCFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCFACI",
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORNO",
      primaryKey: true,
    },
    UCDLIX: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDLIX",
    },
    itemNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCPONR",
    },
    UCIVNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCIVNO",
    },
    UCORDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORDT",
    },
    UCDWDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDWDT",
    },
    UCCODT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCODT",
    },
    UCDLDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDLDT",
    },
    UCIVDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCIVDT",
    },
    UCYEA4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCYEA4",
    },
    UCYEA4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCYEA4",
    },
    customerNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCUNO",
    },
    customerChannel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCUCL",
    },
    UCCUST: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCUST",
    },
    orderType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORTP",
    },
    payer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCPYNO",
    },
    UCCUCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCCUCD",
    },
    UCRAIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRAIN",
    },
    UCDMCU: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDMCU",
    },
    saleCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCSMCD",
    },
    UCCSCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCCSCD",
    },
    UCFRE1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCFRE1",
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCWHLO",
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCITNO",
    },
    UCITGR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCITGR",
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCITTY",
    },
    UCITCL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCITCL",
    },
    UCSTUN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCSTUN",
    },
    UCALUN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCALUN",
    },
    UCSPUN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCSPUN",
    },
    UCPRMO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCPRMO",
    },
    UCDISY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCDISY",
    },
    UCUCCD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCUCCD",
    },
    UCORTK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORTK",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCADID",
    },
    UCIVQT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCIVQT",
    },
    UCOFQS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCOFQS",
    },
    UCIVQA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCIVQA",
    },
    UCIVQS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCIVQS",
    },
    UCORQT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORQT",
    },
    UCORQS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORQS",
    },
    UCORQA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORQA",
    },
    UCORQB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCORQB",
    },
    grossWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCGRWE",
    },
    netWeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCNEWE",
    },
    UCSAAM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCSAAM",
    },
    UCSGAM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCSGAM",
    },
    UCCUAM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCUAM",
    },
    UCUCOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCUCOS",
    },
    UCDCOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDCOS",
    },
    UCDDF1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDDF1",
    },
    UCDDF4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDDF4",
    },
    UCTDEL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCTDEL",
    },
    UCTORL: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCTORL",
    },
    UCRQTY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRQTY",
    },
    UCMPRO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCMPRO",
    },
    UCINRC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCINRC",
    },
    UCROUT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCROUT",
    },
    UCRODN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRODN",
    },
    UCRGDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRGDT",
    },
    UCRGTM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRGTM",
    },
    UCLMDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCLMDT",
    },
    UCCHNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCCHNO",
    },
    UCCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "UCCHID",
    },
    UCINPX: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCINPX",
    },
    UCRGDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRGDT",
    },
    UCEXIN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCEXIN",
    },
    UCLMTS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCLMTS",
    },
    UCACOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCACOS",
    },
    UCTEPY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCTEPY",
    },
    UCDECU: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCDECU",
    },
    UCRQWH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCRQWH",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    primaryKey: false,
  }
);

module.exports = { PrepareInvoA, PrepareInvoB };
