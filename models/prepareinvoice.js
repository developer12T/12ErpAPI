const { sequelize, DataTypes } = require("../config/m3db");

const PrepareInvoA = sequelize.define(
  "OSASTD",
  {
    coNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      field: "OUCONO",
    },
    OUDIVI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUDIVI",
    },
    OUFACI: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUFACI",
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORNO",
      primaryKey: true,
    },
    itemNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPONR",
    },
    OUOSSQ: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSSQ",
    },
    OUOSDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSDT",
    },
    OUOSPE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOSPE",
    },
    customerNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUNO",
    },
    customerChannel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUCL",
    },
    OUCUST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCUST",
    },
    orderType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORTP",
    },
    payer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPYNO",
    },
    OUCUCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCUCD",
    },
    saleCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSMCD",
    },
    OUCSCD: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCSCD",
    },
    OUFRE1: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUFRE1",
    },
    warehouse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUWHLO",
    },
    itemCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUITNO",
    },
    OUITGR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUITGR",
    },
    itemType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUITTY",
    },
    OUITCL: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUITCL",
    },
    OUORST: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORST",
    },
    OUORQT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQT",
    },
    OUORQA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQA",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUALUN",
    },
    OUCOFA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCOFA",
    },
    OUDMCF: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDMCF",
    },
    OUSPUN: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUSPUN",
    },
    OUORQS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQS",
    },
    OUSTUN: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSTUN",
    },
    OUORQB: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORQB",
    },
    grossWight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUGRWE",
    },
    netWight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUNEWE",
    },
    OUDCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDCCD",
    },
    OUSAPR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSAPR",
    },
    OUGRPR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUGRPR",
    },
    OUSAAM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUSAAM",
    },
    OUPRMO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUPRMO",
    },
    OUDISY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUDISY",
    },
    OUDWDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDWDT",
    },
    OUCODT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCODT",
    },
    OUUCOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUUCOS",
    },
    OUUCCD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUUCCD",
    },
    OUUNMS: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUUNMS",
    },
    OUORTK: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUORTK",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUADID",
    },
    OUINRC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUINRC",
    },
    OURGDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURGDT",
    },
    OURGTM: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURGTM",
    },
    OULMDT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OULMDT",
    },
    OUCHNO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUCHNO",
    },
    OUCHID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OUCHID",
    },
    OULMTS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OULMTS",
    },
    OUACOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUACOS",
    },
    OUTEPY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUTEPY",
    },
    OUDECU: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDECU",
    },
    OURQWH: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OURQWH",
    },
    OUOFRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUOFRA",
    },
    OUDIA2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "OUDIA2",
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
    grossWight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "UCGRWE",
    },
    netWight: {
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
