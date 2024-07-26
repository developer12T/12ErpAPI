const { sequelize, DataTypes } = require("../config/m3db");

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
    productNo: {
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
    itemNo: {
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

module.exports = PrepareInvoB;
