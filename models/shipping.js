const { sequelize, DataTypes } = require("../config/m3db");

const Shipping = sequelize.define(
  "OCUSAD",
  {
    coNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "OPCONO",
    },
    customerNo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "OPCUNO",
    },
    addressID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      field: "OPADID",
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUNM",
    },
    shippingAddress1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA1",
    },
    shippingAddress2: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA2",
    },
    shippingAddress3: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA3",
    },
    shippingAddress4: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCUA4",
    },
    shippingPoscode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPONO",
    },
    shippingPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPHNO",
    },
    shippingRoute: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPULZO",
    },
    OPADRT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPADRT",
    },
    OPMODL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPMODL",
    },
    OPTEDL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPTEDL",
    },
    OPCSCD: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCSCD",
    },
    OPEDES: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPEDES",
    },
    OPGEOC: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPGEOC",
    },
    OPFVDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPFVDT",
    },
    OPLVDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPLVDT",
    },
    OPDTID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPDTID",
    },
    OPBCKO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPBCKO",
    },
    OPPADL: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPPADL",
    },
    OPRGDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPRGDT",
    },
    OPRGTM: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPRGTM",
    },
    OPLMDT: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPLMDT",
    },
    OPCHNO: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCHNO",
    },
    OPCHID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPCHID",
    },
    OPLMTS: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "OPLMTS",
    },
    OPTXID: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OPTXID",
    },
    OPECAR: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OPECAR",
    },
    OPGEOX: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OPGEOX",
    },
    OPGEOY: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "OPGEOY",
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

module.exports = Shipping;
