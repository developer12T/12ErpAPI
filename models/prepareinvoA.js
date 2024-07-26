const { sequelize, DataTypes } = require("../config/m3db");

const PrepareInvoA = sequelize.define(
  "OSASTD",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCONO",
    },
    OUDIVI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUDIVI",
    },
    OUFACI: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUFACI",
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORNO",
      primaryKey:true
    },
    productNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORNO",
    },
    OUOSSQ: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUOSSQ",
    },
    orderStartDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUOSDT",
    },
    OUOSPE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUOSPE",
    },
    customerNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCUNO",
    },
    customerChannel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCUCL",
    },
    customerStartDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCUST",
    },
    orderType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORTP",
    },
    payer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUPYNO",
    },
    OUCUCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUCUCD",
    },
    saleCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUSMCD",
    },
    OUCSCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUCSCD",
    },
    OUFRE1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUFRE1",
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUWHLO",
    },
    itemNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUITNO",
    },
    OUITGR: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUITGR",
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUITTY",
    },
    OUITCL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUITCL",
    },
    OUORST: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORST",
    },
    OUORQT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORQT",
    },
    OUORQA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORQA",
    },
    OUALUN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUALUN",
    },
    OUCOFA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCOFA",
    },
    OUDMCF: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUDMCF",
    },
    OUSPUN: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUSPUN",
    },
    OUORQS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORQS",
    },
    OUSTUN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUSTUN",
    },
    OUORQB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORQB",
    },
    grossWight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUGRWE",
    },
    netWight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUNEWE",
    },
    OUDCCD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUDCCD",
    },
    OUSAPR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUSAPR",
    },
    OUGRPR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUGRPR",
    },
    OUSAAM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUSAAM",
    },
    OUPRMO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUPRMO",
    },
    OUDISY: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUDISY",
    },
    OUDWDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUDWDT",
    },
    OUCODT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCODT",
    },
    OUUCOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUUCOS",
    },
    OUUCCD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUUCCD",
    },
    OUUNMS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUUNMS",
    },
    OUORTK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUORTK",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUADID",
    },
    OUINRC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUINRC",
    },
    OURGDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OURGDT",
    },
    OURGTM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OURGTM",
    },
    OULMDT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OULMDT",
    },
    OUCHNO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUCHNO",
    },
    OUCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OUCHID",
    },
    OULMTS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OULMTS",
    },
    OUACOS: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUACOS",
    },
    OUTEPY: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUTEPY",
    },
    OUDECU: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OUDECU",
    },
    OURQWH: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "OURQWH",
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

module.exports = PrepareInvoA
